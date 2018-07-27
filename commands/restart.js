class restart {
	static run(client, args) {
		client.commands.get("shutdown").run(client, args);
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Shuts Papi-Bot down and restarts the bot.",
			longDesc: "Shuts Papi-Bot down and restarts the bot. This is an alias for the shutdown command.",
			syntax: "restart"
		};
	}
}

module.exports = restart;