class templateCommand {
	static run(client, args) {
		const m = args.shift();
	}

	static help() {
		return {
			category: "",
			shortDesc: "",
			longDesc: "",
			syntax: ""
		};
	}
}

module.exports = templateCommand;