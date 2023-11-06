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
	const id = productManager.nextId();
	const product = {
		id,
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
