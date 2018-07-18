const yt = require("ytdl-core");
const voiceUtil = require("../data/other/voiceUtil.js");
const infoCommand = require("./info.js");

const fileRegExp = new RegExp(/(https:\/\/|http:\/\/).+(\.mp3$|\.wav$)/);

class add {
	static run(client, args) {
		const m = args.shift();
		if (!m.guild.voiceConnection) return m.channel.send("Add me to a voice channel first!");

		if (fileRegExp.test(args.join(" ")) || yt.validateURL(args.join(" "))) {
			m.guild.queue.push({
				url: args.join(" "),
				requester: m.member,
				channel: m.channel
			});
			if (fileRegExp.test(args.join(" "))) {
				let name = args.join(" ").split("/");
				name = name[name.length - 1];
				m.guild.queueOut.push({
					name,
					requester: m.member.displayName
				});

				if (!m.guild.voiceConnection.dispatcher) {
					m.guild.queueOut.shift();
					let next = m.guild.queue.shift();
					return voiceUtil.playURL(next.url, next.requester, next.channel);
				}

				return m.channel.send("Added `" + name + "` to the queue at position " + m.guild.queue.length + "!");
			} else if (yt.validateURL(args.join(" "))) {
				yt.getInfo(args.join(" "), (err, info) => {
					m.guild.queueOut.push({
						name: info.title,
						length: infoCommand.parseUptime(info.length_seconds),
						requester: m.member.displayName
					});

					if (!m.guild.voiceConnection.dispatcher) {
						m.guild.queueOut.shift();
						let next = m.guild.queue.shift();
						return voiceUtil.playURL(next.url, next.requester, next.channel);
					}

					return m.channel.send("Added `" + info.title + "` by `" + info.author.name + "` to the queue at position " + m.guild.queue.length + "!");
				});
			}
		}
	}

	static help() {
		return {
			category: "music",
			shortDesc: "Adds audio to the queue",
			longDesc: "Adds an audio file or a YouTube video to the server's queue.",
			syntax: "add <url to audio file or YouTube link>"
		};
	}
}

module.exports = add;