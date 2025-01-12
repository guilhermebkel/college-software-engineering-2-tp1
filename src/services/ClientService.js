class ClientService {
	constructor(id, name, email, phone, address = '', birthDate = '', gender = '', isActive = true) {
		if (!id || !name || !email || !phone) {
			throw new Error('ID, nome, email e telefone são obrigatórios para criar um cliente válido.');
		}

		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.birthDate = birthDate;
		this.gender = gender;
		this.isActive = isActive;
		this.registrationDate = new Date();
	}

	updateEmail(newEmail) {
		this.email = newEmail;
	}

	updatePhone(newPhone) {
		this.phone = newPhone;
	}

	updateAddress(newAddress) {
		this.address = newAddress;
	}

	deactivate() {
		this.isActive = false;
	}

	activate() {
		this.isActive = true;
	}

	getClientDetails() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			phone: this.phone,
			address: this.address,
			birthDate: this.birthDate,
			gender: this.gender,
			isActive: this.isActive,
			registrationDate: this.registrationDate
		};
	}

	toString() {
		return `Cliente: ${this.name} (ID: ${this.id}) - Email: ${this.email} - Telefone: ${this.phone}`;
	}

	exportToJSON() {
		return JSON.stringify(this.getClientDetails(), null, 2);
	}

	importFromJSON(jsonData) {
		try {
			const data = JSON.parse(jsonData);
			Object.assign(this, data);
		} catch (error) {
			throw new Error('Erro ao importar dados do cliente: ' + error.message);
		}
	}
}

module.exports = ClientService;