import React, {useState, useContext} from 'react'
import '../css/style.css'
import logo from '../img/header-logo.png'
import {Link, useHistory} from 'react-router-dom'
import ShopContext from '../contexts/ShopContext'

export default function PageHeader() {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    //для сохранения значения через Context для дальнейшего использования компонентом Catalog
    const {saveSearchText, cartData} = useContext(ShopContext);
    //для перехода на другую страницу
    const history = useHistory();
    const cartDataCount = cartData.length > 0 ? cartData.reduce((sum, curItem) => sum + curItem.count, 0) : 0;

    //клик на поисковую иконку
    const toggleSearchVisible = () => {
        if (isSearchVisible) {
            if (searchText) {
                //сохраним значение через Context для дальнейшего использования компонентом Catalog
                saveSearchText(searchText);
                setSearchText("");
                //переходим на страницу с каталогом
                history.push('/catalog');
            }
        }
        setSearchVisible(!isSearchVisible);
    }

    //заполнение поисковой строки
    const changeSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const preventSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="row headerClass">
            <div className="col">
                <div className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bosa Noga" />
                    </a>

                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Главная</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/catalog">Каталог</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">О магазине</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacts">Контакты</Link>
                            </li>
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={toggleSearchVisible}></div>
                                <Link to="/cart" className="header-controls-pic header-controls-cart">
                                    {cartDataCount ?
                                        <div className="header-controls-cart-full">{cartDataCount}</div>                                        
                                        : null
                                    }
                                    <div className="header-controls-cart-menu"></div>
                                </Link>
                            </div>
                            <form data-id="search-form" onSubmit={preventSubmit}
                                  className={isSearchVisible ? "header-controls-search-form form-inline"
                                                             : "header-controls-search-form form-inline invisible"}>
                                <input className="form-control" placeholder="Поиск" value={searchText} onChange={changeSearchText}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
