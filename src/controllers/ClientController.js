const ClientService = require("../services/ClientService")

class ClientController {
	constructor() {
		this.clients = new Map();
	}

	createClient(req, res) {
		try {
			const { id, name, email, phone, address, birthDate, gender } = req.body;
			const client = new ClientService(id, name, email, phone, address, birthDate, gender);
			this.clients.set(id, client);
			res.status(201).json(client.getClientDetails());
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	getClient(req, res) {
		const client = this.clients.get(parseInt(req.params.id));
		if (!client) {
			return res.status(404).json({ error: 'Cliente não encontrado' });
		}
		res.json(client.getClientDetails());
	}
}

module.exports = ClientController;
