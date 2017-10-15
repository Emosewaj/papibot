const fs = require("fs");
const url = require("url");
const http = require("http");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const yt = require("ytdl-core");
const disc = require("./depen/index.js");
const rem = require("./depen/rem.js");
const blocked = require("./depen/blocked.js");
const math = require("./depen/math.js");
const tos = require("./depen/tos.js");
const config = require("./depen/config.js");
const Discord = require("discord.js");
const self = new Discord.Client();
const token = "TOKEN REMOVED";
const prefix = "//";
var cb;
var cmd;
var args = [];
const facts = JSON.parse(fs.readFileSync("./data/didyouknow.json"));

self.on("ready", () => {
	console.log(`Papi-Bot v2017.10.15 online in ${self.guilds.array().length} guilds\nLogged in as ${self.user.tag}\n`);
	self.user.setPresence({ "game":{"name":"Type //help to begin!","url":"https://discordbots.org/bot/337217642660233217"} });
	self.guilds.get("292040520648228864").channels.get("292040520648228864").send(`Papi-Bot v2017.09.15 online in ${self.guilds.array().length} guilds\nLogged in as ${self.user.tag}\n`);
	self.lastUpdate = "15/10/2017";
});

// Word triggers
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (msg.author == self.user) {return;}
	if (tos.check(msg.guild.id) == false) {return;}
	let wtcmd = config.getcmd(msg.content,msg.guild.id,msg.guild.name);;
	let wtargs = disc.getargs(msg.content);
	
	//These are very specific but work regardless of server setting
	if (msg.content.toLowerCase() == "goodnight, papi" || msg.content.toLowerCase() == "good night, papi"){
		let gn;
		let ending;
		if (msg.author.id == "211227683466641408"){
			ending = "master";
		} else {ending = msg.author.username}
		switch(math.randomNo(1,8)){
			case 1: gn = "Goodnight";break;
			case 2: gn = "Good night";break;
			case 3: gn = "Nighty";break;
			case 4: gn = "Nini";break;
			case 5: gn = "Good nighty";break;
			case 6: gn = "Nighty night";break;
			case 7: gn = "Sleep well";break;
			case 8: gn = "Sweet dreams";break;
		}
		msg.channel.startTyping();
		setTimeout(()=>{
			msg.channel.stopTyping(true);
			msg.channel.send(`${gn}, ${ending} = v=`);
		},1500);
		return;
	}

	//Check for blocked Servers
	if (blocked.check(msg.guild.id)){return;}
	//Check for blocked Users
	if (blocked.checkUser(msg.author.id)){return;}

	switch(disc.checkBirb(msg.content,msg.guild.id)){
		case 0: break;
		case 1: msg.channel.send("Chirp");break;
		case 2: msg.channel.send("CHIRP");break;
		case 3: msg.channel.send("chirp");break;
		case 4: msg.channel.send("Caw");break;
		case 5: msg.channel.send("CAW");break;
		case 6: msg.channel.send("caw");break;
	}

	switch(disc.checkMisc(msg.content.toLowerCase())){
		case 0: break;
		case 1: msg.reply("end yourself, filthy normie");msg.react("🇰").then(() => { msg.react("🇾").then(() => { msg.react("🇸").then(() => {}); }); });break;
		case 2: msg.channel.send("lad");break;
		case 3: msg.react("🐦");msg.react("🦅");msg.react("🦆");msg.react("🦉");break;
		case 4: msg.react("🏳️‍🌈");break;
		case 5: msg.react("🐸");break;
		case 6: msg.channel.send("yourself");break;
		case 7: msg.channel.send("allahu akbar");break;
		case 8: msg.channel.send("Admin he's doing it sideways");break;
	}

	//Because the Im thing can be annoying, I understand that
	if (blocked.checkIm(msg.guild.id)){return;}
	switch(disc.checkIm(wtcmd,msg.guild.id)){
		case 0: break;
		case 1: msg.channel.send(`Hi ${wtargs.join(" ")}!\nI'm Papi!`);msg.react(self.emojis.find("name","heheXD")).catch(console.warn);break;
	}
});

