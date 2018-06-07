class id {
	static run(client, args) {
		const m = args.shift();
		if (m.mentions.users.first()) {
			let mention = m.mentions.members.first();
			return m.channel.send(mention.displayName + "'s Discord ID is `" + mention.id + "`!");
		} else {
			return m.channel.send("Your Discord ID is `" + m.author.id + "`!");
		}
	}
}

module.exports = id;