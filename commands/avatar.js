class avatar {
	static run(client, args) {
		const m = args.shift();
		if (m.mentions.users.first()) {
			let mention = m.mentions.members.first();
			return m.channel.send("This is " + mention.displayName + "'s avatar!", {
				embed: {
					author: {
						name: "Click here for the full size!",
						url: mention.user.displayAvatarURL
					},
					image: {
						url: mention.user.displayAvatarURL
					}
				}
			});
		} else {
			return m.reply("this is your avatar!", {
				embed: {
					author: {
						name: "Click here for the full size!",
						url: m.author.displayAvatarURL
					},
					image: {
						url: m.author.displayAvatarURL
					}
				}
			});
		}
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Displays a user's avatar",
			longDesc: "Displays a user's or your own avatar. You can click a link to get to the full size.",
			syntax: "avatar [mention]"
		};
	}
}

module.exports = avatar;