// Actual commands
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) {return;}
	if (msg.author == self.user) {return;}
	var embed = new Discord.RichEmbed();
	if (tos.check(msg.guild.id) == false && msg.content.startsWith("//tos") != true){msg.channel.send("This server has not accepted the terms of service yet! Please review and accept them using `//tos`!");return;}
	cmd = config.getcmd(msg.content,msg.guild.id,msg.guild.name);
	args = disc.getargs(msg.content);
	mention = msg.mentions.members.first();
	if (!cmd) {return;}
	disc.log(cmd,msg.guild.name,msg.author.tag,args);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Command",msg.author.displayAvatarURL)
	.setTimestamp()
	.addField("Author",`${msg.author.tag}\n${msg.author.id}`,true)
	.addField("Guild",`${msg.guild.name}\n${msg.guild.id}`,true)
	if (msg.content.length > 1024) {
		let longCMD = msg.content
		logEmbed.addField("Command",longCMD.slice(0,1023),true)
		.addField("Command",longCMD.slice(1024),true);
	} else {
		logEmbed.addField("Command",msg.content,true);
	}
	self.channels.get("357870372206673921").send({embed: logEmbed});

	//Check for blocked Users
	if (blocked.checkUser(msg.author.id)){return;}

	// Commands
	switch(cmd){
		case "ping": {
			switch(math.randomNo(1,5)){
				case 1: msg.channel.send("Hello!");break;
				case 2: msg.channel.send("Hi there!");break;
				case 3: msg.channel.send("How are you?");break;
				case 4: msg.channel.send("Good to see you!");break;
				case 5: msg.channel.send("Online and ready!");break;
			}
		}
		break;
		case "id": {
			switch(mention){
				case undefined: msg.reply(`your Discord ID is ${msg.author.id}!`);break;
				default: msg.reply(`${msg.mentions.members.first().displayName}'s Discord ID is ${mention.id}!`);break;
			}
		}
		break;
		case "avatar": {
			switch(mention){
				case undefined: msg.reply("this is your avatar!",{files: [msg.author.displayAvatarURL]});break;
				default: msg.reply(`this is ${mention.displayName}'s avatar!`,{files: [msg.mentions.users.first().displayAvatarURL]});break;
			}
		} 
		break;
		case "guildinfo": {
			embed.setTitle("Guild Information")
			.setAuthor(msg.guild.name, msg.guild.iconURL)
			  .setFooter(`Info requested by ${msg.author.tag}`, msg.author.displayAvatarURL)
  			.setTimestamp()
			.addField("Owner:", msg.guild.owner.user.tag, true)
			.addField("Member count:", msg.guild.memberCount, true)
			.addField("Guild region:", msg.guild.region, true)
			.addField("Channel count:",msg.guild.channels.size,true)
			.addField("Emoji count:",msg.guild.emojis.size,true)
			.addField("My prefix:",config.getprefix(msg.guild.id),true)
			.addField("Created at:", msg.guild.createdAt)
			.addField("Guild icon:",msg.guild.iconURL.toString())
			.setThumbnail(msg.guild.iconURL);
			msg.channel.send({embed});
		}
		break;
		case "status": {
			switch(mention){
				case undefined: switch(msg.author.presence.game){
						case null: msg.reply(`you are currently ${msg.author.presence.status}!`);break;
						default: msg.reply(`you are currently ${msg.author.presence.status} and are playing ${msg.author.presence.game.name}!`);break;
					}break;
				default: switch(mention.presence.game){
						case null: msg.reply(`${msg.mentions.members.first().displayName} is currently ${mention.presence.status}!`);break;
						default: msg.reply(`${msg.mentions.members.first().displayName} is currently ${mention.presence.status} and is playing ${mention.presence.game.name}!`);break;
					}break;
			}
		}
		break;
		case "invite": {
			embed.setAuthor("Click here for my invite link!",self.user.displayAvatarURL,"https://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773831")
			msg.channel.send({embed});
		}
		break;
		case "source": {
			embed.setAuthor("Click here for my source repository!",self.user.displayAvatarURL,"https://github.com/Jawesome99/papibot")
			.setDescription("Please mind, that it might not be on the most recent version!")
			.addField("Last update:",self.lastUpdate);
			msg.channel.send({embed});
		}
		break;
		case "roll": {
			if (args[args.length-1] !== undefined) {
				var digits = parseInt(args[args.length-1].toString());
				var digInArgs = true;
			} else {
				var digits = 9;
				var digInArgs = false;
			}
			let get;
			if (isNaN(digits)) {
				digits = 9;digInArgs = false;
			}
			if (digits > 25) {
				msg.reply("spam is a bad thing, I hope you can understand that! Can you try again with less than 25 digits, please?");break;
			}
			if (digits < 1) {
				msg.reply("I can't generate a number with no digits!");break;
			}
			msg.reply(disc.roll(digits,args,digInArgs));
		}
		break;
		case "help": {
			msg.reply(disc.getHelp(args,msg.guild.id));
		}
		break;
		case "bug": {
			embed.setAuthor("Found a bug? Click here to create an issue report!",self.user.displayAvatarURL,"https://github.com/Jawesome99/papibot/issues");
			msg.channel.send({embed});
		}
		break;
		case "8ball": {
			let img = disc.eightball();
			msg.reply(args.join(" "),{ files:[`./data/8ball/${img}.gif`] });
		}
		break;
		case "reverse": {
			msg.channel.send(disc.reverse(msg.content)).then(() => {},() => {
				msg.channel.send("You need to send me some text for that!")
			});
		}
		break;
		case "calc": {
			if (!args[0]) {
				msg.channel.send("You have to give me an equation!");
				return;
			}
			msg.reply(math.calc(args));
		}
		break;
		case "decide": {
			if (!args[0]) {
				msg.channel.send("Decide what?");
				return;
			}
			msg.reply(disc.decideForMe(args));
		}
		break;
		case "toggle": {
			if(msg.member.permissions.has("MANAGE_GUILD") || msg.author.id === "211227683466641408" || msg.author.id === "297556557774979072") {
				if (args[0] === undefined) {
					msg.channel.send("What do you want to toggle?");
					break;
				}
				if (args[0].toLowerCase() === "wt") {
					msg.channel.send(blocked.toggleWT(msg.guild.id));
					break;
				}
				if (args[0].toLowerCase() === "im") {
					msg.channel.send(blocked.toggleIm(msg.guild.id));
					break;
				}
				if (args[0].toLowerCase() === "bc") {
					msg.channel.send(blocked.toggleBC(msg.guild.id));
					break;
				}
				else {
					msg.channel.send("Accepted parameters: `wt`, `im`, `bc`")
				};
				break;
			} else {
				msg.channel.send("You do not have permission to do that!")
			};
		}
		break;
		case "sendnoots": {
			var noots = fs.readFileSync("./data/sendnoots.txt","utf8").split("\r\n");
			msg.channel.send("Noot noot!",{ files: [noots[math.randomNo(0,noots.length-1)]] });
		}
		break;
		case "sendnudes": {
			if(msg.channel.nsfw || msg.channel.name.includes("nsfw")){
					var nudes = fs.readFileSync("./data/sendnudes.txt","utf8").split("\r\n");
					msg.channel.send("P-please don't stare...", {files: [nudes[math.randomNo(0,nudes.length-1)]]});
			} else {
				msg.channel.send("I can't do that here! Try again in an nsfw channel!");
			}
		}
		break;
		case "info": {
			embed.setAuthor("Papi-Bot",self.user.displayAvatarURL,"https://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773831")
			.setDescription("Click my name for my invite link!")
			.addField("Users cached",self.users.size,true)
			.addField("Servers available",self.guilds.size,true)
			.addField("Emoji available",self.emojis.size,true)
			.addField("Last Ping",self.pings[0],true)
			.addField("D.JS version",Discord.version,true)
			.addField("Last update",self.lastUpdate,true);
			let usage = process.memoryUsage().heapUsed;let size = ["B","KB","MB","GB"];let usageData = 0
			while (usage/1024 >= 1) {
				usage = usage/1024;usageData++
			}
			embed.addField("Memory Usage",parseInt(usage)+size[usageData],true)
			.setTimestamp();
			if (msg.guild.me.roles.find("position",0)) {
				embed.setColor(msg.guild.me.roles.find("position",0).hexColor)
			} else {
				embed.setColor("DEFAULT")
			}
			msg.channel.send({embed});
		}
		break;
		case "ss":
		case "superscript": {
			msg.channel.send(disc.superscript(args));
		}
		break;
		case "report": {
			if (!args[0]) {
				msg.channel.send("Report a user by mentioning them and include a reason! Evidence has to be provided, otherwise your report might be ignored! You can either include a link somewhere in your report or send an attachment, i.e. a photo!\nAbusing this feature will result in you being blocked from using the bot!");
				break;
			}
			if (!mention) {
				msg.channel.send("Who are you reporting? Mention them!");
				break;
			}
			let reporter = msg.author;
			let reportee = mention.user;
			let reason = args.join(" ");
			let guild = msg.guild.name;
			if (msg.attachments.first()) {
				let attachment = msg.attachments.first().url;
				self.fetchUser("211227683466641408").then(Owner => {
					Owner.send(`A report has been sent in by ${reporter.tag} (ID: ${reporter.id}) from ${guild}\nReportee: ${reportee.tag} (ID: ${reportee.id})\n\nReason: ${reason}\nEvidence: ${attachment}`);
					msg.channel.send("Your report has been submitted!");
				})
			} else {
				self.fetchUser("211227683466641408").then(Owner => {
					Owner.send(`A report has been sent in by ${reporter.tag} (ID: ${reporter.id}) from ${guild}\nReportee: ${reportee.tag} (ID: ${reportee.id})\n\nReason: ${reason}\nNo attachment provided!`);
					msg.channel.send("Your report has been submitted!");
				})
			};
		}
		break;
		case "rc":
		case "randcap": {
			if (!args[0]) {
				msg.channel.send("You need to send me some text for that!");
				return;
			}
			msg.channel.send(disc.randCap(args));
		}
		break;
		case "dice": {
			if (!args[0]) {
				msg.channel.send(math.dice("6"));	
				return;
			}
			msg.channel.send(math.dice(args[0]));
		}
		break;
		case "fact": {
			let fact = math.randomNo(0,facts.length-1);
			msg.channel.send(`Fact #${fact+1}: ${facts[fact]}`);
			
		}
		break;

		//Music
		case "join": {
			switch(disc.join(msg.member)){
				case 0: {
					msg.reply("you aren't in a voice channel!");
				}
				break;
				case 1: {
					msg.member.voiceChannel.join().then(connection => {
						msg.channel.send(`Joined voice channel ${msg.guild.voiceConnection.channel.name}!`)
					}).catch(console.warn);
				}
				break;
			}
		}
		break;
		case "leave": {
			switch(disc.leave(msg.guild.voiceConnection)){
				case 0: {
					msg.reply("I'm not in a voice channel!");
				}
				break;
				case 1: {
					msg.channel.send(`Left voice channel ${msg.guild.voiceConnection.channel.name}!`);
					msg.guild.voiceConnection.channel.leave();
				}
				break;
			}
		}
		break;
		case "play": {
			switch(disc.play(msg.guild.voiceConnection,msg.member,args)){
				case 0: {
					msg.reply("something's not right! Either you or me aren't in a voice channel or what you gave me isn't a valid YouTube URL!");
				}
				break;
				case 1: {
					msg.guild.voiceConnection.playStream(yt(args[0], { audioonly: true }), { passes: 1 });
					msg.channel.startTyping();
					yt.getInfo(args[0], (err, info) => {
						msg.reply(`playing ${info.title} by ${info.author.name}!`);
						msg.channel.stopTyping(true);
						msg.delete().then(()=>{},reason => {
							console.warn(reason)
						});
					});
				}
				break;
				case 2:
				case 3:
				case 4: {
					msg.channel.send("This subcommand is currently disabled for technical reasons, please use YouTube videos instead. This message should also never appear.");
				}
				break;
			}
		}
		break;
			
		//Administrative
		case "kick": {
			if (msg.member.permissions.has("KICK_MEMBERS")) {
				if (msg.guild.members.get(self.user.id).permissions.has("KICK_MEMBERS")) {
					if (msg.mentions.members.first() === undefined) {
						msg.channel.send("You need to tag someone!")
					} else {args.shift();msg.mentions.members.first().kick(args.join(" ")).then(() => {msg.channel.send(`Kicked ${msg.mentions.users.first().tag}!`)},err => {msg.channel.send(`Something went wrong: ${err}`)});return;
					}
				} else {
					msg.channel.send("I don't have the required permission! Please add it by enabling \"Kick Members\" for the Papi-Bot role!");return;
				}
			} else {
				msg.channel.send("You don't have the required permission to do that!");return;
			}
		}
		break;
		case "ban": {
			if (msg.member.permissions.has("BAN_MEMBERS")) {
				if (msg.guild.members.get(self.user.id).permissions.has("BAN_MEMBERS")) {
					if (msg.mentions.members.first() === undefined) {
						msg.channel.send("You need to tag someone!")
					} else {
						args.shift();msg.mentions.members.first().ban({reason: args.join(" ")}).then(() => {msg.channel.send(`Banned ${msg.mentions.users.first().tag}!`)},err => {msg.channel.send(`Something went wrong: ${err}`)});return;
					}
				} else {
					msg.channel.send("I don't have the required permission! Please add it by enabling \"Ban Members\" for the Papi-Bot role!");return;
				}
			} else {
				msg.channel.send("You don't have the required permission to do that!");return;
			}
		}
		break;
		case "setprefix": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			if (!args[0]) {msg.channel.send("You didn't specify a new prefix!");break;}
			else {switch(config.changePrefix(msg.guild,args[0])){
				case 0: msg.channel.send("Error setting prefix! Please contact owner through DM!");break;
				case 1: msg.channel.send(`Successfully set command-prefix to ${args[0]}!`);break;
				default: msg.channel.send("Unexpected return value! Please contact owner through DM!");break;
			}}
		}
		break;
		case "setwelcome": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			msg.channel.send("Please enter the name of the channel you would like to have the welcome messages appear, type `dm` to send the welcome message to the new member's private chat, `remove` to disable or type `cancel` to abort!\nExample:\n`general`");
			let collector = msg.channel.createMessageCollector(m => m.author == msg.author,{ time: 20000 });
			collector.on("collect",m => {
				if (m.content == "cancel") {collector.stop();msg.channel.send("Command was cancelled.")}
				else if (m.content == "remove") {collector.stop();config.removeWelcome(m.guild.id).then(resolve => {msg.channel.send(resolve)},error => {msg.channel.send(error)})}
				else {
					collector.stop();
					if (m.content == "dm") {
						var welcomeChannel = {id: "dm"}
					} else {
						var welcomeChannel = m.guild.channels.find(Channel => {if (Channel.name.includes(m.content)) {return true;} else {return false;}})
						if (!welcomeChannel) {msg.channel.send("I couldn't find a channel with that name! Please try again!");return;}
						if (!welcomeChannel.permissionsFor(m.guild.me).has("SEND_MESSAGES")) {msg.channel.send("I can't send messages to that channel, command aborted!");return;}
					}
					msg.channel.send("Please send me the message you would like me to display! You can use the following operators: `$MEMBER_NAME`, `$GUILD_NAME`, `$GUILD_MEMBERCOUNT`!\nType `cancel` to abort!\nExample:\n`Hello, $MEMBER_NAME, welcome to $GUILD_NAME!`");
					let collector2 = m.channel.createMessageCollector(m2 => m2.author == msg.author,{ time: 60000 });
					collector2.on("collect",m2 => {
						if (m2.content == "cancel") {collector2.stop();msg.channel.send("Command was cancelled.")}
						else {
							collector2.stop();
							config.setWelcome(m2.guild.id,welcomeChannel.id,m2.content).then(answer => {msg.channel.send(answer);},error => {msg.channel.send(error);});
							return;
						}
					})
					collector2.on("end",(collected,reason) => {
						if (reason == "time") {msg.channel.send("Command was cancelled.");return;}
					})
				}
			});
			collector.on("end",(collected,reason) => {
				if (reason == "time") {msg.channel.send("Command was cancelled.");return;}
			});
		}
		break;
		case "setlog": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			let logSettings = config.getLogSettings(msg.guild.id);
			if (logSettings == null) {
				msg.channel.send("This server is not currently logging any activity! Please enter a channel name to be used for logging or `cancel` to abort!")
				let collector = msg.channel.createMessageCollector(m => m.author == msg.author,{time: 45000});
				collector.on("collect",m => {
					if (m.content.toLowerCase() == "cancel") {
						collector.stop("time");
					}
					else if (m.guild.channels.find("name",m.content) && m.guild.channels.find("name",m.content).permissionsFor(m.guild.me).has("SEND_MESSAGES")) {
						m.channel.send(`Using ${m.content} as the log channel! You can now change your log settings using \`//setlog\`!`);
						config.setLogSettings(m.guild.id,m.guild.channels.find("name",m.content).id,null);
						return;
					}
				})
				collector.on("end",(collected,reason) => {
					if (reason == "time") {msg.channel.send("Command aborted!");return;}
				})
			} else {
				switch(args[0]){
					case "channel": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"channel").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "emoji": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"emoji").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "bans": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"ban").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "member": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"member").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "guild": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"guild").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					default: {
						let text = (`These are the current logging settings: \n\n${logSettings.settings.guildUpdates} Log guild updates? \n${logSettings.settings.channelUpdates} Log channel updates? \n${logSettings.settings.memberUpdates} Log member updates? \n${logSettings.settings.banUpdates} Log bans? \n${logSettings.settings.emojiUpdates} Log emoji updates? \n\nTo toggle either of the settings, use \`//setlog <setting>\`, for example: \`//setlog member\``);
						text = text.replace("true","☑");
						text = text.replace("false","❌");
						msg.channel.send(text);
					}
				}
			}
			
		}
		break;
	}
});

