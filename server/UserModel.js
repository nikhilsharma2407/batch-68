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
        totalPrice: { type: Number, default: 0 },
        totalQuantity: { type: Number, default: 0 },
    }
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

userSchema.statics.clearCart = async function (username) {
    const userData = await this.findOneAndUpdate({ username }, {
        $set: {
            cart: { items: [], totalQuantity: 0, totalPrice: 0 }
        }
    }, { new: true });
    console.log("🚀 ~ userData:", userData)
    return sanitizeUserData(userData)?.cart
};

const UserModel = model('user', userSchema);

export default UserModel;

