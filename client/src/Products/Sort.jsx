import React from 'react'

const Sort = ({ setActiveSort }) => {

    return (
        <select onChange={(e) => setActiveSort(e.target.value)} name="" id="">
            <option disabled selected value="">===select sort option===</option>
            <option value="price:inc">Price : Low to High</option>
            <option value="price:dec">Price : High to Low</option>
            <option value="rating:inc">Rating : Low to High</option>
            <option value="rating:dec">Rating : High to Low</option>
        </select>
    )
}

export default Sort