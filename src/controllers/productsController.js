import ProductManager from '../models/ProductManager.js';

import { addProductHelper } from '../helpers/addProduct.js';
import { updateProductHelper } from '../helpers/updateProduct.js';
import { deleteProductHelper } from '../helpers/deleteProduct.js';

const productFilePath = 'products.json';
const productManager = new ProductManager(productFilePath);

export const getProducts = (req, res) => {
	const limit = parseInt(req.query.limit);
	const products = productManager.getProducts(limit);

	if (products) {
		res.json(products);
	} else {
		res.status(404).json({ error: '[-] products not found [-]' });
	}
};

export const getProductById = (req, res) => {
	const productId = parseInt(req.params.pid);
	const product = productManager.getProductById(productId);

	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ error: '[-] product not found [-]' });
	}
};

export const addProductController = (req, res) => {
	const { title, description, price, thumbnail, code, stock, status } =
		req.body;

	if (
		!title ||
		!description ||
		!price ||
		!code ||
		stock === undefined ||
		!status
	) {
		return res.status(400).json({ error: '[-] fields are required [-]' });
	}

	const existingProduct = productManager
		.getProducts()
		.find((product) => product.code === code);

	if (existingProduct) {
		return res
			.status(409)
			.json({ error: '[-] a product with this code already exists [-]' });
	}

	try {
		addProductHelper(
			productManager,
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			status
		);

		res.status(201).json({ message: '[+] product added successfully [+]' });
	} catch (error) {
		console.error('[-] an error occurred while adding the product [-]', error);

		res.status(500).json({ error: '[-] internal server error [-]' });
	}
};

export const updateProductController = (req, res) => {
	const productId = parseInt(req.params.pid);
	const updatedFields = req.body;

	try {
		const product = productManager.getProductById(productId);

		if (product) {
			updateProductHelper(productManager, productId, updatedFields);

			res.json({ message: '[+] product updated successfully [+]' });
		} else {
			res.status(404).json({ error: '[-] product not found [-]' });
		}
	} catch (error) {
		console.error(
			'[-] an error occurred while updating the product [-]',
			error
		);

		res.status(500).json({ error: '[-] internal server error [-]' });
	}
};

export const deleteProductController = (req, res) => {
	const productId = parseInt(req.params.pid);

	try {
		const product = productManager.getProductById(productId);

		if (product) {
			deleteProductHelper(productManager, productId);

			res.json({ message: '[+] product deleted successfully [+]' });
		} else {
			res.status(404).json({ error: '[-] product not found [-]' });
		}
	} catch (error) {
		console.error(
			'[-] an error occurred while deleting the product [-]',
			error
		);

		res.status(500).json({ error: '[-] internal server error [-]' });
	}
};
