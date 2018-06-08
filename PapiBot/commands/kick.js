class kick {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkPermission(m.member, ["KICK_MEMBERS"])) return m.channel.send("You don't have the required permission to do that!");
		if (!client.checkPermission(m.guild.me, ["KICK_MEMBERS"])) return m.channel.send("I don't have the required permission to do that! Please enable the \"Kick Members\" permission for me or the Papi-Bot role!");
		if (!m.mentions.members.first()) return m.channel.send("You need to tag someone!");
		args.shift();
		return m.mentions.members.first().kick(args.join(" ")).then(() => {
			return m.channel.send(`Kicked ${m.mentions.users.first().tag}!`);
		}, err => {
			return m.channel.send(`Something went wrong: ${err}`);
		});
	}
}

module.exports = kick;