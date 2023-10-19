export function addProductHelper(
	productManager,
	title,
	description,
	price,
	thumbnail,
	code,
	stock
) {
	const product = {
		title,
		description,
		price,
		thumbnail,
		code,
		stock,
	};

	productManager.addProduct(product);
}
