import express from 'express';
import {
	createCartController,
	getCartProductsController,
	addProductToCartController,
} from '../controllers/cartsController.js';

const router = express.Router();

router.post('/', createCartController);
router.get('/:cid', getCartProductsController);
router.post('/:cid/product/:pid', addProductToCartController);

export default router;
