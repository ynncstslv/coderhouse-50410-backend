import express from 'express';
import {
	getProducts,
	getProductById,
	addProductController,
	updateProductController,
	deleteProductController,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProductController);
router.get('/:pid', getProductById);
router.put('/:pid', updateProductController);
router.delete('/:pid', deleteProductController);

export default router;
