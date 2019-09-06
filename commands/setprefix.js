class setprefix {
	static async run(client, args) {
        const m = args.shift();
        if (!client.checkPermission(m.member, ["MANAGE_GUILD"])) return m.channel.send("You do not have permission to change my prefix!");
        if (!args[0]) return m.channel.send("You didn't specify a new prefix!");
        let err;
        if (args[0] == "//") err = await client.db.del("prefixes", m.guild.id);
        else err = await client.db.set("prefixes", m.guild.id, args[0]);
        
        if (err) return m.channel.send("There was an error setting the prefix, please try again or contact owner.");
        if (args[0] == "//") client.customPrefixGuilds.delete(m.guild.id);
        else client.customPrefixGuilds.set(m.guild.id, args[0]);
        return m.channel.send(`Successfully set my server prefix to ${args[0]}!`);
	}

	static help() {
		return {
			category: "administrative",
			shortDesc: "Changes the prefix.",
			longDesc: "Changes and sets the prefix for Papi-Bot on this server.",
			syntax: "setprefix <new prefix>"
		};
	}
}

module.exports = setprefix;