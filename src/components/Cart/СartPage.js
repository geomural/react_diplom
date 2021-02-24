import React, {useContext} from 'react'
import Order from './Order'
import ShopContext from '../../contexts/ShopContext'

export default function СartPage() {
    const {cartData, removeFromCart} = useContext(ShopContext);

    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                {cartData.length > 0 ?
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((item, i) =>
                            <tr key={item.id}>
                                <th scope="row">{i+1}</th>
                                <td><a href="/products/1.html">{item.name}</a></td>
                                <td>{item.size}</td>
                                <td>{item.count}</td>
                                <td>{item.price} руб.</td>
                                <td>{item.price*item.count} руб.</td>
                                <td><button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>Удалить</button></td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{cartData.reduce((sum, curItem) =>  sum + curItem.count*curItem.price, 0)} руб.</td>
                        </tr>
                    </tbody>
                </table>
                :
                    <p>Корзина пуста</p>
                }
            </section>
            {cartData.length > 0 ? <Order /> : null}
        </>
    )
}
