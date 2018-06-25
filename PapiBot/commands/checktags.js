const Kaori = require("kaori");
const kaori = new Kaori(require("../data/other/moreKaoriSites.json"));
const { RichEmbed } = require("discord.js");

class checktags {
	static async run(client, args) {
		let m = args.shift();
		let sites = ["Danbooru", "E621", "Gelbooru", "Rule34"];
		let valid = 0, invalid = 0;
		if (!args) return m.channel.send("You need to specify at least one tag! Tags are seperated by spaces!");
		if (args.length > 25) return m.channel.send("Sorry, I can't check that many tags at once!");
		let embed = new RichEmbed()
			.setTitle("Search results")
			.setFooter('"Valid" means that at least one image exists under this tag. "Invalid" means there are none. Combinations of tags may still not bring results, despite all tags being valid.');
		async function checkTag(tag, msg) {
			return new Promise(async (resolve, reject) => {
				let results = [];
				results[0] = await kaori.search("danbooru", { tags: [tag], limit: 1, random: false }).catch(e => {results[0] = null;});
				results[1] = await kaori.search("e621", { tags: [tag], limit: 1, random: false }).catch(e => {results[1] = null;});
				results[2] = await kaori.search("gelbooru", { tags: [tag], limit: 1, random: false }).catch(e => {results[2] = null;});
				results[3] = await kaori.search("rule34", { tags: [tag], limit: 1, random: false }).catch(e => {results[3] = null;});
				for (let i in results) {
					if (!results[i] || results[i].length === 0) {
						results[i] = "\\❌ " + sites[i] + ": Invalid";
						invalid++;
					} else {
						results[i] = "\\✅ " + sites[i] + ": Valid";
						valid++;
					}
				}
				await embed.addField('Tag: "' + tag + '"', results.join("\n"), true);
				if (embed.fields.length === args.length) {
					if (valid >= invalid) {
						embed.setColor("GREEN")
							.setDescription("Seems like these tags are mostly valid!");
					} else {
						embed.setColor("RED")
							.setDescription("Seems like these tags are mostly invalid!");
					}
					msg.channel.send("Done!", { embed });
				}
				resolve();
			});
		}

		return m.channel.send("Checking, give me a moment! 0/" + args.length).then(async msg => {
			for (let i in args) {
				await checkTag(args[i], msg);
				msg.edit("Checking, give me a moment! " + (parseInt(i) + 1) + "/" + args.length);
			}
		});
	}
}

module.exports = checktags;