const fs = require('fs');

class ProductManager {
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

	addProduct(title, description, price, thumbnail, code, stock) {
		const existingProduct = this.products.find(
			(product) => this.products.code === code
		);

		if (existingProduct) {
			console.error('[-] a product with this code already exists [-]');
		}

		if (
			!title ||
			!description ||
			!price ||
			!thumbnail ||
			!code ||
			stock === undefined
		) {
			console.error('[-] all fields are required [-]');
		}

		const product = {
			id: this.nextId(),
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		this.products.push(product);
		this.saveProducts();
	}

	nextId() {
		const maxId = this.products.reduce(
			(max, product) => (product.id > max ? product.id : max),
			0
		);

		return maxId + 1;
	}

	getProducts() {
		return this.products;
	}

	getProductById(id) {
		const product = this.products.find((product) => product.id === id);

		if (!product) {
			console.error('[-] product not found [-]');

			return null;
		}

		return product;
	}

	updateProduct(id, updatedFields) {
		const productIndex = this.products.findIndex(
			(product) => product.id === id
		);

		if (productIndex === -1) {
			console.error('[-] product not found [-]');

			return;
		}

		this.products[productIndex] = {
			...this.products[productIndex],
			...updatedFields,
			id,
		};

		this.saveProducts();
	}

	deleteProduct(id) {
		const productIndex = this.products.findIndex(
			(product) => product.id === id
		);

		if (productIndex === -1) {
			console.error('[-] product not found [-]');

			return;
		}

		this.products.splice(productIndex, 1);
		this.saveProducts();
	}
}

// -------------------------------- sample case:

const productManager = new ProductManager('products.json');

productManager.addProduct(
	'Product 1',
	'Product 1 Description',
	19.99,
	'thumb1.jpg',
	'P1',
	10
);
productManager.addProduct(
	'Product 2',
	'Product 2 Description',
	29.99,
	'thumb2.jpg',
	'P2',
	15
);

const allProducts = productManager.getProducts();
console.log(`Products: ${allProducts}`);

const foundProduct = productManager.getProductById(1);
console.log(`Product Found by ID: ${foundProduct}`);

productManager.updateProduct(1, { price: 24.99, stock: 12 });
console.log(`Updated Product: ${productManager.getProductById(1)}`);

productManager.deleteProduct(2);
console.log('The product with ID 2 was successfully deleted!');

const updatedProducts = productManager.getProducts();
console.log('Produtos atualizados:', updatedProducts);
