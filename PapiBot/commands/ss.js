class ss {
	static run(client, args) {
		return client.commands.get("superscript").run(client, args);
	}
}

module.exports = ss;