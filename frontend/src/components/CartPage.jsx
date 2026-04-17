
import { useState,useEffect } from "react";

function CartPage()
{

    const [items,setItems] =useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/api/cart/1")
        .then(res=>{if(!res.ok){throw new Error("Failed to fetch cart items");} return res.json();})
        .then(data=>{setItems(data);})
        .catch(err=>{console.error("Error fetching cart items:", err);});
    },[]);

    return(<div>
              <h3>My Cart</h3>

              {items.length===0 && <p>Your cart is empty.</p>}
                
                {items.map(item=>(
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <p>Price: ₹{Number(item.price).toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}


    </div>)
}

export default CartPage;