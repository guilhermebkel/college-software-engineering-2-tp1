const express = require('express');

const CartService = require('./services/CartService');
const InventoryService = require('./services/InventoryService');

const CartController = require('./controllers/CartController');
const ProductController = require('./controllers/ProductController');
const InventoryController = require('./controllers/InventoryController');
const ClientController = require('./controllers/ClientController');

class App {
    setupServer() {
        this.app = express();
        this.app.use(express.json());
    }

    startServer() {
        const PORT = process.env.PORT || 3000;

        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }

    setupRoutes() {
        const inventoryService = new InventoryService();
        const cartService = new CartService();

        const cartController = new CartController(inventoryService, cartService);
        const productController = new ProductController(inventoryService);
        const inventoryController = new InventoryController(inventoryService);
        const clientController = new ClientController();

        this.app.post('/products', (req, res) => productController.createProduct(req, res));
        this.app.get('/products/:id', (req, res) => productController.getProduct(req, res));

        this.app.post('/cart/items', (req, res) => cartController.addItem(req, res));
        this.app.delete('/cart/items/:productId', (req, res) => cartController.removeItem(req, res));
        this.app.post('/cart/checkout', (req, res) => cartController.checkout(req, res));

        this.app.get('/inventory', (req, res) => inventoryController.getAllProducts(req, res));
        this.app.patch('/inventory/:productId/quantity', (req, res) => inventoryController.updateQuantity(req, res));

        this.app.post('/clients', (req, res) => clientController.createClient(req, res));
        this.app.get('/clients/:id', (req, res) => clientController.getClient(req, res));
    }
}

const app = new App();

app.setupServer();
app.setupRoutes();
app.startServer();
