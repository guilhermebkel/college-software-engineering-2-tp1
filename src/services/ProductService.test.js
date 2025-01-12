const ProductService = require("./ProductService");

describe('ProductService', () => {
    let product;

    beforeEach(() => {
        product = new ProductService(1, 'Milk', 3.50, 30, 'Dairy');
    });

    test('Should create a product with all properties', () => {
        expect(product.name).toBe('Milk');
    });

    test('Should update product price', () => {
        product.updatePrice(4.50);
        expect(product.price).toBe(4.50);
    });

    test('Should throw error for negative price update', () => {
        expect(() => product.updatePrice(-5)).toThrow('O preço deve ser maior que zero.');
    });

    test('Should update product quantity', () => {
        product.updateQuantity(40);
        expect(product.quantity).toBe(40);
    });

    test('Should calculate total weight', () => {
        const weight = product.getTotalWeight(5);
        expect(weight).toBe(0);
    });

    test('Should export product to JSON', () => {
        const json = product.exportToJSON();
        expect(typeof json).toBe('string');
    });
});
