import React, { useState, useEffect } from 'react'
import ShoesMiniCard from './Catalog/ShoesMiniCard';
import Spinner from './Spinner';

export default function TopSales() {
    const [list, setList] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        //загрузка списка хитов
        let initTopSales = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_TOP_SALES}`)
                if (!response.ok) {
                  setIsError(true);
                  throw new Error(response.statusText);
                }
                const data = await response.json();
                setIsError(false);
                if (data && data.length > 0) {
                  setList(data);
                }
              } catch (e) {
                setIsError(true);
              }
        }
        initTopSales();
        return
      }, []);

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {list ?
              <div className="row">
                {list.map(item => 
                  <ShoesMiniCard key={item.id} item={item} />                  
                )}
              </div>
            :
              !isError ?
                <Spinner />
              : <p>Ошибка</p>
            }
        </section>
    )
}
