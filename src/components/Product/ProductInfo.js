import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import ShopContext from '../../contexts/ShopContext';
import noImg from '../../img/noImage.jpg';

export default function ProductInfo(props) {
    const {item} = props;
    const [chosenSize, setChosenSize] = useState();
    const [sizes, setSizes] = useState([]);
    const [isSizeAvailable, setIsSizeAvailable] = useState(false);
    const [count, setCount] = useState(1);    
    const history = useHistory();
    const {addToCart} = useContext(ShopContext);
    const [isImgNotFound, setImgNotFound] = useState(false);

    useEffect(() => {
        let data = item.sizes.filter(el => el.avalible);
        if (data && data.length > 0) {
            setSizes(data);
            setIsSizeAvailable(true);
        }
        return
    }, [])
    
    const chooseSize = (e, size) => {
        setChosenSize(size);
    }

    const changeCount = (isPlus) => {

        if (isPlus && count < 10) {
            setCount(prev => prev + 1);
        } else if (!isPlus && count > 1) {
            setCount(prev => prev - 1);
        }
    }

    const addProduct = () => {
        //сохранить нужные данные в context
        let dataToSave = {
            "id": item.id,
            "name": item.title,
            "size": chosenSize,
            "price": item.price,
            "count": count
        }
        addToCart(dataToSave);
        //перейти на страницу
        history.push('/cart');
    }

    const imgErrorHandler = () => {
        setImgNotFound(true);
    }

    return (
        <section className="catalog-item">
            <h2 className="text-center">{item.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={isImgNotFound ? noImg : item.images[0]} onError={imgErrorHandler}
                        className="img-fluid" alt="" />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                    {isSizeAvailable ?
                    <>
                    <div className="text-center">                        
                        <p>Размеры в наличии:
                            {sizes.map(el => <span key={el.size} className={"catalog-item-size" + (el.size === chosenSize ? " selected" : "")} onClick={(e) => chooseSize(e, el.size)}>{el.size}</span>)}
                        </p>
                        <p>Количество: <span className="btn-group btn-group-sm pl-2">
                            <button className="btn btn-secondary" onClick={() => changeCount(false)}>-</button>
                            <span className="btn btn-outline-primary">{count}</span>
                            <button className="btn btn-secondary" onClick={() => changeCount(true)}>+</button>
                        </span>
                        </p>
                    </div>
                    <button className={"btn btn-danger btn-block btn-lg"} disabled={chosenSize ? false : true} onClick={addProduct}>В корзину</button>
                    </>
                    : null}
                </div>
            </div>
        </section>
    )
}
