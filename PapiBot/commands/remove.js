class remove {
	static run(client, args) {
		const m = args.shift();
		if (!m.guild.queue || !m.guild.queueOut) return m.channel.send("There's no queue to remove from, silly!");
		if (!args[0]) return m.channel.send("Remove which queue item?");
		if (isNaN(parseInt(args[0]))) return m.channel.send("That doesn't look like a number!");
		if (parseInt(args[0]) > m.guild.queue.length) return m.channel.send("This server's queue isn't that big!");
		m.guild.queue.splice(parseInt(args[0]) - 1, 1);
		let deleted = m.guild.queueOut.splice(parseInt(args[0]) - 1, 1);
		return m.channel.send("Removed `" + deleted.title + "` added by `" + deleted.requester + "` from the queue!");
	}
}

module.exports = remove;