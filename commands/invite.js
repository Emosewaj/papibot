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
				description: "[Click here to invite me to your server!]("+client.inviteURL+")\n[Click here to join the support server!](https://discord.gg/cXVD7Vm)"
			}
		});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Posts two bot relevant invites",
			longDesc: "Posts invites to invite the bot and to join the official support server.",
			syntax: "invite"
		};
	}
}

module.exports = invite;