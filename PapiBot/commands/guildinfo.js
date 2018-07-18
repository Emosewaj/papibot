const { RichEmbed } = require("discord.js");

class guildinfo {
	static run(client, args) {
		const m = args.shift();
		let prefix = client.customPrefixGuilds.get(m.guild.id);
		if (!prefix) prefix = "//";
		let embed = new RichEmbed()
			.setTitle("Guild Information")
			.setAuthor(m.guild.name, m.guild.iconURL)
			.setFooter("Info requested by " + m.author.tag, m.author.displayAvatarURL)
			.setTimestamp()
			.addField("Owner:", m.guild.owner.displayName + "\n" + m.guild.owner.user.tag, true)
			.addField("Member count:", m.guild.memberCount, true)
			.addField("Guild region:", m.guild.region, true)
			.addField("Channel count:", m.guild.channels.size, true)
			.addField("Emoji count:", m.guild.emojis.size, true)
			.addField("My prefix:", prefix, true)
			.addField("Created at:", m.guild.createdAt)
			.addField("Guild icon:", m.guild.iconURL)
			.setColor(m.guild.me.displayHexColor)
			.setThumbnail(m.guild.iconURL);
		return m.channel.send({ embed });
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Displays info about the server",
			longDesc: "Displays extensive information about the server.",
			syntax: "guildinfo"
		};
	}
}

module.exports = guildinfo;