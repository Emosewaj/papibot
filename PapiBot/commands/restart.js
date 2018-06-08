class restart {
	static run(client, args) {
		client.commands.get("shutdown").run(client, args);
	}
}

module.exports = restart;