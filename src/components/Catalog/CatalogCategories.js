import React, {useState, useEffect} from 'react'
import Spinner from '../Spinner'

//сохраненные названия для отображения в правильной последовательности
const categoriesNames = ["Все", "Женская обувь", "Мужская обувь", "Обувь унисекс", "Детская обувь"];

export default function CatalogCategories(props) {
    const chooseCategory = props.chooseCategory;
    const [categories, setCategories] = useState();
    const [isError, setIsError] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(categoriesNames[0]);
    useEffect(() => {
        //загрузка каталога
        loadCategoriesID();        
        return
    }, []);

    const handleCategories = (array) => {
        //сформируем data: [Мужская обувь: 12, Женская обувь: 13, Обувь унисекс: 14, Детская обувь: 15]
        let data = [];
        array.forEach(element => {
            data[element.title] = element.id;
        });        
        setCategories(data);
    }

    const loadCategoriesID = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_CATEGORIES}`)
            if (!response.ok) {
                setIsError(true);
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setIsError(false);
            if (data && data.length > 0) {
              handleCategories(data);
            }            
        } catch (e) {
            setIsError(true);
        }
    }

    const clickHandler = (e) => {
        if (e.target.text) {
            // categories[e.target.text] - id категории
            chooseCategory(categories[e.target.text]);
            //сохраняем название текущей категории для добавления стиля active
            setCurrentCategory(e.target.text);
        }
    };

    return (
        categories ?
        <ul id="categoryList" className="catalog-categories nav justify-content-center">
            {categoriesNames.map(elem => 
                <li key={elem} className="nav-item">
                    <a className={"nav-link" + (elem === currentCategory ? " active" : "")} href="#categoryList" data-toggle="tab" onClick={clickHandler}>{elem}</a>
                </li>
            )}
        </ul>
        :
        isError ?
            <p>Ошибка</p>
        : 
            <Spinner />
    )
}
