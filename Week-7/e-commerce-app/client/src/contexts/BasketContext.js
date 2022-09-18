import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"

const BasketContext = createContext();

const BasketProvider =  ({children}) => {

    const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []
    const [items, setItems] = useState(defaultBasket)


    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items))

    },[items])

    const addToBasket = (data, findBasketItem) => {
        //Sepete ilk defa eklenmişse
        if(!findBasketItem) {
            return setItems((items) => [data, ...items])
        }

        //Sepete daha önce eklenmişse ve butona basılıyorsa burda kaldırılıyor
        const filtered = items.filter((item) => item._id !== findBasketItem._id)
        setItems(filtered)
    }

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id)
        setItems(filtered)

    }

    const emptyBasket = () => setItems([])

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return(
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    )
}

const useBasket = () => useContext(BasketContext)

export {BasketProvider, useBasket}