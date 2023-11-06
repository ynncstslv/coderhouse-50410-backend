import fs from 'fs';

export default class CartManager {
	constructor(filePath) {
		this.path = filePath;
		this.carts = [];
		this.loadCarts();
	}

	loadCarts() {
		try {
			const data = fs.readFileSync(this.path, 'utf8');
			this.carts = JSON.parse(data);

			if (!Array.isArray(this.carts)) {
				this.carts = [];
			}
		} catch (error) {
			this.carts = [];
		}
	}

	saveCarts() {
		const data = JSON.stringify(this.carts, null, 2);

		fs.writeFileSync(this.path, data);
	}

	createCart() {
		const newCart = {
			id: this.generateUniqueCartId(),
			products: [],
		};

		this.carts.push(newCart);
		this.saveCarts();

		return newCart;
	}

	getCartById(cartId) {
		return this.carts.find((cart) => cart.id === cartId);
	}

	addProductToCart(cartId, productId) {
		const cart = this.getCartById(cartId);

		if (cart) {
			const productIndex = cart.products.findIndex(
				(item) => item.product === productId
			);

			if (productIndex !== -1) {
				cart.products[productIndex].quantity++;
			} else {
				cart.products.push({ product: productId, quantity: 1 });
			}

			this.saveCarts();

			return cart;
		}

		return null;
	}

	generateUniqueCartId() {
		const existingIds = this.carts.map((cart) => cart.id);
		let newId;

		do {
			newId = Math.floor(Math.random() * 1000000).toString();
		} while (existingIds.includes(newId));

		return newId;
	}
}
