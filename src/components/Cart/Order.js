import React, { useState, useContext } from 'react'
import ShopContext from '../../contexts/ShopContext';
import Spinner from '../Spinner';

export default function Order() {
    const {cartData, clearCart} = useContext(ShopContext);
    const [form, setForm] = useState({
        phone: "",
        address: "",
        agreement: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isMessage, setIsMessage] = useState(false);

    const handleChange = ({target}) => {
        const name = target.id;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //в поле "Телефон" можно вписать не больше 11 цифр
        if (!(name === 'phone' && value.length > 11)) {
            setForm( prev => ({...prev, [name]: value}));
        }
    }

    const getJSON = () => {
        let products = cartData.map(el => {return {id: el.id, price: el.price, count: el.count}});
        let data = {
            "owner": {
              "phone": `+7${form.phone}`,
              "address": form.address,
            },
            "items": products
        }
        return JSON.stringify(data);
    }

    const fetchOrder = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_ORDER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: getJSON(),
            });
            if (!response.ok) {
                setIsLoading(false);
                setIsError(true);
            } else {
                clearCart();
            }
        } catch (e) {
            setIsLoading(false);
            setIsError(true);
        }
    }

    const makeOrder = (e) => {
        e.preventDefault();
        if (form.agreement && form.address && form.phone && form.phone.length === 11) {
            setIsMessage(false);
            setIsLoading(true);
            fetchOrder();
            window.alert("Заказ успешно оформлен!");
        } else {
            setIsMessage(true);
        }
    }

    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            {isLoading ?
                <Spinner />
                :                
                <form className="order-body" onSubmit={makeOrder}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <div className="inline">
                            <p className="prefix">+7</p>
                            <input className="form-control phoneInput" id="phone" placeholder="Ваш телефон" type="number" value={form.phone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" id="address" placeholder="Адрес доставки" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" checked={form.agreement} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                    
                    {isMessage ? <p>Некорректно заполнены поля</p> : null}
                    {isError ? <p>Ошибка при оформлении заказа.</p> : null}
                </form>
            }            
        </section>
    )
}
