class react {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		return m.channel.fetchMessage(args[0]).then(msg => {
			return msg.react(args[1]).then(() => {
				return m.channel.send("Success!").then(m1 => {
					m1.delete(2000);
				});
			});
		}, err => {
			return m.channel.send("Error: " + err);
		});
	}
}

module.exports = react;