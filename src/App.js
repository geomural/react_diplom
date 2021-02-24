import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import Catalog from './components/Catalog/Catalog';
import InfoPage from './components/InfoPage';
import ProductPage from './components/Product/ProductPage';
import СartPage from './components/Cart/СartPage';
import Error404 from './components/Error404';
import About from './components/About';
import Contacts from './components/Contacts';
import ShopProvider from './contexts/ShopProvider';

function App() {
  return (
    // ShopProvider для передачи данных с помощью Context
    <ShopProvider> 
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          {/* Не используем InfoPage, чтобы получить match.params */}
          <Route path="/catalog/:id" component={ProductPage} />
          <Route path="/catalog">
            <InfoPage children={<Catalog isSearchBlock={true}/>} />
          </Route>
          <Route path="/about">
            <InfoPage children={<About/>} />
          </Route>
          <Route path="/contacts">
            <InfoPage children={<Contacts />} />
          </Route>
          <Route path="/cart">
            <InfoPage children={<СartPage />} />
          </Route>
          <Route path="/">
            <InfoPage children={<Error404 />} />
          </Route>
        </Switch>
      </Router>      
    </div>
    </ShopProvider>
  );
}

export default App;
