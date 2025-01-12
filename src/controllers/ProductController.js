const ProductService = require("../services/ProductService")

class ProductController {
	constructor(inventory) {
		this.inventory = inventory;
	}

	async createProduct(req, res) {
		try {
			const { id, name, price, quantity, category, ...rest } = req.body;
			const product = new ProductService(id, name, price, quantity, category, rest.description, rest.brand);
			this.inventory.addProduct(product);
			res.status(201).json(product);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getProduct(req, res) {
		try {
			const product = this.inventory.getProductById(parseInt(req.params.id));
			res.json(product);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	}
}

module.exports = ProductController;
