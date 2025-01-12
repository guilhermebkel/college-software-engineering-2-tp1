class InventoryController {
	constructor(inventory) {
		this.inventory = inventory;
	}

	getAllProducts(req, res) {
		const products = this.inventory.getAllProducts();
		res.json(products);
	}

	updateQuantity(req, res) {
		try {
				const { quantity } = req.body;
				this.inventory.updateQuantity(parseInt(req.params.productId), quantity);
				res.json(this.inventory.getProductById(parseInt(req.params.productId)));
		} catch (error) {
				res.status(400).json({ error: error.message });
		}
	}
}

module.exports = InventoryController;
