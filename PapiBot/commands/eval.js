class Eval {
	static async run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		try {
			let result = eval(args.join(" "));
			if (result instanceof Promise) {
				result = await result;
			}
		} catch (err) {
			return m.channel.send(`Error: ${err.message}`);
		}
		return;
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Runs JavaScript code",
			longDesc: "Runs JavaScript code.",
			syntax: "eval <JS code>"
		};
	}
}

module.exports = Eval;