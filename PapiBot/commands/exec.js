const util = require("util");

class exec {
	static async run(client, args) {
		const m = args.shift();
		if (!client.checkOverride(m.author.id)) return m.channel.send("This command is owner-only!");
		try {
			let result = eval(args.join(" "));
			if (result instanceof Promise) {
				result = await result;
			}
			return m.channel.send("```js\ntypeof " + typeof result + "``````js\n" + util.inspect(result, { depth: 0 }).slice(0, 1950) + "```");
		} catch (err) {
			return m.channel.send(`Error: ${err.message}`);
		}
	}

	static help() {
		return {
			category: "owner-only",
			shortDesc: "Run JavaScript code and output the result",
			longDesc: "Run JavaScript code and output the result.",
			syntax: "exec <JS code>"
		};
	}
}

module.exports = exec;