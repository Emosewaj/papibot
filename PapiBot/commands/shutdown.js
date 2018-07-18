class shutdown {
	static run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		return m.channel.send("Shutting down...").then(() => {
			client.destroy().then(() => {
				console.log("\nPapi-Bot was shut down.");
				return process.exit(0);
			}, err => {
				return m.channel.send("Couldn't shut down: " + err);
			});
		});
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Shuts Papi-Bot down and restarts the bot.",
			longDesc: "Shuts Papi-Bot down and restarts the bot.",
			syntax: "shutdown"
		};
	}
}

module.exports = shutdown;