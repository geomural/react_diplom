import { createContext } from 'react';

const ShopContext = createContext({
    contextSearchText: "",
    cartData: [],
});
export default ShopContext;