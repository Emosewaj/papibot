class templateCommand {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		if (!client.checkPermission(m.guild.me, ["MANAGE_MESSAGES"])) return m.author.send("I cannot delete messages in that guild!");
		return m.delete().then(() => {
			m.channel.send(args.join(" "));
		});
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Say something as Papi-Bot",
			longDesc: "Say something as Papi-Bot.",
			syntax: "say <text>"
		};
	}
}

module.exports = templateCommand;