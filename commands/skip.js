class skip {
	static run(client, args) {
		const m = args.shift();
		if (!m.guild.voiceConnection || !m.guild.voiceConnection.dispatcher) return m.channel.send("Can't skip cuz I'm not playing!");
		m.channel.send("Skipping...");
		return m.guild.voiceConnection.dispatcher.end("Stream is not generating quickly enough.");
	}

	static help() {
		return {
			category: "music",
			shortDesc: "Skips the current song",
			longDesc: "Skips the current song. Requires a song to be playing to be skipped. If there's further songs in the queue, the next song from the beginning of the Queue will be played.",
			syntax: "skip"
		};
	}
}

module.exports = skip;