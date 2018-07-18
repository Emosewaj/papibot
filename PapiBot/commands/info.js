const Discord = require("discord.js");

class info {
	static run(client, args) {
		const m = args.shift();
		let embed = new Discord.RichEmbed()
			.setAuthor("Papi-Bot", client.user.displayAvatarURL)
			.setDescription("Click [here](" + client.inviteURL + ") to invite me to your server!")
			.addField("Users cached", client.users.size, true)
			.addField("Servers available", client.guilds.size, true)
			.addField("Emoji available", client.emojis.size, true)
			.addField("Last Ping", client.pings[0] + " ms", true)
			.addField("D.JS version", Discord.version, true)
			.addField("Commands used (since last restart)", client.commandsUsed, true)
			.addField("Commands used (all time)", client.commandsUsedAllTime, true)
			.setColor(m.guild.me.displayHexColor.replace("000000", "FFFFFF"));
		let usage = process.memoryUsage().heapUsed,
			size = ["B", "KB", "MB", "GB"],
			usageData = 0;
		while (usage / 1024 >= 1) {
			usage = usage / 1024;
			usageData++;
		}
		embed.addField("Memory Usage", parseInt(usage) + size[usageData], true);
		let uptime = this.parseUptime(process.uptime());
		embed.addField("Uptime", uptime, true)
			.setTimestamp();
		return m.channel.send({ embed });
	}

	static parseUptime(uptime) {
		let days = 0,
			hours = 0,
			minutes = 0,
			seconds = Math.round(uptime);

		while (seconds - 60 > 0) {
			seconds -= 60;
			minutes++;
		}
		while (minutes - 60 > 0) {
			minutes -= 60;
			hours++;
		}
		while (hours - 24 > 0) {
			hours -= 24;
			days++;
		}

		if (days === 0) {
			if (hours === 0) {
				if (minutes === 0) {
					return `${seconds} Seconds`;
				} else {
					return `${minutes} Minutes, ${seconds} Seconds`;
				}
			} else {
				return `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
			}
		} else {
			return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
		}
	}

	static help() {
		return {
			category: "technical",
			shortDesc: "Displays info about Papi-Bot",
			longDesc: "Displays technical information about Papi-Bot.",
			syntax: "info"
		};
	}
}

module.exports = info;