const urls = require("../data/8ball.json");

class eightball {
	static run(client, args) {
		const m = args.shift();
		m.channel.send({
			embed: {
				title: "8ball - " + m.member.displayName,
				description: args.join(" "),
				image: {
					url: urls[Math.floor(Math.random() * 20)]
				}
			}
		});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Let the magic 8ball decide your fate",
			longDesc: "Let a magic 8ball randomly select from a pool of answers to your Yes/No questions.",
			syntax: "8ball [question]"
		};
	}
}

module.exports = eightball;