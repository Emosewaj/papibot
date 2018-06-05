let name = "ping";

class ping {
	static run(client, args) {
		const m = args.shift();
		m.channel.send("Pong!\n📶 Websocket ping: " + client.pings[0]).then(msg => {
			msg.edit(msg.content + "\n📨 Message ping: " + (msg.createdTimestamp - m.createdTimestamp));
		});
	}

	static getName() {
		return name;
	}
}

module.exports = ping;