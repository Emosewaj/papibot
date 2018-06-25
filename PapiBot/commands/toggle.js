const fs = require("fs");

class toggle {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkPermission(m.member, ["MANAGE_GUILD"])
			&& !client.checkOverride(m.member.id)) {
			return m.channel.send("You do not have permission to do that!");
		}
		if (!args[0]) return m.channel.send("What would you like to toggle?\n```\n\"bc\" - Public Broadcasts, mostly used for update news, default on.\n\"im\" - Dad Jokes, reacting to I'm and Im (and their lowercase versions), default off.\n\"wt\" - Word Triggers, reactions or messages triggered by certain keywords or phrases, default off.```");
		let servers;
		switch (args[0].toLowerCase()) {
			case "bc":
				servers = client.disabledBroadcastGuilds;
				if (servers.includes(args[1])) {
					servers.splice(servers.indexOf(args[1], 1));
					fs.writeFileSync("./data/blocked/broadcasts.txt", servers, "utf8");
					client.disabledBroadcastGuilds = servers;
					return m.channel.send("Your server will now receive broadcasts!");
				} else {
					servers.push(args[1]);
					fs.writeFileSync("./data/blocked/broadcasts.txt", servers, "utf8");
					client.disabledBroadcastGuilds = servers;
					return m.channel.send("Your server will no longer receive broadcasts!");
				}
			case "im":
				servers = client.enabledDadjokeGuilds;
				if (servers.includes(args[1])) {
					servers.splice(servers.indexOf(args[1], 1));
					fs.writeFileSync("./data/blocked/dadjokes.txt", servers, "utf8");
					client.enabledDadjokeGuilds = servers;
					return m.channel.send("Your server now has Dad Jokes disabled!");
				} else {
					servers.push(args[1]);
					fs.writeFileSync("./data/blocked/dadjokes.txt", servers, "utf8");
					client.enabledDadjokeGuilds = servers;
					return m.channel.send("Your server now has Dad Jokes enabled!");
				}
			case "wt":
				servers = client.enabledWordtriggerGuilds;
				if (servers.includes(args[1])) {
					servers.splice(servers.indexOf(args[1], 1));
					fs.writeFileSync("./data/blocked/wordtriggers.txt", servers, "utf8");
					client.enabledWordtriggerGuilds = servers;
					return m.channel.send("Your server now has word triggers disabled!");
				} else {
					servers.push(args[1]);
					fs.writeFileSync("./data/blocked/wordtriggers.txt", servers, "utf8");
					client.enabledWordtriggerGuilds = servers;
					return m.channel.send("Your server now has word triggers enabled!");
				}
			default:
				return m.channel.send("That's not a valid parameter!");
		}
	}
}

module.exports = toggle;