class ss {
	static run(client, args) {
		return client.commands.get("superscript").run(client, args);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Turns a string into superscript letters",
			longDesc: "Turns a string into superscript letters, except for Q, which has no unicode superscript letter. This is an alias for the superscript command.",
			syntax: "ss <text>"
		};
	}
}

module.exports = ss;