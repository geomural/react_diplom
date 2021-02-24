import React, { useState } from 'react'
import ShopContext from './ShopContext'

export default function ShopProvider(props) {
    const [contextSearchText, saveSearchText] = useState("");
    const [cartData, setCartData] = useState([]);

    const addToCart = (data) => {
        //пример данных: { "id": 1, "name": "Туфли", "size": "36", "price": 120, "count": 2 }
        //проверим, есть ли уже эта модель в корзине
        let isExist = cartData.some(el => el.id === data.id);
        if (!isExist) {
            //добавить элемент в корзину
            let savedData = cartData;
            savedData.push(data);
            setCartData(savedData);
        } else {
            let dataToSave = cartData;
            //увеличить количество нужных элементов 
            dataToSave.map(el => el.id === data.id? el.count+=data.count: null);
            setCartData(dataToSave);
        }
    }   

    const removeFromCart = (productId) => {
        setCartData(prev => prev.filter(item => item.id !== productId));
    }

    //очистить корзину после успешного оформления заказа
    const clearCart = () => {
        setCartData([]);
    }
    
    return (
        <ShopContext.Provider value={{contextSearchText, saveSearchText, addToCart, cartData, removeFromCart, clearCart}}>
            {props.children}
        </ShopContext.Provider>
    )
}
    