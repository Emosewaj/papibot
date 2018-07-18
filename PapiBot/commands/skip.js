class skip {
	static run(client, args) {
		const m = args.shift();
		if (!m.guild.voiceConnection || !m.guild.voiceConnection.dispatcher) return m.channel.send("Can't skip cuz I'm not playing!");
		m.channel.send("Skipping...");
		return m.guild.voiceConnection.dispatcher.end("Stream is not generating quickly enough.");
	}
}

module.exports = skip;