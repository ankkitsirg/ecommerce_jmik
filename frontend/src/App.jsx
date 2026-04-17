import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";

function App() {
  return (
   <BrowserRouter>
       <Routes>
          <Route path='/' element={ <ProductPage />}   />
          <Route path='/cart' element={ <CartPage />}   />
       </Routes>
            
     </BrowserRouter>
  );
};

export default App;
