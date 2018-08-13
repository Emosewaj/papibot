class afk {
	static run(client, args) {
		let m = args.shift();
		let reason = null;
		if (args[0]) reason = args.join(" ");
		return client.db.set("afk", m.author.id, reason).then(() => {
			return m.channel.send("I've set your AFK message, see you soon!");
		}, err => {
			return m.channel.send("Error setting your AFK message: " + err);
		});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Sets your AFK message",
			longDesc: "Sets your AFK messages. If someone mentions you while you have an AFK message set, the bot will inform them of your absence. (NYI)",
			syntax: "afk [message]"
		};
	}
}

module.exports = afk;