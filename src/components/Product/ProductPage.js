import React, { useState, useEffect, useContext } from 'react'
import Banner from '../Banner'
import PageFooter from '../PageFooter'
import PageHeader from '../PageHeader'
import Spinner from '../Spinner'
import ProductInfo from './ProductInfo'

export default function ProductPage(props) {
    const id = props.match.params.id;
    const [item, setItem] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getProfuctInfo();
        return
    }, [])

    const getProfuctInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_ITEMS}/${id}`)
            if (!response.ok) {
                setIsError(true);
              throw new Error(response.statusText);
            }
            const data = await response.json();
            setIsError(false);
            if (data) {
                setItem(data);          
            }
        } catch (e) {
            setIsError(true);
        }
    }

    return (
        <div>
            {/* Не использовали InfoPage, чтобы получить match.params */}
            <PageHeader/>
            <Banner/>
            {
                item ?
                <ProductInfo item={item}/>
                :
                isError ?
                    <p>Ошибка</p>
                :
                    <Spinner />
            }
            <PageFooter/>
        </div>
    )
}
