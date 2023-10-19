export function updateProductHelper(productManager, productId, updatedFields) {
	const product = productManager.getProductById(productId);

	if (product) {
		productManager.updateProduct(productId, { ...product, ...updatedFields });
	}
}
