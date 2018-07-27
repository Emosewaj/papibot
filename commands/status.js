class status {
	static run(client, args) {
		const m = args.shift();
		let mention = m.mentions.members.first();
		if (mention) {
			let status = mention.presence.status
				.replace("idle", "AFK")
				.replace("dnd", "busy");
			if (mention.presence.game) {
				return m.reply(mention.displayName + " is currently " + status + " and is playing " + mention.presence.game.name + "!");
			} else {
				return m.reply(mention.displayName + " is currently " + status + "!");
			}
		} else {
			let status = m.member.presence.status
				.replace("idle", "AFK")
				.replace("dnd", "busy");
			if (m.member.presence.game) {
				return m.reply("you're currently " + status + " and are playing " + m.member.presence.game.name + "!");
			} else {
				return m.reply("you're currently " + status + "!");
			}
		}
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Displays a user's status.",
			longDesc: "Displays a user's status as well as game, if they're playing anything.",
			syntax: "status [mention]"
		};
	}
}

module.exports = status;