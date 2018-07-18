class reverse {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("You need to send me some text!");
		return m.channel.send(m.content.split("").slice(10).reverse().join(""));
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Reverses a string",
			longDesc: "Reverses a string of text.",
			syntax: "reverse <text>"
		};
	}
}

module.exports = reverse;