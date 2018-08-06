// e621 supports 5 tags maxmimum

const Kaori = require("kaori");
const kaori = new Kaori(require("../data/other/moreKaoriSites.json"));
const util = require("../data/other/kaoriUtil.js");
const { RichEmbed } = require("discord.js");

class e621 {
	static run(client, args) {
		let m = args.shift();
		if (!client.checkNsfw(m.channel)) return m.channel.send("I can't do that here! Try again in an nsfw channel!");
		if (!args) return m.channel.send("You need to specify at least one tag! Tags are seperated by spaces!");
		if (args.length > 1) return m.channel.send("Sorry, e621 does not allow searching for more than five tags at a time!");
		return m.channel.send("Taking a look...").then(async msg => {
			return kaori.search("e621", { tags: args, random: true, limit: 1}).then(images => {
				return msg.edit("Found a picture!", {
					embed: new RichEmbed()
						.setFooter("Not seeing an image? Click the link in the title!")
						.setImage(images[0].common.fileURL)
						.setTitle("Click here to open full image!")
						.setURL(images[0].common.fileURL)
						.setDescription(
							"Rating: " + util.parse("r", images[0].common.rating) + 
							"\nScore: " + util.parse("sc",images[0].common.score) +
							"\nSource: " + util.parse("s", images[0].common.source)
						)
				});
			}, err => {
				return msg.edit("Sorry, couldn't find any image with those tags!");
			});
		});
	}

	static help() {
		return {
			category: "nsfw",
			shortDesc: "Searches e621.net",
			longDesc: "Searches e621.net for one or multiple tags and posts an image if one was found. Requires a channel to be marked as NSFW or have \"nsfw\" in its name.",
			syntax: "e621 <tag> [tag] [tag]..."
		};
	}
}

module.exports = e621;