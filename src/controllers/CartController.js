class CartController {
	constructor(inventory, cart) {
		this.inventory = inventory;
		this.cart = cart;
	}

	addItem(req, res) {
		try {
				const { productId, quantity } = req.body;
				const product = this.inventory.getProductById(productId);
				this.cart.addItem(product, quantity);
				res.status(201).json(this.cart.getCartState());
		} catch (error) {
				res.status(400).json({ error: error.message });
		}
	}

	removeItem(req, res) {
		try {
				this.cart.removeItem(parseInt(req.params.productId));
				res.json(this.cart.getCartState());
		} catch (error) {
				res.status(404).json({ error: error.message });
		}
	}

	checkout(req, res) {
		try {
				const receipt = this.cart.checkout();
				res.json(receipt);
		} catch (error) {
				res.status(400).json({ error: error.message });
		}
	}
}

module.exports = CartController;
