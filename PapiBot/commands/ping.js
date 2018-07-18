class ping {
	static run(client, args) {
		const m = args.shift();
		m.channel.send("Pong!\n📶 Websocket ping: " + client.pings[0]).then(msg => {
			msg.edit(msg.content + "\n📨 Message ping: " + (msg.createdTimestamp - m.createdTimestamp));
		});
	}

	static help() {
		return {
			category: "technical",
			shortDesc: "Pong! Measures delay",
			longDesc: "Pong! Measures the latency between when a command is sent and when Papi answers and the latency to the Discord Websocket.",
			syntax: "ping"
		};
	}
}

module.exports = ping;