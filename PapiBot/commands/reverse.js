class reverse {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("You need to send me some text!");
		return m.channel.send(m.content.split("").slice(10).reverse().join(""));
	}
}

module.exports = reverse;