class rc {
	static run(client, args) {
		client.commands.get("randcap").run(client, args);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Capitalises a string lIkE tHiS",
			longDesc: "Capitalises a string lIkE tHiS aUtOmAtIcAlLy to imitate a certain meme. This is an alias for the randcap command.",
			syntax: "rc <text>"
		};
	}
}

module.exports = rc;