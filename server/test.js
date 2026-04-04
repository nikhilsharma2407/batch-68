const cart = {
    items: [
        {
            price: 109.95,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            id: 1,
            description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
            category: 'men\'s clothing',
            rating: {
                rate: 3.9,
                count: 120
            },
            quantity: 1
        },
        {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts ',
            price: 22.3,
            description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            category: 'men\'s clothing',
            rating: {
                rate: 4.1,
                count: 259
            },
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
            quantity: 1
        }
    ]
};

const idx = cart.items.findIndex(({ id }) => id === 2)
cart.items[idx].quantity += 1
console.log(cart)