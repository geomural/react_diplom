import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import noImg from '../../img/noImage.jpg';

export default function ShoesMiniCard(props) {
    const item = props.item;
    const [isImgNotFound, setImgNotFound] = useState(false);

    const imgErrorHandler = () => {
        setImgNotFound(true);
    } 

    return (
        <div className="col-4 bottomIndent">
            <div className="card catalog-item-card">
                <img src={isImgNotFound ? noImg : item.images[0]} onError={imgErrorHandler} className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price}</p>
                    <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    )
}
