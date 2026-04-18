import express from 'express';
const router=express.Router();
import  createorder  from '../controllers/orderController.js';

router.post('/addorder',createorder);

export default router;