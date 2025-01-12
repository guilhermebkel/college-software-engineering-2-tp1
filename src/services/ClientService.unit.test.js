const ClientService = require("./ClientService");

describe('ClientService', () => {
	let client;

	beforeEach(() => {
		client = new ClientService(1, 'John Doe', 'john.doe@example.com', '123456789', '123 Main St', '1990-01-01', 'Male');
	});

	test('Should create a client with all properties', () => {
		expect(client.name).toBe('John Doe');
	});

	test('Should update client email', () => {
		client.updateEmail('john.new@example.com');
		expect(client.email).toBe('john.new@example.com');
	});

	test('Should update client phone', () => {
		client.updatePhone('987654321');
		expect(client.phone).toBe('987654321');
	});

	test('Should update client address', () => {
		client.updateAddress('456 Another St');
		expect(client.address).toBe('456 Another St');
	});

	test('Should deactivate client', () => {
		client.deactivate();
		expect(client.isActive).toBe(false);
	});

	test('Should activate client', () => {
		client.deactivate();
		client.activate();
		expect(client.isActive).toBe(true);
	});

	test('Should get client details', () => {
		const details = client.getClientDetails();
		expect(details).toEqual({
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '123456789',
			address: '123 Main St',
			birthDate: '1990-01-01',
			gender: 'Male',
			isActive: true,
			registrationDate: expect.any(Date)
		});
	});

	test('Should export client to JSON', () => {
		const json = client.exportToJSON();
		expect(typeof json).toBe('string');
	});

	test('Should throw error when creating client with missing mandatory fields', () => {
		expect(() => new ClientService(null, 'John Doe', 'john.doe@example.com', '123456789')).toThrow('ID, nome, email e telefone são obrigatórios para criar um cliente válido.');
	});
});