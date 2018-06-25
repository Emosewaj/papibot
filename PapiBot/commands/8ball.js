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
}

module.exports = eightball;