class eightball {
	static run(client, args) {
		const m = args.shift();
		m.channel.send({
			embed: {
				title: "8ball",
				description: args.join(),
				image: {
					url: `./data/8ball/${Math.floor(Math.random() * (20 - 1 + 1) + 1)}.gif`
				}
			}
		});
	}
}

module.exports = eightball;