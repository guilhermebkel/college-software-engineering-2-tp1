const express = require('express');

const CartService = require('../services/CartService');
const InventoryService = require('../services/InventoryService');

const CartController = require('../controllers/CartController');
const ProductController = require('../controllers/ProductController');
const InventoryController = require('../controllers/InventoryController');
const ClientController = require('../controllers/ClientController');

class AppModule {
    start() {
        this.#setupServer();
        this.#setupRoutes();
        this.#startServer();
    }

    async stop() {
        return new Promise((resolve) => {
            if (this.httpServer) {
                this.httpServer.close(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    #setupServer() {
        this.server = express();
        this.server.use(express.json());
    }

    #startServer() {
        const PORT = process.env.PORT || 3000;

        this.httpServer = this.server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }

    #setupRoutes() {
        const inventoryService = new InventoryService();
        const cartService = new CartService();

        const cartController = new CartController(inventoryService, cartService);
        const productController = new ProductController(inventoryService);
        const inventoryController = new InventoryController(inventoryService);
        const clientController = new ClientController();

        this.server.post('/products', (req, res) => productController.createProduct(req, res));
        this.server.get('/products/:id', (req, res) => productController.getProduct(req, res));

        this.server.post('/cart/items', (req, res) => cartController.addItem(req, res));
        this.server.delete('/cart/items/:productId', (req, res) => cartController.removeItem(req, res));
        this.server.post('/cart/checkout', (req, res) => cartController.checkout(req, res));

        this.server.get('/inventory', (req, res) => inventoryController.getAllProducts(req, res));
        this.server.patch('/inventory/:productId/quantity', (req, res) => inventoryController.updateQuantity(req, res));

        this.server.post('/clients', (req, res) => clientController.createClient(req, res));
        this.server.get('/clients/:id', (req, res) => clientController.getClient(req, res));
    }
}

module.exports = AppModule;
