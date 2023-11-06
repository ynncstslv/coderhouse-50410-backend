import fs from 'fs';

export default class ProductManager {
	constructor(filePath) {
		this.path = filePath;
		this.products = [];
		this.loadProducts();
	}

	loadProducts() {
		try {
			const data = fs.readFileSync(this.path, 'utf8');

			this.products = JSON.parse(data);

			if (!Array.isArray(this.products)) {
				this.products = [];
			}
		} catch (error) {
			this.products = [];
		}
	}

	saveProducts() {
		const data = JSON.stringify(this.products, null, 2);

		fs.writeFileSync(this.path, data);
	}

	addProduct(product) {
		this.products.push(product);
		this.saveProducts();
	}

	nextId() {
		const maxId = this.products.reduce(
			(max, product) => (product.id > max ? product.id : max),
			0
		);
		return this.products.length > 0 ? maxId + 1 : 1;
	}

	getProducts(limit) {
		if (limit) {
			return this.products.slice(0, limit);
		}

		return this.products;
	}

	getProductById(id) {
		return this.products.find((product) => product.id === id);
	}

	updateProduct(id, updatedFields) {
		const productIndex = this.products.findIndex(
			(product) => product.id === id
		);

		if (productIndex !== -1) {
			this.products[productIndex] = {
				...this.products[productIndex],
				...updatedFields,
				id,
			};

			this.saveProducts();
		}
	}

	deleteProduct(id) {
		const productIndex = this.products.findIndex(
			(product) => product.id === id
		);

		if (productIndex !== -1) {
			this.products.splice(productIndex, 1);
			this.saveProducts();
		}
	}
}
