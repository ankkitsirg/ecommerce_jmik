import { useEffect,useState } from "react";

const OrderPage = () => {
    const [cart,setcart] = useState([]);
    const [orderform,setorderform] = useState({
        user_id:1,
        address_line:"",
        city:"",    
        state:"",
        country:"",
        zip_code:"",
        payment_method:"cod"
    });
    const [message,setmessage] = useState("");

    //handle form change
    const handlechange=(e)=>{
        setorderform({...orderform,[e.target.name]:e.target.value});
    }
    //handle order submission
    const handleorder=()=>{
        fetch("http://localhost:5000/api/orders/addorder",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(orderform)
        })
        .then(res=>{if(!res.ok){throw new Error("Failed to place order");} return res.json();})
        .then(data=>{console.log("Order placed successfully:", data); setmessage("Order placed successfully!");})
        .catch(err=>{console.error("Error placing order:", err); setmessage("Failed to place order.");});
    };


    useEffect(()=>{
        fetch("http://localhost:5000/api/cart/1")
        .then(res=>{if(!res.ok){throw new Error("Failed to fetch cart items");} return res.json();})
        .then(data=>{setcart(data);})
        .catch(err=>{console.error("Error fetching cart items:", err);});       
    },[]);
    return (
        <div>
            <h1>Order Page</h1>
            {/* ADDRESS */}
            <input type="text" name="address_line" placeholder="Enter your address" onChange={handlechange}/>  
            <input type="text" name="city" placeholder="Enter your city" onChange={handlechange} />
            <input type="text" name="state" placeholder="Enter your State" onChange={handlechange} />
            <input type="text" name="country" placeholder="Enter your country" onChange={handlechange} />
            
            <input type="text" name="zip_code" placeholder="Enter your ZIP code" onChange={handlechange} />

            {/* Payment */}
            <h3>Payment Method</h3>
            <select name="payment_method" onChange={handlechange}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
            </select>

            {/* summary */}
            <h3>Order Summary </h3>
            {cart.map(item=>(
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{Number(item.price).toFixed(2)}</p>
                </div>
            ))}
            <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Total Price: ₹{Number(cart.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2)}</p>

            <button className="bg-blue-500 text-white px-20 rounded" onClick={handleorder}>Place Order</button>
            <p>{message}</p>
        </div>
    );
};

export default OrderPage;   