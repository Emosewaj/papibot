class setwelcome {
	static async run(client, args) {
        const m = args.shift();
        if(!m.member.permissions.has("MANAGE_GUILD")) return m.channel.send("You do not have the required permission!");

        var currentMessage = await client.db.get("welcomes", m.guild.id);
        if (currentMessage) currentMessage = currentMessage.message;
        var str0;
        if (!currentMessage) str0 = "You currently do not have a welcome message set!";
        else str0 = "Your current welcome message:\n" + currentMessage;

        var str1 = "set - Start the setup for welcome messages";
        if (currentMessage) str1 = "set    - Start the setup for welcome messages\nchange - Edit your set welcome message\nremove - Delete your set welcome message";
        await m.channel.send(str0 + "\n\n```" + str1 + "```Enter an option or enter `cancel` to abort.");
        let collector = m.channel.createMessageCollector(m1 => m1.author == m.author,{ time:10000 });

        collector.on("collect", m1 => {
            collector.stop();

            m1.content = m1.content.toLowerCase();
            
            if (m1.content == "set")
            {
                args.unshift(m);
                return this.runSetup(client, args);
            }
            else if (m1.content == "change")
            {
                if (!currentMessage) return m.channel.send("You can't edit your welcome message because you have none set!");
                
                args.unshift(m);
                return this.runEdit(client, args);
            }
            else if (m1.content == "remove")
            {
                if (!currentMessage) return m.channel.send("You can't delete your welcome message because you have none set!");
                
                return client.db.del("welcomes", m1.guild.id).then(() => {
                    return m.channel.send("Successfully deleted your welcome message!");
                }, err => {
                    return m.channel.send("Couldn't delete your welcome message: " + err);
                });
            }
            else
            {
                return m.channel.send("Unknown option! Command cancelled.");
            }
        });
        collector.on("end", reason => {
            if (reason == "time")
            {
                return m.channel.send("Command was cancelled.");
            }
            else return;
        });
    }
    
    static async runSetup(client, args) {
        const m = args[0];

        // Step 1: Channel
        let channel = await this.setupStep1(client, args).catch(err => {
            return m.channel.send(err + " Command aborted.");
        });

        if (channel == "command cancelled") return m.channel.send("Command cancelled.");

        // Step 2: Message
        let message = await this.setupStep2(client, args).catch(err => {
            return m.channel.send(err + " Command aborted.");
        });

        if (message == "command cancelled") return m.channel.send("Command cancelled.");

        return client.db.set("welcomes", m.guild.id, [channel.id, message]).then(() => {
            return m.channel.send("Successfully set your welcome message!");
        }, err => {
            return m.channel.send("Couldn't set your welcome message: " + err);
        });
    }

    static setupStep1(client, args) {
        return new Promise((resolve, reject) => {
            const m = args[0];
            let channel;

            m.channel.send(
                "Please choose the channel you would like the welcome message to appear in.\n" + 
                "This can be one of:\n" + 
                " - Channel mention\n" +
                " - Channel name\n" + 
                " - Channel ID\n" +
                "You can also use `dm` to send the welcome message to the user's direct messages!"
            );
            var collector = m.channel.createMessageCollector(m1 => m1.author == m.author,{ time: 20000 });
            collector.on("collect", m1 => {
                collector.stop();
                if (m1.content.toLowerCase() == "cancel") 
                {
                    resolve("command cancelled");
                    return;
                }
                else if (m1.content.toLowerCase() == "dm")
                {
                    resolve( { id:"dm" } );
                    return;
                }
                else if (m1.mentions.channels.first())
                {
                    if (m1.mentions.channels.first().type != "text") reject("Mentioned channel isn't a text channel.");
                    else resolve(m1.mentions.channels.first());
                }
                else if (!isNaN(parseInt(m1.content)) && parseInt(m1.content).toString() == m1.content)
                {
                    channel = m1.guild.channels.get(m1.content);
                    if (!channel) reject("Couldn't find a channel with that ID.");
                    else resolve(channel);
                }
                else
                {
                    channel = m1.guild.channels.find(Channel => {
                        if (Channel.name == m1.content || Channel.name.includes(m1.content) || Channel.name.toLowerCase().includes(m1.content)) return true;
                        else return false;
                    });
                    if (!channel) reject("Couldn't find a channel with that name.");
                    else if (!channel.permissionsFor(m1.guild.me).has("SEND_MESSAGES")) reject("Can't send messages to that channel.");
                    else resolve(channel);
                }
            });
            collector.on("end", reason => {
                if (reason == "time")
                {
                    resolve("command cancelled");
                }
                else return;
            });
        });
    }

    static setupStep2(client, args) {
        return new Promise((resolve, reject) => {
            const m = args[0];
            let message;

            m.channel.send(
                "Please send me the message you would like me to display.\n" + 
                "The following replacers may be used:", 
                {
                    embed: 
                    {
                        description: 
                        "`$MEMBER_NAME`       - Looks like: " + m.author.username + "\n" +
                        "`$MEMBER_TAG`        - Looks like: " + m.author.tag + "\n" +
                        "`$MEMBER_MENTION`    - Looks like: <@" + m.author.id + ">\n" +
                        "`$GUILD_NAME`        - Looks like: " + m.guild.name + "\n" +
                        "`$GUILD_MEMBERCOUNT` - Looks like: " + m.guild.memberCount
                    }
                }
            );

            var collector = m.channel.createMessageCollector(m1 => m1.author == m.author,{ time: 60000 });
            collector.on("collect", m1 => {
                collector.stop();

                if (m1.content.toLowerCase() == "cancel") 
                {
                    resolve("command cancelled");
                    return;
                }
                else
                {
                    resolve(m1.content);
                    return;
                }
            });
            collector.on("end", reason => {
                if (reason == "time")
                {
                    resolve("command cancelled");
                }
                else return;
            });
        });

    }

    static async runEdit(client, args) {
        const m = args[0];

        m.channel.send("Enter what you'd like to change:\n```\nchannel\nmessage```");
        var collector = m.channel.createMessageCollector(m1 => m1.author == m.author,{ time: 20000 });
        collector.on("collect", async m1 => {
            collector.stop();
            var currentMessage = await client.db.get("welcomes", m.guild.id);
            var channelID = currentMessage.channelid;
            var channel = {};
            if (channelID == "dm")
	        {
		        channel.id = "dm";
	        }
	        else
	        {
		        channel = m1.guild.channels.get(channelID);
	        }
            var message = currentMessage.message;
            m1.content = m1.content.toLowerCase();
            if (m1.content == "cancel")
            {
                return m.channel.send("Command cancelled.");
            }
            else if (m1.content == "channel")
            {
                channel = await this.setupStep1(client, args).catch(err => {
                    return m.channel.send(err + " Command aborted.");
                });
            }
            else if (m1.content == "message")
            {
                message = await this.setupStep2(client, args).catch(err => {
                    return m.channel.send(err + " Command aborted.");
                });
            }

            return client.db.set("welcomes", m.guild.id, [channel.id, message]).then(() => {
                return m.channel.send("Successfully set your welcome message!");
            }, err => {
                return m.channel.send("Couldn't set your welcome message: " + err);
            });
        });

    }

	static help() {
		return {
			category: "administrative",
			shortDesc: "Set a welcome message for your server",
			longDesc: "Sets a welcome message for your Discord Server. The message can be sent in a text channel or the user's DMs.\n\nThis command acts like a wizard and guides you through it.",
			syntax: "setwelcome"
		};
	}
}

module.exports = setwelcome;