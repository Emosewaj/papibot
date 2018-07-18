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

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Reacts to a message",
			longDesc: "Reacts to a message with a given unicode emoji. Custom emojis not supported (yet(?)).",
			syntax: "react <message id> <unicode emoji>"
		};
	}
}

module.exports = react;