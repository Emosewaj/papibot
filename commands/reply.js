class reply {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		if (!client.lastDM) return m.channel.send("No last DM to reply to!");
		return client.lastDM.send(args.join(" ")).then(() => {
			return m.channel.send("Successfully sent \"" + args.join(" ") + "\" to " + client.lastDM.tag + "!");
		}, err => {
			return m.channel.send("Error:" + err);
		});
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Replies to the last received DM",
			longDesc: "Replies to the last received DM.",
			syntax: "reply <text>"
		};
	}
}

module.exports = reply;