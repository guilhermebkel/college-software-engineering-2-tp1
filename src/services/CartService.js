class CartService {
	constructor() {
			this.items = [];
			this.totalDiscount = 0;
			this.logs = [];
	}

	addItem(product, quantity) {
			if (!product || quantity <= 0) throw new Error('Produto inválido ou quantidade deve ser maior que zero.');

			const existingItem = this.items.find(item => item.product.id === product.id);

			if (existingItem) {
					existingItem.quantity += quantity;
			} else {
					this.items.push({ product, quantity });
			}

			this.logAction(`Adicionado ${quantity} x ${product.name} ao carrinho.`);
	}

	removeItem(productId) {
			const initialLength = this.items.length;
			this.items = this.items.filter(item => item.product.id !== productId);
			if (this.items.length < initialLength) {
					this.logAction(`Removido produto com ID ${productId} do carrinho.`);
			} else {
					throw new Error('Produto não encontrado no carrinho.');
			}
	}

	updateQuantity(productId, quantity) {
			if (quantity <= 0) throw new Error('A quantidade deve ser maior que zero.');
			const item = this.items.find(item => item.product.id === productId);
			if (!item) throw new Error('Produto não encontrado no carrinho.');
			item.quantity = quantity;
			this.logAction(`Quantidade do produto com ID ${productId} atualizada para ${quantity}.`);
	}

	applyCoupon(couponCode) {
			const discountAmount = this.getCouponDiscount(couponCode);
			if (discountAmount > 0) {
					this.totalDiscount += discountAmount;
					this.logAction(`Cupom ${couponCode} aplicado. Desconto de $${discountAmount}.`);
			} else {
					throw new Error('Cupom inválido ou expirado.');
			}
	}

	getCouponDiscount(couponCode) {
			const coupons = {
					'SAVE10': 10,
					'BLACKFRIDAY': 20,
					'FREESHIP': 5
			};
			return coupons[couponCode] || 0;
	}

	getTotal() {
			const total = this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
			return total - this.totalDiscount;
	}

	checkout() {
			if (this.items.length === 0) throw new Error('Não é possível finalizar a compra com o carrinho vazio.');

			const total = this.getTotal();
			const receipt = {
					items: this.items,
					total: total,
					discount: this.totalDiscount,
					date: new Date().toISOString()
			};

			this.clearCart();
			this.logAction(`Compra finalizada. Total: $${total}`);
			return receipt;
	}

	clearCart() {
			this.items = [];
			this.totalDiscount = 0;
			this.logAction('Carrinho limpo.');
	}

	validateStock(product, availableStock, quantity) {
			if (quantity > availableStock) {
					throw new Error(`Estoque insuficiente para o produto: ${product.name}. Disponível: ${availableStock}`);
			}
	}

	logAction(message) {
			const timestamp = new Date().toISOString();
			this.logs.push({ timestamp, message });
			console.log(`[LOG] ${timestamp} - ${message}`);
	}

	getLogHistory() {
			return this.logs;
	}

	getCartState() {
			return {
					items: this.items,
					total: this.getTotal(),
					totalDiscount: this.totalDiscount,
					log: this.logs
			};
	}

	exportCartToJSON() {
			return JSON.stringify(this.getCartState(), null, 2);
	}
}

module.exports = CartService;
