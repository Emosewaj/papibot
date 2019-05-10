class templateCommand {
	static run(client, args) {
        const m = args.shift();
        let lastCommand = m.author.lastCommand;
        if (!lastCommand)
            return m.channel.send("You don't have a last command that can be repeated!");
        let cmd = m.author.lastCommand.cmd;
        let args1 = m.author.lastCommand.args;
        m.reply(`repeating command: ${cmd} ${args1.join(" ")}`);
        args1.unshift(m);
        client.commands.get(cmd.toLowerCase()).run(client, args1);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Repeats the previously entered command",
			longDesc: "Repeats the command last entered by the user sending the command. Said command is not overwritten by other user's commands.",
			syntax: "repeat"
		};
	}
}

module.exports = templateCommand;