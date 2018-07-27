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

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Sets Papi-Bot's nickname in the server.",
			longDesc: "Sets Papi-Bot's nickname in the server.",
			syntax: "setname <new name>"
		};
	}
}

module.exports = setname;