// Owner commands
self.on("message", async msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) return;
	if (tos.check(msg.guild.id) == false && disc.ownerCheck(msg.author.id) == 0){;return;}
	
	const commands = ["say","eval","setname","getguilds","dm","react","sendintro","restart","shutdown","broadcast","block","unblock","exec","reply"];
	if (commands.includes(cmd)){
		switch(disc.ownerCheck(msg.author.id)){
			case 0: msg.channel.send(disc.explainOwnerCMD(cmd));break;
			case 1: switch(cmd) {
				case "say": {
					msg.delete().then(()=> {
						msg.channel.send(args.join(" "))
					},()=> {
						msg.channel.send("Sorry, no permission to delete command ;v;")
					});
				}
				break;
				case "eval": {
					try {
						let result = eval(args.join(" "));
						if (result instanceof Promise) {
							result = await result;
						}} catch(err) {
							msg.channel.send(`Error: ${err.message}`);
						};
				}
				break;
				case "exec": {
					try {
						let result = eval(args.join(" "));
						msg.channel.send(`\`\`\`typeof ${typeof result}\`\`\`\n\`\`\`\n${result}\`\`\``);
					} catch(err) {
						msg.channel.send(`Error: ${err.message}`);
					};
				}
				break;
				case "setname": {
					msg.guild.me.setNickname(args.join(" ")).then(() => {
						msg.channel.send("Successfully set my name!")
					}, err => {
						msg.channel.send(`Couldn't set my name: ${err}`)
					});
				}
				break;
				case "getguilds": {
					let argstring;
					let argtext;
					switch(disc.getguilds(args)){
						case 0: {
							let list = [];
							self.guilds.forEach(Guild => {list.push(`${Guild.memberCount} - ${Guild.name}`)})
							msg.channel.send(`\`\`\`${list.join("\n")}\`\`\``);
						}
						break;
						case 1: {
							argstring = args.toString();
							argtext = argstring.split(",").slice(1);
							msg.channel.send(`\`\`\`\n${self.guilds.find('name',argtext.join(" ")).id}\n\`\`\``);
						}
						break;
						case 2: {
							argstring = args.toString();
							argtext = argstring.split(",").slice(1);
							msg.channel.send(`\`\`\`\n${self.guilds.find("name",argtext.join(" ")).owner.user.tag}\n\`\`\``);
						}
						break;
					}
				}
				break;
				case "dm": {
					let id = args.shift();
					let text = args;
					self.fetchUser(id).then(User => {
						User.send(text.join(" ")).then(() => {
							msg.channel.send(`Successfully sent "${text.join(" ")}" to ${User.tag}`)
						});
					});
				}
				break;
				case "reply": {
					if(!global.lastDM) return;
					global.lastDM.send(args.join(" ")).then(() => {
						msg.channel.send(`Successfully sent reply to ${global.lastDM.tag}!`)
					}, err => {
						msg.channel.send(`Error: ${error}`)
					});
				}
				break;
				case "react": {
					msg.channel.fetchMessage(args[0]).then(message => {
						message.react(args[1]);
					}).catch(console.warn);
				}
				break;
				case "sendintro": {
					let newGuild = self.guilds.get(args[0]);
					var intro = (`Hello! Sorry for my late introduction, unfortunately I was added while I was offline, so I didn't notice! Anyway, my name is Papi and I hope all ${newGuild.memberCount-1} of you will enjoy my presence!\n\nType //help to begin!`);
					let channel = newGuild.channels.find(Channel => {
						if(Channel.permissionsFor(newGuild.me).has("SEND_MESSAGES")) {
							return true;
						} else {
							return false;
						}
					});
					channel.send(intro).then(() => {
						self.channels.get("292040520648228864").send("Successfully sent intro")
					},err => {
						self.channels.get("292040520648228864").send(`Couldn't send intro: ${err}`)
					});
				}
				break;
				case "broadcast": {
					self.guilds.forEach(Guild => {
						if (blocked.checkBroadcasts(Guild.id) == false){
							let GuildChannel = Guild.channels.find(Channel => {
								if (Channel.permissionsFor(self.user).has("SEND_MESSAGES") && Channel.name.includes("rule") == false && Channel.name.includes("support") == false && Channel.name.includes("announce") == false && Channel.name.includes("staff") == false && Channel.type == "text") {
									return true;
								} else {
									return false;
								};
							});
							let text = args.join(" ");
							let prefix = config.getprefix(GuildChannel.guild.id);
							while (text.includes("$PREFIX")) {
								text = text.replace("$PREFIX",prefix)
							}
							GuildChannel.send(text).then(Msg => {
								console.log(`Message sent to ${Msg.channel.name} in ${Msg.guild.name}`);
							}, err => {
								console.error(`Couldn't send a message: ${err}`);
							})
						}
					});
				}
				break;
				case "block": {
					if (!mention && isNaN(args[0])) {
						msg.channel.send("Mention someone to block or use their ID!");
						break;
					}
					if (mention) {
						msg.channel.send(blocked.blockUser(mention.id));
						break;
					}
					if (!isNaN(args[0])) {
						msg.channel.send(blocked.blockUser(args[0]));
						break;
					}
				}
				case "unblock": {
					if (!mention && isNaN(args[0])) {
						msg.channel.send("Mention someone to unblock or use their ID!");
						break;
					}
					if (mention) {
						msg.channel.send(blocked.unblockUser(mention.id));
						break;
					}
					if (!isNaN(args[0])) {
						msg.channel.send(blocked.unblockUser(args[0]));
						break;
					}
				}
				case "shutdown": {
					msg.channel.send("Papi-Bot was shut down.").then(() => {
						self.destroy().then(() => {
							console.log("\nPapi-Bot was shut down.");
							process.exit(0);
						}).catch(console.warn)
					});
				}
				break;
			}
			break;
		}
	} else {
		return;
	}
});

