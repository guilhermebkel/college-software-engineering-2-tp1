const Inventory = require("./inventory");
const Product = require("./product");

describe('Inventory Class', () => {
    let inventory;
    let product;

    beforeEach(() => {
        inventory = new Inventory();
        product = new Product(1, 'Apple', 1.50, 50, 'Fruits');
    });

    test('Should add product to inventory', () => {
        inventory.addProduct(product);
        expect(inventory.products.length).toBe(1);
    });

    test('Should not add product with duplicate ID', () => {
        inventory.addProduct(product);
        expect(() => inventory.addProduct(product)).toThrow('Produto com este ID já existe no estoque.');
    });

    test('Should remove product from inventory', () => {
        inventory.addProduct(product);
        inventory.removeProduct(product.id);
        expect(inventory.products.length).toBe(0);
    });

    test('Should throw error if product to be removed does not exist', () => {
        expect(() => inventory.removeProduct(999)).toThrow('Produto não encontrado no estoque.');
    });

    test('Should update product quantity in inventory', () => {
        inventory.addProduct(product);
        inventory.updateQuantity(product.id, 20);
        expect(inventory.getProductById(product.id).quantity).toBe(20);
    });

    test('Should throw error for invalid product ID during update', () => {
        expect(() => inventory.updateQuantity(999, 10)).toThrow('Produto não encontrado no estoque.');
    });

    test('Should export inventory to JSON', () => {
        inventory.addProduct(product);
        const json = inventory.exportInventoryToJSON();
        expect(typeof json).toBe('string');
    });

    test('Should calculate total value of all products in inventory', () => {
        inventory.addProduct(product);
        expect(inventory.getTotalInventoryValue()).toBe(75);
    });

    test('Should import products from JSON', () => {
        const jsonData = '[{"id":2,"name":"Orange","price":2.00,"quantity":20}]';
        inventory.importInventoryFromJSON(jsonData);
        expect(inventory.products.length).toBe(1);
    });
});
