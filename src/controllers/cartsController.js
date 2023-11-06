import CartManager from '../models/CartManager.js';

const cartFilePath = 'carts.json';
const cartManager = new CartManager(cartFilePath);

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

	const cart = cartManager.addProductToCart(cartId, productId);

	if (cart) {
		res.json(cart);
	} else {
		res
			.status(404)
			.json({ error: '[-] cart not found or product does not exist [-]' });
	}
}