// Meme command
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) return;
	if (msg.author == self.user) return;

	//Check for blocked Users
	if (blocked.checkUser(msg.author.id)){return;}

	if (!args[0]) {return;}

	switch(disc.commandCheck(cmd)){
		case 1: break;
		case 0: msg.reply(rem.other(cmd,args));
	}
});

// Guild introduction	
self.on("guildCreate", guild => {
	var intro = (`Hello! My name is Papi-Bot! I hope all ${guild.memberCount-1} of you will enjoy my presence! Please accept the terms of service to begin (\`//tos\`)!`);
	var success = "Successfully sent introduction to new guild";
	var failure = "Couldn't send introduction to new guild";
	var ownerIntro = `Hello, my name is Papi-Bot and I was just added to your guild ${guild.name}! Unfortunately I can't introduce myself because there is no channel I can currently speak in. Please make sure I can send messages to at least one channel, then use \`//tos\` to read and accept or deny my terms of service! Thanks for having me around!`;
	let invChannel = guild.channels.find(Channel => {if(Channel.permissionsFor(guild.me).has("SEND_MESSAGES") && Channel.type == "text"){return true;} else {return false;}})
	console.log(invChannel)
	if (invChannel == null || invChannel == undefined || !invChannel || !invChannel.send) {
		guild.owner.send(ownerIntro);
		config.addGuild(guild);
	} else {
		invChannel.send(intro);
		config.addGuild(guild);
	}
	let embed = new Discord.RichEmbed()
	.setAuthor("Guild added",guild.owner.user.displayAvatarURL)
	.addField("Name:",guild.name)
	.addField("ID:",guild.id)
	.addField("Owner:",`${guild.owner} (${guild.owner.user.tag})`)
	.addField("Members:",guild.memberCount-1)
	.setThumbnail(guild.iconURL);
	invChannel.createInvite().then(Invite => {
		self.channels.get("292040520648228864").send(`<@211227683466641408> I was added to a new guild!\nInvite: ${Invite.url}`,{embed});
	}, err => {
		self.channels.get("292-4-52-648228864").send("<@211227683466641408> I was added to a new guild!",{embed});
	});
});

