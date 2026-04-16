import objofconnection from "../config/db";

//check and create cart for user

const checkOrCreateCart = async (user_id)=>
{
    //checking 
    let cart = await objofconnection.query(`select * from cart
                                            where user_id=$1`, [user_id]);

    //check length of row of cart variable
    if (cart.rows.length === 0) {
        const newcart = await objofconnection.query(`insert into cart(user_id)
                                                        values($1) returning *`, [user_id]);
    }

    return cart.rows[0];// cartid(id) and userid
}

//addToCart
export const addToCart = async (req, res) => {
    try {

        //step 1 --fetch data from frontend/postman
        const { user_id, product_id, quantity } = req.body;

        //step 2--check whether user_id is in cart or not
        const cart = await checkOrCreateCart(user_id);// cart--> id and user_id

        //step 3--check whether product_id is already in cart
        const productexists = await objofconnection.query(`select * from cart_items
                                                        where cart_id = $1 and product_id = $2`, [cart.id, product_id]);

        if (productexists.rows.length === 0) {
            //insert NEW product into cart_items table
            await objofconnection.query(`insert into cart_items(cart_id,product_id,quantity)
                                            values($1,$2,$3)`, [cart.id, product_id, quantity]);
        }

        //send message to client/frontend
        res.json({message:"Added To Cart"});

    }
    catch (err) {

         res.json({error:"Server Error"});
    }
}

//getcart
export const getCart=async (req,res)=>{
    try{
         //step 1 --fetch data from frontend/postman
        const { userId } = req.params;

        //step 2--qusery
         const cart=await objofconnection.query(`select * from cart
                                                            where user_id=$1`,[userId]);
        //step 3--whether cart is empty
        if(cart.rows.length===0)  
               res.json([]);
            
        //step 4--when cart is not empty fetch data from cart_item table
        const items=await objofconnection.query(`select cart_items.id,cart_items.quantity,
                                                products.name,products.price,products.image from cart_items
                                                join products on cart_items.product_id=products.id
                                                    where  cart_id=$1`,[cart.id]); 
       //step 5--send data to frontend
        res.json(items.rows);        

    }
     catch (err) {

         res.json({error:"Server Error"});
    }

}