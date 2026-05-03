import { useMemo, useState } from "react";


// const arr = [1, 999, 100, 1000, 9];

// sort in ascending order
// arr.sort((a,b)=>{
//     // <=0 don't sort
//     // >0 swap or sort the values
//     return a-b
// })


// sort in descending order
// arr.sort((a,b)=>{
//     // <=0 don't sort
//     // >0 swap or sort the values
//     return b-a
// })

const SORT_OPTIONS = {
    PRICE: 'price',
    RATING: 'rating',
    INCREASING: 'inc',
    DECREASING: 'dec'
}

const useSort = (products) => {
    const [activeSort, setActiveSort] = useState('');
    console.log("🚀 ~ useSort ~ activeSort:", activeSort)

    const [sortKey, sortOrder] = activeSort.split(':')
    console.log("🚀 ~ useSort ~ sortOrder:", sortOrder)
    console.log("🚀 ~ useSort ~ sortKey:", sortKey)


    const sortedProducts = useMemo(() => {
        if (activeSort === '') {
            return products;
        }

        console.log('sorting')
        return [...products].sort((a, b) => {
            if (sortKey === SORT_OPTIONS.RATING) {
                if (sortOrder === SORT_OPTIONS.INCREASING) {
                    return a.rating.rate - b.rating.rate
                } else {
                    return b.rating.rate - a.rating.rate
                }
            } else if (sortKey === SORT_OPTIONS.PRICE) {

                if (sortOrder === SORT_OPTIONS.INCREASING) {
                    // sort in ascending
                    return a[sortKey] - b[sortKey]

                } else if (sortOrder === SORT_OPTIONS.DECREASING) {
                    // sort in descending
                    return b[sortKey] - a[sortKey]
                }
            }
        });

    }, [products, activeSort])



    console.log("🚀 ~ useSort ~ sortedProducts:", sortedProducts)


    return { activeSort, setActiveSort, sortedProducts }

};

export default useSort;