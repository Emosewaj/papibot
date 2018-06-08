class getguilds {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		let argstring;
		let argtext;
		switch (args[0]) {
			case "id":
				args.shift();
				return m.channel.send("```\n" + client.guilds.find("name", args.join(" ")).id + "```");
			case "owner":
				args.shift();
				return m.channel.send("```\n" + client.guilds.find("name", args.join(" ")).owner.user.tag + "```");
			default:
				let lists = [];
				let i = 0;
				client.guilds.forEach(guild => {
					if (!lists[i]) lists[i] = "";
					if (!((lists[i] + "\n" + guild.memberCount + " - " + guild.name).length > 2000 - 7)) {
						lists[i] += "\n" + guild.memberCount + " - " + guild.name;
					} else {
						i++;
						if (!lists[i]) lists[i] = "";
						lists[i] += "\n" + guild.memberCount + " - " + guild.name;
					}
				});
				for (let j in lists) {
					m.channel.send("```" + lists[j] + "```");
				}
		}
	}
}

module.exports = getguilds;