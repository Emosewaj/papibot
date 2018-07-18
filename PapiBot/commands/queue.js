class templateCommand {
	static run(client, args) {
		const m = args.shift();
		if (!m.guild.queue || !m.guild.queueOut) return m.channel.send("No queue to display here!");
		let queue = [];
		for (let i = 0; i < m.guild.queueOut.length; i++) {
			if (m.guild.queueOut[i].length) {
				queue.push("**" + (i + 1) + ".** `" + m.guild.queueOut[i].name + "` requested by `" + m.guild.queueOut[i].requester + "` Length: " + m.guild.queueOut[i].length);
			} else {
				queue.push("**" + (i + 1) + ".** `" + m.guild.queueOut[i].name + "` requested by `" + m.guild.queueOut[i].requester + "`");
			}			
		}
		return m.channel.send("Here is the current queue:\n" + queue.join("\n"));
	}
}

module.exports = templateCommand;