// Guild leaving
self.on("guildDelete", guild => {
	let embed = new Discord.RichEmbed()
	.setAuthor("Guild deleted",guild.owner.user.displayAvatarURL)
	.addField("Name:",guild.name)
	.addField("ID:",guild.id)
	.addField("Owner:",`${guild.owner} (${guild.owner.user.tag})`)
	.addField("Members:",guild.memberCount-1)
	.setThumbnail(guild.iconURL);
	self.guilds.get("292040520648228864").channels.get("292040520648228864").send("<@211227683466641408> I was removed from a guild!",{embed});
	config.removeGuild(guild);
});

// Welcome messages
self.on("guildMemberAdd",member => {
	if (!config.getWelcome(member.guild.id)) {return;}
	let welcomeData = config.getWelcome(member.guild.id);
	if (welcomeData.channel == "dm") {
		var channel = member.user;
	} else {
		var channel = member.guild.channels.get(welcomeData.channel);
	}
	let toSend = welcomeData.message;
	while (toSend.includes("$MEMBER_NAME" || "$GUILD_NAME" || "$GUILD_MEMBERCOUNT")) {
		toSend = toSend.replace("$MEMBER_NAME",member.user.username);
		toSend = toSend.replace("$GUILD_NAME",member.guild.name);
		toSend = toSend.replace("$GUILD_MEMBERCOUNT",member.guild.memberCount);
	}
	channel.send(toSend.toString());
})

