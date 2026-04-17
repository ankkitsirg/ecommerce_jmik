import express from 'express';
const router=express.Router();
import {addToCart,getCart} from '../controllers/cartController.js';

//step 1--add product in a cart table
router.post("/add",addToCart);

//step 2--get data from cart
router.get("/:userId",getCart);

export default router;