import CartManager from '../models/CartManager.js';
import ProductManager from '../models/ProductManager.js';

const cartFilePath = 'carts.json';
const cartManager = new CartManager(cartFilePath);

const productFilePath = 'products.json';
const productManager = new ProductManager(productFilePath);

export function createCartController(req, res) {
	const newCart = cartManager.createCart();

	res.status(201).json(newCart);
}

export function getCartProductsController(req, res) {
	const cartId = req.params.cid;
	const cart = cartManager.getCartById(cartId);

	if (cart) {
		res.json(cart.products);
	} else {
		res.status(404).json({ error: '[-] cart not found [-]' });
	}
}

export function addProductToCartController(req, res) {
	const cartId = req.params.cid;
	const productId = req.params.pid;

	const cart = cartManager.getCartById(cartId);

	if (cart) {
		const product = productManager
			.getProducts()
			.find((product) => product.id === parseInt(productId));

		if (product) {
			const productIndex = cart.products.findIndex(
				(item) => item.product === productId
			);

			if (productIndex !== -1) {
				cart.products[productIndex].quantity++;
			} else {
				cart.products.push({ product: productId, quantity: 1 });
			}

			cartManager.saveCarts();
			res.json(cart);
		} else {
			res.status(404).json({ error: '[-] Product not found [-]' });
		}
	} else {
		res.status(404).json({ error: '[-] Cart not found [-]' });
	}
}
