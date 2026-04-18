import objofconnection from "../config/db.js";

const createorder=async (req,res)=>{ 
    try{
        //step 1 --fetch data from frontend/postman
        const { user_id, address_line,city,state,country,zip_code,payment_method } = req.body;
        //step 2--check whether user_id is in cart or not
        const cart = await objofconnection.query(`select * from cart
                                            where user_id=$1`, [user_id]);
        if(cart.rows.length===0){
            return res.json({error:"Cart Not Found"});
        } 
        //calculate total price of order
        const cartItems=await objofconnection.query(`select p.price, ci.quantity from cart_items ci join products p on ci.product_id=p.id
                                                        where ci.cart_id=$1`,[cart.rows[0].id]);
        let total_amount=0;          
        for(const item of cartItems.rows){
            total_amount+=item.price*item.quantity;
        }
        //step 3--create order
        const order=await objofconnection.query(`insert into orders(user_id,address_line,city,state,country,zip_code,payment_method,total_amount)
                                                values($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
                                                [user_id,address_line,city,state,country,zip_code,payment_method,total_amount]);
        //step 4--insert order items
        for(const item of cartItems.rows){
            await objofconnection.query(`insert into order_items(order_id,product_id,quantity,price)
                                            values($1,$2,$3,$4)`,[order.rows[0].id,item.product_id,item.quantity,item.price]);          

        }
        //step 5--clear cart
        await objofconnection.query(`delete from cart_items where cart_id=$1`,[cart.rows[0].id]);

        //step 6--send response to frontend
        res.json({message:"Order Created Successfully",order_id:order.rows[0].id});
     
    }

        catch (err) {

         res.json({error:"Server Error"});      
        }
    }

    export default createorder;