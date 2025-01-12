const CartService = require("./CartService");
const ProductService = require("./ProductService");

describe('CartService', () => {
    let cart;
    let product;

    beforeEach(() => {
        cart = new CartService();
        product = new ProductService(1, 'Banana', 2.50, 100, 'Fruits');
    });

    test('Should add product to cart', () => {
        cart.addItem(product, 2);
        expect(cart.items.length).toBe(1);
    });

    test('Should not add product with negative quantity', () => {
        expect(() => cart.addItem(product, -1)).toThrow('Produto inválido ou quantidade deve ser maior que zero.');
    });

    test('Should increase quantity of existing product in cart', () => {
        cart.addItem(product, 2);
        cart.addItem(product, 3);
        expect(cart.items[0].quantity).toBe(5);
    });

    test('Should remove product from cart', () => {
        cart.addItem(product, 2);
        cart.removeItem(product.id);
        expect(cart.items.length).toBe(0);
    });

    test('Should throw error if product does not exist when removing', () => {
        expect(() => cart.removeItem(999)).toThrow('Produto não encontrado no carrinho.');
    });

    test('Should throw error for invalid coupon', () => {
        cart.addItem(product, 2);
        expect(() => cart.applyCoupon('INVALID')).toThrow('Cupom inválido ou expirado.');
    });

    test('Should export cart state as JSON', () => {
        cart.addItem(product, 2);
        const json = cart.exportCartToJSON();
        expect(typeof json).toBe('string');
    });

    test('Should clear all items from cart', () => {
        cart.addItem(product, 2);
        cart.clearCart();
        expect(cart.items.length).toBe(0);
    });
});
