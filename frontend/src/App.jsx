import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import OrderPage from "./components/OrderPage";

function App() {
  return (
   <BrowserRouter>
       <Routes>
          <Route path='/' element={ <ProductPage />}   />
          <Route path='/cart' element={ <CartPage />}   />
          <Route path='/orders' element={ <OrderPage />}   />
       </Routes>
            
     </BrowserRouter>
  );
};

export default App;
