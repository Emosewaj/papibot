class templateCommand {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		client.fetchUser(args.shift()).then(User => {
			return User.send(args.join(" ")).then(() => {
				return m.channel.send("Successfully sent \"" + args.join(" ") + "\" to " + User.tag);
			}, err => {
				return m.channel.send("Error: " + err);
			});
		});
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "DMs a user",
			longDesc: "Sends a direct message to a user.",
			syntax: "dm <id> <text>"
		};
	}
}

module.exports = templateCommand;