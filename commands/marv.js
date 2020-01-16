class ss {
	static run(client, args) {
		return client.commands.get("scp").run(client, args);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Links to an SCP on the SCP-Wiki, thanks Marv!",
			longDesc: "Links to an SCP on the SCP-Wiki, thanks Marv! This is an alias to the scp command.",
			syntax: "marv <number>"
		};
	}
}

module.exports = ss;