class Product {
	constructor(id, name, price, quantity, category, description = '', brand = '', supplier = '', weight = 0, dimensions = { width: 0, height: 0, depth: 0 }) {
			if (!id || !name || price <= 0 || quantity < 0) {
					throw new Error('ID, nome, preço e quantidade são obrigatórios para criar um produto válido.');
			}
			
			this.id = id;
			this.name = name;
			this.price = price;
			this.quantity = quantity;
			this.category = category;
			this.description = description;
			this.brand = brand;
			this.supplier = supplier;
			this.weight = weight;
			this.dimensions = dimensions;
	}

	updatePrice(newPrice) {
			if (newPrice <= 0) throw new Error('O preço deve ser maior que zero.');
			this.price = newPrice;
	}

	updateQuantity(newQuantity) {
			if (newQuantity < 0) throw new Error('A quantidade não pode ser negativa.');
			this.quantity = newQuantity;
	}

	updateDescription(description) {
			this.description = description;
	}

	updateDimensions(dimensions) {
			this.dimensions = dimensions;
	}

	isInStock() {
			return this.quantity > 0;
	}

	getTotalWeight(quantity) {
			if (quantity <= 0) throw new Error('A quantidade deve ser maior que zero.');
			return this.weight * quantity;
	}

	getProductDetails() {
			return {
					id: this.id,
					name: this.name,
					price: this.price,
					quantity: this.quantity,
					category: this.category,
					description: this.description,
					brand: this.brand,
					supplier: this.supplier,
					weight: this.weight,
					dimensions: this.dimensions
			};
	}

	applyDiscount(percentage) {
			if (percentage <= 0 || percentage > 100) throw new Error('A porcentagem de desconto deve ser entre 0 e 100.');
			this.price = this.price - (this.price * (percentage / 100));
	}

	belongsToCategory(category) {
			return this.category.toLowerCase() === category.toLowerCase();
	}

	toString() {
			return `Produto: ${this.name} (ID: ${this.id}) - Preço: $${this.price.toFixed(2)} - Quantidade: ${this.quantity}`;
	}

	getVolume() {
			const { width, height, depth } = this.dimensions;
			return width * height * depth;
	}

	exportToJSON() {
			return JSON.stringify(this.getProductDetails(), null, 2);
	}

	importFromJSON(jsonData) {
			try {
					const data = JSON.parse(jsonData);
					Object.assign(this, data);
			} catch (error) {
					throw new Error('Erro ao importar dados do produto: ' + error.message);
			}
	}

	comparePrice(otherProduct) {
			if (!(otherProduct instanceof Product)) throw new Error('Comparar apenas com instâncias de Produto.');
			if (this.price > otherProduct.price) return 1;
			if (this.price < otherProduct.price) return -1;
			return 0;
	}

	generateBarcode() {
			return `BARCODE-${this.id}-${Date.now()}`;
	}

	isFromSupplier(supplier) {
			return this.supplier.toLowerCase() === supplier.toLowerCase();
	}
}

module.exports = Product;
