class InventoryService {
	constructor() {
			this.products = [];
	}

	addProduct(product) {
			if (!product || !product.id) throw new Error('Produto inválido ou sem ID.');
			if (this.products.find(p => p.id === product.id)) throw new Error('Produto com este ID já existe no estoque.');
			this.products.push(product);
	}

	removeProduct(productId) {
			const initialLength = this.products.length;
			this.products = this.products.filter(product => product.id !== productId);
			if (this.products.length === initialLength) {
					throw new Error('Produto não encontrado no estoque.');
			}
	}

	updateQuantity(productId, quantity) {
			if (quantity < 0) throw new Error('A quantidade não pode ser negativa.');
			const product = this.products.find(p => p.id === productId);
			if (!product) throw new Error('Produto não encontrado no estoque.');
			product.quantity = quantity;
	}

	getAllProducts() {
			return this.products;
	}

	getProductById(productId) {
			const product = this.products.find(p => p.id === productId);
			if (!product) throw new Error('Produto não encontrado no estoque.');
			return product;
	}

	applyGlobalDiscount(percentage) {
			if (percentage <= 0 || percentage > 100) throw new Error('Percentual de desconto inválido.');
			this.products.forEach(product => {
					product.price = product.price - (product.price * (percentage / 100));
			});
	}

	exportInventoryToJSON() {
			return JSON.stringify(this.products, null, 2);
	}

	importInventoryFromJSON(jsonData) {
			try {
					const importedProducts = JSON.parse(jsonData);
					importedProducts.forEach(product => this.addProduct(product));
			} catch (error) {
					throw new Error('Erro ao importar estoque: ' + error.message);
			}
	}

	getTotalInventoryValue() {
			return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
	}

	sortProductsByPrice(order = 'asc') {
			this.products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
	}

	filterProductsByPriceRange(minPrice, maxPrice) {
			return this.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
	}

	generateInventoryReport() {
			return this.products.map(product => (
					`ID: ${product.id}, Nome: ${product.name}, Preço: $${product.price.toFixed(2)}, Quantidade: ${product.quantity}`
			)).join('\n');
	}

	checkLowStock(threshold) {
			return this.products.filter(product => product.quantity < threshold);
	}

	updateProductPrice(productId, newPrice) {
			if (newPrice <= 0) throw new Error('O preço deve ser maior que zero.');
			const product = this.getProductById(productId);
			product.price = newPrice;
	}

	addMultipleProducts(productList) {
			productList.forEach(product => this.addProduct(product));
	}

	undoLastAdd() {
			this.products.pop();
	}
}

module.exports = InventoryService;
