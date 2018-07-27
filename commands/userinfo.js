const { RichEmbed } = require("discord.js");

class userinfo {
	static run(client, args) {
		const m = args.shift();
		let member = m.member;
		if (m.mentions.members.first()) {
			member = m.mentions.members.first();
		}
		let sharedServers = 0;
		client.guilds.forEach(g => {
			if (g.members.has(member.id)) {
				sharedServers++;
			}
		});
		let embed = new RichEmbed()
			.setTitle("UserInformation")
			.setAuthor(member.displayName, member.user.displayAvatarURL)
			.setFooter("Info requested by " + m.author.tag, m.author.displayAvatarURL)
			.setTimestamp()
			.addField("Username:", member.user.username, true)
			.addField("Discriminator:", member.user.discriminator, true)
			.addField("Discord ID:", "`" + member.id + "`", true)
			.addField("Account created at:", member.user.createdAt, true)
			.addField("Is a bot:", member.user.bot.toString().replace("true", "Yes").replace("false", "No"), true);
		let status = member.user.presence.status
			.replace("online", "Online")
			.replace("offline", "Offline")
			.replace("idle", "AFK")
			.replace("dnd", "Do Not Disturb");
		if (member.user.presence.game !== null) {
			embed.addField("Presence:", "Status: " + status + " | Playing: " + member.user.presence.game.name, true);
		} else {
			embed.addField("Presence:", "Status: " + status, true);
		}
		embed
			.addField("Servers shared with " + client.user.username + ":", sharedServers, true)
			.addField("\u200B", "**Guild Member Information**")
			.addField("Joined at:", member.joinedAt, true)
			.addField("Nickname:", new String(member.nickname).replace("null", "None"), true)
			.addField("Highest Role:", member.highestRole.name, true)
			.addField("Name Colour (hex):", "`" + member.displayHexColor + "`", true)
			.addField("\u200B", "**Avatar**")
			.addField("Avatar URL:", member.user.displayAvatarURL)
			.setColor(member.displayHexColor)
			.setThumbnail(member.user.displayAvatarURL);
		return m.channel.send({ embed });

	}

	static help() {
		return {
			category: "general",
			shortDesc: "Display detailed info on a user",
			longDesc: "Display detailed information on a user or yourself! This command displays information such as their username and tag, when their account was created, when they joined the server and many things more.",
			syntax: "userinfo [mention]"
		};
	}
}

module.exports = userinfo;