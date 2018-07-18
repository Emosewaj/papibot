const facts = require("../data/facts.json");

class fact {
	static run(client, args) {
		const m = args.shift();
		let fact;
		if (args[0]) {
			fact = parseInt(args[0]) - 1;
		}
		if (isNaN(fact)) {
			fact = Math.floor(Math.random() * facts.length);
		}
		if (fact < 0 || fact >= facts.length) return m.channel.send("That's not a valid value! Try any number between 1 and " + facts.length + "!");
		return m.channel.send("Fact #" + (fact + 1) + ": " + facts[fact]);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Posts an interesting fact",
			longDesc: "Posts an interesting knowledge fact. You may also select which fact to display.",
			syntax: "fact [fact number]"
		};
	}
}

module.exports = fact;