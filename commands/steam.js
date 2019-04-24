const { RichEmbed } = require("discord.js");
const SteamApi = require('web-api-steam');
const xml2js = require('xml2js')
const wr = require("web-request");
const TurndownService = require("turndown");
const turndownService = new TurndownService();

// Warning: Awful callback hell ahead, I tried to work around it to the best of my abilities, but no promises *ba dum tss*

class steam {
	static async run(client, args) {
        const m = args.shift();
        let ID = args[0];
        let KEY = client.cfg.steamKey;

        // Assuming the provided ID is a custom URL, grab https://steamcommunity.com/id/<ID>/?xml=1 and parse into JSON
        let profileData = await this.grabSteamXML(ID).catch(err => m.channel.send(err));
        if (!profileData.steamID64) return;
        let status = [
            "<:offline:570714667429920779> Offline",
            "<:online:570714627483369482> Online",
            "<:busy:570714650493059092> Busy",
            "<:away:570714638552137759> Away",
            "<:away:570714627483369482> Snooze",
            "<:online:570714627483369482> Looking to trade",
            "<:online:570714627483369482> Looking to play"
        ];

        ID = profileData.steamID64[0];
        let embed = new RichEmbed();

        let description = turndownService.turndown(profileData.summary[0]);
        while(description.includes("https://steamcommunity.com/linkfilter/?url=")) {
            description = description.replace("https://steamcommunity.com/linkfilter/?url=", "");
        }
        description = description.replace(/\\\[[a-z.0-9]+\\\]/gi, "");
        description = description.split("\n");
        if(description.length > 7) 
        {
            description = description.slice(0, 7);
            description[7] = "[...]";
        }
        description = description.join("\n");
        embed.setDescription(description);

        // General profile info
        SteamApi.getPlayerInfo(ID, KEY, (err, data) => {
            if (err) return m.channel.send(err);

            embed.setAuthor(data.personaname, data.avatarfull, data.profileurl)
                .setThumbnail(data.avatarfull)
                .addField("Status", status[data.personastate], true);

            if(data.gameextrainfo) embed.addField("Currently in-game", data.gameextrainfo, true);

            embed.addField("Member since", profileData.memberSince[0], true);

            // Owned games
            SteamApi.getOwnedGames(ID, KEY, (err, data) => {
                if (err) return m.channel.send(err);

                embed.addField("Games", data.game_count, true)
                    .addField("Groups", profileData.groups[0].group.length, true);

                SteamApi.getFriendList(ID, KEY, (err, data) => {
                    if (err) return m.channel.send(err);

                    embed.addField("Friends", data.length, true);

                    SteamApi.getPlayerBans(ID, KEY, (err, data) => {
                        if (err) return m.channel.send(err);

                        console.log(data);

                        embed.addField("\u200B", "**Ban Information**");
                        embed.addField("Vac Banned", data.VACBanned ? `Yes: ${data.NumberOfVACBans}` : "No", true);
                        embed.addField("Game Banned", data.NumberOfGameBans != 0 ? `Yes: ${data.NumberOfGameBans}` : "No", true);
                        embed.addField("Community Banned", data.CommunityBanned ? "Yes" : "No", true);
                        embed.addField("Economy Banned", data.EconomyBan != "none" ? data.EconomyBan : "None", true);
                        embed.addField("Days Since Last Ban", data.DaysSinceLastBan, true);

                        SteamApi.getRecentGames(ID, KEY, (err, data) => {
                            if (err) m.channel.send(err);

                            let str = "";
                            for(let i = 0; i < data.games.length; i++)
                            {
                                str += data.games[i].name + ": " + this.TimeConvert(data.games[i].playtime_2weeks) + "\n";
                            }
                            embed.addField("Recent Games", str);
                            
                            embed.setFooter("Info requested by " + m.member.displayName);
                            embed.setTimestamp();
                            return m.channel.send(embed);
                        });
                    });
                });
            });
        });
    }
    
    // Gets the XML of a steam profile no matter whether it's a steam64 ID or a custom url
    // Async callbacks hhhhhhhhhhh
    static grabSteamXML(ID) {
        return new Promise(async (resolve, reject) => {
            let profileData = await wr.get(`https://steamcommunity.com/id/${ID}/?xml=1`);
            xml2js.parseString(profileData.body, async (err, data) => {
                if (err) reject(err);
                if (data.response && data.response.error) {
                    profileData = await wr.get(`https://steamcommunity.com/profiles/${ID}/?xml=1`);
                    xml2js.parseString(profileData.body, (err, data) => {
                        if (err) reject(err);
                        if (data.response && data.response.error) reject(data.response.error);

                        resolve(data.profile);
                    });
                }
                else resolve(data.profile);
            });
        });
    }

    static TimeConvert(minutes) {
        let hours = 0;
        while(minutes >= 60)
        {
            hours++;
            minutes -= 60;
        }

        if(hours > 0) return `${hours} hours ${minutes} minutes`;
        else return `${minutes} minutes`;
    }

	static help() {
		return {
			category: "general",
			shortDesc: "Display Steam profile information",
			longDesc: "Display Steam profile information of the given profile.",
			syntax: "steam <steam64ID | customURL>"
		};
	}
}

module.exports = steam;