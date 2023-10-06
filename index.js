class ProductManager {
	constructor() {
		this.products = [];
		this.nextId = 1;
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		const existingProduct = this.products.find(
			(product) => product.code === code
		);

		// verify if the code already exists
		if (existingProduct) {
			console.error('[-] a product with this code already exists [-]');

			return;
		}

		// verify if all required fields are there
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.error('[-] all fields are required [-]');

			return;
		}

		const product = {
			id: this.nextId++,
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		this.products.push(product);
	}

	getProductById(id) {
		const product = this.products.find((product) => product.id === id);

		// verify if there is a product
		if (!product) {
			console.error('[-] product not found [-]');

			return null;
		}

		return product;
	}
}

// -------------------------------- sample case:

const productManager = new ProductManager();

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

const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

const nonExistentProduct = productManager.getProductById(3);
