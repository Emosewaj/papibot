class setname {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		return m.guild.me.setNickname(args.join(" ")).then(() => {
			return m.channel.send("Successfully set my name!");
		}, err => {
			return m.channel.send(`Error, couldn't set my name: ${err}`);
		});
	}
}

module.exports = setname;