const fs = require("fs");

class sendnoots {
	static run(client, args) {
		const m = args.shift();
		let noots = fs.readFileSync("./data/sendnoots.txt", "utf8").split("\r\n");
		return m.channel.send("Noot noot!", {
			files: [
				noots[Math.floor(Math.random() * noots.length)]
			]
		});
	}
}

module.exports = sendnoots;