import express from 'express';
import {
	getProducts,
	getProductById,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);

export default router;
