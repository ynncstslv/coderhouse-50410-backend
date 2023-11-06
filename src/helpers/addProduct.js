export function addProductHelper(
	productManager,
	title,
	description,
	price,
	thumbnail,
	code,
	stock,
	status
) {
	const product = {
		title,
		description,
		price,
		thumbnail,
		code,
		stock,
		status,
	};

	productManager.addProduct(product);
}
