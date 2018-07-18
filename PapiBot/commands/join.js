class join {
	static run(client, args) {
		const m = args.shift();
		if (!m.member.voiceChannel) return m.channel.send("I can't join you because you aren't in a voice channel!");

		return m.member.voiceChannel.join().then(() => {
			if (!m.guild.queue) m.guild.queue = [];
			if (!m.guild.queueOut) m.guild.queueOut = [];
			return m.channel.send("Joined " + m.member.voiceChannel.name + "!");
		}, err => {
			return m.channel.send("I couldn't join " + m.member.voiceChannel.name + "!\nError: " + err);
		});
	}

	static help() {
		return {
			category: "music",
			shortDesc: "Joins a voice channel",
			longDesc: "Joins the voice channel you're currently in or switches to it. Switching will preserve an existing queue.",
			syntax: "join"
		};
	}
}

module.exports = join;