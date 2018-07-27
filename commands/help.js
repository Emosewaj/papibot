const { Collection, RichEmbed } = require("discord.js");
const helpDB = new Collection();

class help {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) {
			let embed = new RichEmbed().setAuthor("Papi-Bot", client.user.displayAvatarURL)
				.setTitle("Command Categories")
				.setDescription("Use `help <category name>` to see what commands the category contains!")
				.setFooter("Info requested by " + m.member.displayName)
				.setTimestamp();
			helpDB.forEach(category => {
				embed.addField(category[0].cat, "Commands: " + category.length, true);
			});
			embed.fields.forEach(field => {
				if (field.name === "nsfw") field.name = "NSFW";
				else field.name = firstToUpper(field.name);
			});
			return m.channel.send("Thanks for using Emosewaj's Papi-Bot!\n\nTo receive more help, use `help <category name>` and `help <command name>`!", { embed });
		}

		if (helpDB.has(args[0].toLowerCase())) {
			let commands = [];
			helpDB.get(args[0].toLowerCase()).forEach(cmd => {
				commands.push(cmd);
			});
			//commands.sort();

			let length = 0;
			for (let i in commands) {
				if (commands[i].name.length > length) length = commands[i].name.length;
			}
			length += 3;

			let sends = [];
			let i = 0;
			for (let j = 0; j < commands.length; j++) {
				if (!sends[i]) sends[i] = "";
				if (!((sends[i] + "\n" + commands[j].name + " " + ".".repeat(length - commands[j].name.length) + " " + commands[j].desc).length > 1024 - 7)) {
					sends[i] += "\n" + commands[j].name + " " + ".".repeat(length - commands[j].name.length) + " " + commands[j].desc;
				} else {
					i++;
					if (!sends[i]) sends[i] = "";
					sends[i] += "\n" + commands[j].name + " " + ".".repeat(length - commands[j].name.length) + " " + commands[j].desc;
				}
			}

			let embed = new RichEmbed().setAuthor("Papi-Bot", client.user.displayAvatarURL)
				.setTitle("Category: " + firstToUpper(commands[0].cat))
				.setDescription("Use `help <command name>` to see more information about a command, such as its syntax!")
				.setFooter("Info requested by " + m.member.displayName)
				.setTimestamp();
			for (let i = 0; i < sends.length; i++) {
				embed.addField("Commands " + (i + 1), "```" + sends[i] + "```");
			}
			return m.channel.send("These are the commands for this category:", { embed });
		}

		if (client.commands.has(args[0].toLowerCase())) {
			let embed = new RichEmbed().setAuthor("Papi-Bot", client.user.displayAvatarURL)
				.setTitle("Command: " + args[0].toLowerCase())
				.setFooter("Info requested by " + m.member.displayName)
				.setTimestamp();
			let helpData = client.commands.get(args[0].toLowerCase()).help();
			embed.setDescription(helpData.longDesc)
				.addField("Syntax:", "`" + helpData.syntax + "`")
				.addField("\u200B", "Note: `<required parameter> [optional parameter]`");
			return m.channel.send({ embed });
		}
	}

	/**
	 * Initialise the help database
	 * @param {Collection<string, Object>} commands - The command storage
	 * @returns {Promise<void>} - An empty promise
	 */
	static initialise_help(commands) {
		// Call only once all commands are loaded!
		return new Promise((resolve, reject) => {
			commands.forEach(cmd => {
				let data = cmd.help();
				if (!helpDB.has(data.category)) {
					helpDB.set(data.category, []);
				}
				helpDB.get(data.category).push({ name: data.syntax.split(" ")[0], desc: data.shortDesc, cat: data.category });
			});
			resolve();
		});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "This overview!",
			longDesc: "Use the help command to find out more about commands. Use it with a category name to find all commands within that category. Use it with a command name to find out more on how to use that command.",
			syntax: "help or help <category> or help <command>"
		};
	}
}

firstToUpper = function (string) {
	return string.slice(0, 1).toUpperCase() + string.slice(1);
};

module.exports = help;