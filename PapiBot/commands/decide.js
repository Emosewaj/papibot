class decide {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("Decide what?");
		let decisions = args.join(" ").split(" or ");
		return m.channel.send("I'd say " + decisions[Math.floor(Math.random() * decisions.length)] + "!");
	}
}

module.exports = decide;