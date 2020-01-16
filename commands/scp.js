const { RichEmbed } = require("discord.js");

class scp {
	static run(client, args) {
        const m = args.shift();

        let number = parseInt(args[0]);
        if(isNaN(number)) {
            return m.channel.send("That's not an SCP Number!");
        }

        while(number.toString().length < 3) {
            number = "0" + number;
        }

        let embed = new RichEmbed();
        embed.setDescription(`**[SCP-${number}](http://www.scp-wiki.net/scp-${number})**`);
        return m.channel.send({embed});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Links to an SCP on the SCP-Wiki, thanks Marv!",
			longDesc: "Links to an SCP on the SCP-Wiki, thanks Marv!",
			syntax: "scp <number>"
		};
	}
}

module.exports = scp;