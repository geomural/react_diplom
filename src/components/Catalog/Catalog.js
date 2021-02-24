import React, { useState, useEffect, useContext } from 'react'
import CatalogCategories from './CatalogCategories';
import ShoesMiniCard from './ShoesMiniCard';
import ShopContext from '../../contexts/ShopContext';
import Spinner from '../Spinner';

export default function Catalog(props) {
    const [list, setList] = useState(false);
    const [offset, setOffset] = useState(0);
    const [currentCategoryId, setCurCatId] = useState();
    //флаг, нужно ли показывать кнопку "Загрузить еще"
    const [isLoadMoreBtn, setLoadMoreBtn] = useState(true);
    //флаг, нужно ли показывать блок с поиском
    const {isSearchBlock} = props;
    const [searchText, setSearchText] = useState();
    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState();
    //использование Context для изменения и анализа хранимых данных
    const {contextSearchText, saveSearchText} = useContext(ShopContext);

    useEffect(() => {
        let url;
        //если в каталог пришли из-за заполненной поисковой строки в header
        if (contextSearchText) {
            setSearchText(contextSearchText);
            //для получения url со строкой фильтрации
            //данные в searchText из-за асинхронной функции setSearchText еще не успели измениться
            url = getUrl(0, null, true, contextSearchText);
            
            //сбросим хранимое в Context значение
            saveSearchText("");      
        } else {
            url = getUrl();
        }        
        //загрузка каталога
        loadItems(url);
        return
      }, [contextSearchText]); //реагируем на изменения

    //загрузка элементов каталога
    const loadItems = async (url, newOffset) => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                setIsLoading(false);
                setIsError(true);
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setIsLoading(false);
            setIsError(false);
            if (data) {
                //если "загрузить еще"
                if (newOffset) {
                    setList(prevData => prevData.concat(data));
                } else {
                    setList(data);
                }              
            }    
            //показать или скрыть кнопку "загрузить еще"
            setLoadMoreBtn(data && data.length < 6 ? false : true);
        } catch (e) {            
            setIsLoading(false);
            setIsError(true);
        }
    }

    const chooseCategory = (value) => {
        setCurCatId(value);
        setOffset(0);
        //отправляем флаг, если выбрана категория "Все"
        let url = value ? getUrl(0, value) : getUrl(0, value, true);
        loadItems(url);
    }

    const getUrl = (newOffset, newCategoryId, isAllCategory, newSearchText) => {
        //добавим фильтр в запрос при его наличии
        let filter = newSearchText || searchText ? `q=${newSearchText || searchText}` : "";

        //по умолчанию или если выбрана категория "Все"
        let category = "";
        //если не выбрана категория "Все"
        if (!isAllCategory) {
            if (newCategoryId || currentCategoryId) {
                category = `categoryId=${newCategoryId || currentCategoryId}&`
            }
        }        
        let url =  `${process.env.REACT_APP_API_ITEMS}?${category}offset=${newOffset ? newOffset : 0}&${filter}`;        
        return url;
    }

    const loadMore = () => {
        //используем newOffset, потому что setOffset - асинхронная функция
        //и state изменится сильно позже, чем нам надо
        let newOffset = offset + 6;
        setOffset(newOffset);

        let url = getUrl(newOffset);    
        loadItems(url, newOffset);
    }

    //введение текста в поисковую строку
    const changeSearchText = (e) => {
        setSearchText(e.target.value);
    }

    //обработка нажатия enter после введения текста в форме поиска
    const handleSubmit = (e) => {
        e.preventDefault();
        setOffset(0);
        let url = getUrl(0);
        loadItems(url);
    }

    return (        
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {isSearchBlock ?
                <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
                    <input className="form-control" placeholder="Поиск" value={searchText} onChange={changeSearchText}/>
                </form>
                : null
            }
            {list ?
                <>
                    <CatalogCategories chooseCategory={chooseCategory}/>
                    {!isLoading ?
                        isError ?
                            <p>Ошибка</p>
                        :
                            <>
                                <div className="row">
                                    {list.map(item =>
                                        <ShoesMiniCard key={item.id} item={item} />
                                    )}
                                </div>
                                {
                                    isLoadMoreBtn ?
                                        <div className="text-center">
                                            <button className="btn btn-outline-primary" onClick={loadMore}>Загрузить ещё</button>
                                        </div> 
                                        : null
                                }    
                            </>       
                    :
                    <Spinner /> }
                </>
                :
                isError ?
                    <p>Ошибка</p>
                    :
                    <Spinner />
            }            
        </section>
    )
}
