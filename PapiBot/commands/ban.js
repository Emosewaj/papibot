class ban {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkPermission(m.member, ["BAN_MEMBERS"])) return m.channel.send("You don't have the required permission to do that!");
		if (!client.checkPermission(m.guild.me, ["BAN_MEMBERS"])) return m.channel.send("I don't have the required permission to do that! Please enable the \"Ban Members\" permission for me or the Papi-Bot role!");

		if (m.mentions.users.first()) {
			args.shift();
			return m.guild.ban(m.mentions.users.first(), args.join(" ")).then(() => {
				return m.channel.send(`Banned ${m.mentions.users.first().tag}!`);
			}, err => {
				return m.channel.send(`Something went wrong: ${err}`);
			});
		}
		if (!isNaN(parseInt(args[0]))) {
			let id = args.shift();
			return m.guild.ban(id, args.join(" ")).then(() => {
				return m.channel.send(`Banned <@${id}>!`);
			}, err => {
				return m.channel.send(`Something went wrong: ${err}`);
			});
		}
	}
}

module.exports = ban;