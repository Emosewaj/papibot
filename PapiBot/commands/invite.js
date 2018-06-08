const { RichEmbed } = require("discord.js");

class invite {
	static run(client, args) {
		const m = args.shift();
		m.channel.send({
			embed: {
				author: {
					name: "Select a link!",
					iconURL: client.user.displayAvatarURL
				},
				description: "[Invite me to your server!]("+client.inviteURL+")\n[Join the support server!](https://discord.gg/cXVD7Vm)"
			}
		});
	}
}

module.exports = invite;