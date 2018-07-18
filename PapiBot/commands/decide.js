class decide {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("Decide what?");
		let decisions = args.join(" ").split(" or ");
		return m.channel.send("I'd say " + decisions[Math.floor(Math.random() * decisions.length)] + "!");
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Decides between a list of things",
			longDesc: "Randomly picks an option from a given list of things. Use \"or\" to separate choices.",
			syntax: "decide <something> or <something> [or something ...repeat]"
		};
	}
}

module.exports = decide;