import mongoose, { model, Schema, Types } from "mongoose";
import { sanitizeUserData } from "./utils/utils.js";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "is required"]
    },
    email: { type: String, required: [true, "is required"] },
    name: { type: String, required: [true, "is required"] },
    password: { type: String, required: [true, "is required"] },
    cart: {
        items: [Object],
        totalPrice: { type: Schema.Types.Decimal128, set: (v) => v.toFixed(2), get: (v) => parseFloat(v), default: 0 },
        totalQuantity: { type: Number, default: 0 },
    },
    secret: String,
}, {
    toObject: { getters: true }
});

userSchema.statics.createUserAcc = async function (userData) {
    const user = await this.create(userData);
    return user;
};

userSchema.statics.findUser = async function (username) {
    const user = await this.findOne({ username }, { _id: 0, __v: 0 });
    if (!user) {
        const error = new Error('user not found!!!');
        error.status = 404;
        throw error
    }
    console.log('db', user);
    return user;
};

userSchema.statics.getCart = async function (username) {
    const user = await this.findOne({ username }, { cart: 1, _id: 0 });
    return sanitizeUserData(user);
};

userSchema.statics.addToCart = async function (username, product) {
    const userData = await this.findOneAndUpdate({ username, "cart.items.id": { $ne: product.id } }, {
        $inc: {
            "cart.totalQuantity": 1,
            "cart.totalPrice": product.price
        },
        $addToSet: { "cart.items": { ...product, quantity: 1 } }
    }, { new: true });

    return sanitizeUserData(userData)?.cart
};

userSchema.statics.increment = async function (username, product) {
    const userData = await this.findOneAndUpdate({ username, "cart.items.id": product.id }, {
        $inc: {
            "cart.totalQuantity": 1,
            "cart.items.$.quantity": 1,
            "cart.items.$.price": product.price,
            "cart.totalPrice": product.price,
        },
    }, { new: true });

    return sanitizeUserData(userData)?.cart
};

userSchema.statics.removeFromCart = async function (username, productId) {

    const [userData] = await this.aggregate([
        {
            $match: {
                username
            }
        },
        {
            $unwind: {
                path: "$cart.items",
            }
        },
        {
            $match: {
                "cart.items.id": productId
            }
        },
        {
            $project: {
                "cart.items.quantity": true,
                "cart.items.price": true,
            }
        }
    ]);
    console.log("🚀 ~ userData:", userData)

    const product = userData?.cart?.items;
    console.log("🚀 ~ product:", product)

    const cartData = await this.findOneAndUpdate({ username }, {
        $pull: { "cart.items": { id: productId } },
        $inc: {
            "cart.totalQuantity": -product.quantity,
            "cart.totalPrice": -product.price,
        }
    }, { new: true });

    return sanitizeUserData(cartData)?.cart
}

userSchema.statics.decrement = async function (username, product) {

    const [userData] = await this.aggregate([
        {
            $match: {
                username
            }
        },
        {
            $unwind: {
                path: "$cart.items",
            }
        },
        {
            $match: {
                "cart.items.id": product.id
            }
        },
        {
            $project: {
                "cart.items.quantity": true,
            }
        }
    ]);

    const productInCart = userData?.cart?.items;
    console.log("🚀 ~ product:", product)

    if (productInCart.quantity === 1) {
        return this.removeFromCart(username, product.id)
    }
    const cartData = await this.findOneAndUpdate({ username, "cart.items.id": product.id }, {
        $inc: {
            "cart.totalQuantity": -1,
            "cart.items.$.quantity": -1,
            "cart.items.$.price": -product.price,
            "cart.totalPrice": -product.price,
        },
    }, { new: true });


    return sanitizeUserData(cartData)?.cart
}

userSchema.statics.clearCart = async function (username) {
    const userData = await this.findOneAndUpdate({ username }, {
        $set: {
            cart: { items: [], totalQuantity: 0, totalPrice: 0 }
        }
    }, { new: true });
    return sanitizeUserData(userData)?.cart
};

userSchema.statics.updateUserAcc = async function (username, data) {
    const updateData = await this.updateOne({ username }, {
        $set: data
    });

    if (updateData.modifiedCount) {
        return true
    }
}

const UserModel = model('user', userSchema);

export default UserModel;

