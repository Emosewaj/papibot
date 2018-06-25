class afk {
	static run(client, args) {
		console.log("test");
		let m = args.shift();
		let reason = null;
		if (args[0]) reason = args.join(" ");
		return client.db.set("afk", m.author.id, reason).then(() => {
			return m.channel.send("I've set your AFK message, see you soon!");
		}, err => {
			return m.channel.send("Error setting your AFK message: " + err);
		});
	}
}

module.exports = afk;