class source {
	static run(client, args) {
		const m = args.shift();
		let version = `v${client.version.major}.${client.version.minor}.${client.version.patch}`;
		m.channel.send({
			embed: {
				author: {
					name: "Click here for my source repository!",
					iconURL: client.user.displayAvatarURL,
					url: "https://github.com/Jawesome99/papibot"
				},
				fields: [
					{
						name: "Current version:",
						value: `p-API ${version}`
					}
				]
			}
		});
	}

	static help() {
		return {
			category: "technical",
			shortDesc: "Displays a link to the Papi-Bot GitHub",
			longDesc: "Displays a link to the Papi-Bot GitHub repository.",
			syntax: "source"
		};
	}
}

module.exports = source;