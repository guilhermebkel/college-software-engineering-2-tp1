const request = require('supertest');
const App = require('./AppModule');

describe('E2E Routes Tests', () => {
    let app;

    beforeAll(() => {
        app = new App();
        app.start();
    });

    afterAll(async () => {
        await app.stop();
    });

    describe('Products Routes', () => {
        const mockProduct = {
            id: 1,
            name: "Test Product",
            price: 100,
            quantity: 10,
            category: "Test Category",
            description: "Test Description",
            brand: "Test Brand"
        };

        test('POST /products - should create a product', async () => {
            const response = await request(app.server)
                .post('/products')
                .send(mockProduct);
            
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(mockProduct);
        });

        test('GET /products/:id - should get a product', async () => {
            // First create a product
            await request(app.server).post('/products').send(mockProduct);
            
            const response = await request(app.server)
                .get(`/products/${mockProduct.id}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(mockProduct);
        });
    });

    describe('Cart Routes', () => {
        const mockProduct = {
            id: 1,
            name: "Test Product",
            price: 100,
            quantity: 10,
            category: "Test"
        };

        beforeEach(async () => {
            await request(app.server).post('/products').send(mockProduct);
        });

        test('POST /cart/items - should add item to cart', async () => {
            const response = await request(app.server)
                .post('/cart/items')
                .send({ productId: mockProduct.id, quantity: 1 });
            
            expect(response.status).toBe(201);
            expect(response.body.items).toHaveLength(1);
        });

        test('DELETE /cart/items/:productId - should remove item from cart', async () => {
            // First add item to cart
            await request(app.server)
                .post('/cart/items')
                .send({ productId: mockProduct.id, quantity: 1 });

            const response = await request(app.server)
                .delete(`/cart/items/${mockProduct.id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.items).toHaveLength(0);
        });

        test('POST /cart/checkout - should checkout cart', async () => {
            // First add item to cart
            await request(app.server)
                .post('/cart/items')
                .send({ productId: mockProduct.id, quantity: 1 });

            const response = await request(app.server)
                .post('/cart/checkout');
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('total');
        });
    });

    describe('Inventory Routes', () => {
        const mockProduct = {
            id: 1,
            name: "Test Product",
            price: 100,
            quantity: 10,
            category: "Test"
        };

        beforeEach(async () => {
            await request(app.server).post('/products').send(mockProduct);
        });

        test('GET /inventory - should get all products', async () => {
            const response = await request(app.server)
                .get('/inventory');
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
        });

        test('PATCH /inventory/:productId/quantity - should update product quantity', async () => {
            const response = await request(app.server)
                .patch(`/inventory/${mockProduct.id}/quantity`)
                .send({ quantity: 20 });
            
            expect(response.status).toBe(200);
            expect(response.body.quantity).toBe(20);
        });
    });

    describe('Client Routes', () => {
        const mockClient = {
            id: 1,
            name: "Test Client",
            email: "test@test.com",
            phone: "1234567890",
            address: "Test Address",
            birthDate: "1990-01-01",
            gender: "M"
        };

        test('POST /clients - should create a client', async () => {
            const response = await request(app.server)
                .post('/clients')
                .send(mockClient);
            
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(mockClient);
        });

        test('GET /clients/:id - should get a client', async () => {
            // First create a client
            await request(app.server).post('/clients').send(mockClient);
            
            const response = await request(app.server)
                .get(`/clients/${mockClient.id}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(mockClient);
        });
    });
});