/**
 * Most of the following events are log-events for local logging.
 * See index.js for the logging settings
 */
self.on("channelCreate",channel => {
	if (channel.type == "dm") {return;}
	let logSettings = config.getLogSettings(channel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel created")
	.addField("Name",channel.name,true)
	.addField("Type",channel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("channelDelete",channel => {
	if (channel.type == "dm") {return;}
	let logSettings = config.getLogSettings(channel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel deleted")
	.addField("Name",channel.name,true)
	.addField("Type",channel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("channelUpdate",(oldChannel,newChannel) => {
	if (oldChannel.type == "dm" || newChannel.type == "dm") {return;}
	let logSettings = config.getLogSettings(newChannel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel updated")
	.addField("Old Name",oldChannel.name,true)
	.addField("New Name",newChannel.name,true)
	.addField("Type",newChannel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiCreate",emoji => {
	let logSettings = config.getLogSettings(emoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji created")
	.addField("name",emoji.name,true)
	.addField("Emoji",emoji.toString(),true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiDelete",emoji => {
	let logSettings = config.getLogSettings(emoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji deleted")
	.addField("Name",emoji.name,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiUpdate",(oldEmoji,newEmoji) => {
	let logSettings = config.getLogSettings(newEmoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji updated")
	.addField("Old name",oldEmoji.name,true)
	.addField("New name",newEmoji.name,true)
	.addField("Emoji",newEmoji.toString())
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildBanAdd",(guild,user) => {
	let logSettings = config.getLogSettings(guild.id);
	if (logSettings == null || logSettings.settings.banUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User banned",user.displayAvatarURL)
	.addField("Tag",user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildBanRemove",(guild,user) => {
	let logSettings = config.getLogSettings(guild.id);
	if (logSettings == null || logSettings.settings.banUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User unbanned",user.displayAvatarURL)
	.addField("Tag",user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberAdd",member => {
	let logSettings = config.getLogSettings(member.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User joined",member.user.displayAvatarURL)
	.addField("Tag",member.user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberRemove",member => {
	let logSettings = config.getLogSettings(member.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User left",member.user.displayAvatarURL)
	.addField("Tag",member.user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberUpdate",(oldMember,newMember) => {
	let logSettings = config.getLogSettings(newMember.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let valid = false;
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Member updated",newMember.user.displayAvatarURL)
	.setTimestamp();
	if (oldMember.user.tag !== newMember.user.tag) {logEmbed.addField("New username",newMember.user.tag,true);valid = true;}
	if (oldMember.nickname !== newMember.nickname) {logEmbed.addField("New nickname",newMember.nickname,true);valid = true;}
	if (oldMember.user.displayAvatarURL !== newMember.user.displayAvatarURL) {logEmbed.addField("New Avatar","\u200B").setImage(newMember.user.displayAvatarURL);valid = true;}
	if (valid == true) {logChannel.send({embed: logEmbed})} else {return;}
})
self.on("guildUpdate",(oldGuild,newGuild) => {
	let logSettings = config.getLogSettings(newGuild.id);
	if (logSettings == null || logSettings.settings.guildUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let valid = false;
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Guild updated")
	.setTimestamp();
	if (oldGuild.name !== newGuild.name) {logEmbed.addField("New name",newGuild.name,true);valid = true;}
	if (oldGuild.ownerID !== newGuild.ownerID) {logEmbed.addField("New owner",newGuild.owner.user.tag,true);valid = true;}
	if (oldGuild.region !== newGuild.region) {logEmbed.addField("New region",newGuild.region,true);valid = true;}
	if (oldGuild.icon !== newGuild.icon) {logEmbed.addField("New icon","\u200B").setImage(newGuild.iconURL);valid = true;}
	if (valid == true) {logChannel.send({embed: logEmbed})} else {return;}
})

// Forward received DMs to me
self.on("message", msg => {
	if (msg.channel.type == "dm" && msg.author != self.user){
		if (msg.content.startsWith("//")) {msg.channel.send("Papi-Bot is designed to work in guild, direct messages are forwarded to the developer! (Your message was forwarded anyway)");}
		self.fetchUser("211227683466641408").then(User => {
			User.send(`From ${msg.author.tag}: ${msg.content}`);
			if (msg.attachments.first() != undefined) {User.send(`From ${msg.author.tag}: ${msg.attachments.first().url}`);}
			global.lastDM = msg.author;
		});
	} else {return;}
});

process.on("uncaughtException", err => {
	fs.writeFileSync("./logs/lastCrash.log",err.stack);
	console.error(err.stack);
	self.channels.get("292040520648228864").send(`<@211227683466641408> Crashed: ${err}\n at ${new Date().toString()}`);
	self.channels.get("292040520648228864").send(`\`\`\`\n${err.stack}\`\`\``).then(()=>{process.exit(1);},()=>{process.exit(1);})
});

// ToS Check
self.on("message", msg => {
	if (msg.channel.type == "dm") return;
	if (msg.author == self.user) return;
	cmd = disc.getcmd(msg.content);
	args = disc.getargs(msg.content);

	if (cmd == "tos") {
		if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission for this command!");return;}
		switch(args.join(" ")){
			case "read": msg.channel.send(tos.read());break;
			case "accept": msg.channel.send(tos.accept(msg.guild.id));break;
			case "deny": msg.channel.send(tos.deny(msg.guild.id));msg.guild.leave();break;
			default: msg.channel.send("Accepted parameters: `read`, `accept`, `deny`\nExample: `//tos read`");break;
		}
	} else return;
});

self.login(token);

process.on('unhandledRejection', err => {
	console.warn(`Uncaught Promise Error: \n${err.stack}`)
});
