class rc {
	static run(client, args) {
		client.commands.get("randcap").run(client, args);
	}
}

module.exports = rc;