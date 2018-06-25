"use strict";
const util = require('util');
const Database = require("./data/Database.js");
const fs = require("fs");
const { Collection, Client, Embed } = require("discord.js");
const self = new Client({
	messageCacheLifetime: 90,
	messageSweepInterval: 300,
	disableEveryone: true,
	disabledEvents: [
		"TYPING_START"
	]
});
const cfg = require("./cfg.json");
self.cfg = cfg;

self.version = {
	major: 3,
	minor: 0,
	patch: 0
};

async function init() {
	self.ready = false;
	self.commands = new Collection();
	let cmds = fs.readdirSync("./commands");
	self.failed = 0;
	for (let i in cmds) {
		try {
			self.commands.set(cmds[i].slice(0, cmds[i].length - 3).toLowerCase(), require("./commands/" + cmds[i]));
		} catch (err) {
			console.error(err);
			self.failed++;
		}
	}

	self.db = new Database("./data/servers.db");

	let customPrefixGuilds = await self.db.all("prefixes");
	let disabledBroadcastGuilds = fs.readFileSync("./data/blocked/broadcasts.txt", "utf8");
	let enabledDadjokeGuilds = fs.readFileSync("./data/blocked/dadjokes.txt", "utf8");
	let enabledWordtriggerGuilds = fs.readFileSync("./data/blocked/wordtriggers.txt", "utf8");
	self.customPrefixGuilds = new Collection();
	self.disabledBroadcastGuilds = disabledBroadcastGuilds.split(",");
	self.enabledDadjokeGuilds = enabledDadjokeGuilds.split(",");
	self.enabledWordtriggerGuilds = enabledWordtriggerGuilds.split(",");
	for (let i in customPrefixGuilds) {
		self.customPrefixGuilds.set(customPrefixGuilds[i].id, customPrefixGuilds[i].prefix);
	}

	switch (cfg.mode) {
		case "main": self.login(cfg.tokens.main); break;
		case "test": self.login(cfg.tokens.test); break;
	}
}

self.on("ready", () => {
	self.ready = true;
	log(self.user.tag + " online!");
	let amount = " commands ";
	if (self.commands.size === 1) amount = " command ";
	log(self.commands.size + amount + "loaded!");
	log(self.failed + " commands failed to load!");
});

self.on("message", async m => {
	if (m.author.bot) return;

	if (m.channel.type === "dm") {
		if (m.content.startsWith("//")) m.channel.send("Papi-Bot is designed to work in servers, direct messages are forwarded to the developer (Your message was forwarded anyway)!");
		return self.fetchUser("211227683466641408").then(User => {
			User.send("From " + m.author.tag + ": " + m.content);
			if (m.attachments.first()) User.send("From " + m.author.tag + ": " + m.attachments.first().url);
			self.lastDM = m.author;
		});
	}

	let prefix = self.customPrefixGuilds.get(m.guild.id);
	if (!prefix) prefix = "//";
	if (!m.content.startsWith(prefix)) return;
	if (!self.ready) return m.channel.send("Papi-Bot is currently not accepting commands! Please wait a short bit!");
	let cmd = m.content.split(" ")[0].slice(prefix.length);
	let args = m.content.split(" ").splice(1);

	if (self.commands.has(cmd.toLowerCase())) {
		args.unshift(m);
		log(`${m.author.tag} in ${m.guild.name}: ${m.content}`);
		try {
			self.commands.get(cmd.toLowerCase()).run(self, args);
		} catch (err) {
			m.channel.send("Error running command: `" + err + "`");
		}
	} else {
		m.channel.send("No such command (Debug)!");
	}
});

self.checkNsfw = function (channel) {
	if (channel.nsfw || channel.name.toLowerCase().includes("nsfw")) return true;
	return false;
};

self.checkOverride = function (id) {
	if (id === "211227683466641408" ||
		id === "297556557774979072") {
		return true;
	}
	return false;
};

self.checkPermission = function (member, permissions) {
	if (member.hasPermission(permissions, false, true, true)) return true;
	return false;
};

function log(string) {
	let date = new Date();
	let hr = date.getHours().toString();
	let min = date.getMinutes().toString();
	let sec = date.getSeconds().toString();
	if (hr.length < 2) hr = "0" + hr;
	if (min.length < 2) min = "0" + min;
	if (sec.length < 2) sec = "0" + sec;
	let ts = `[${hr}:${min}:${sec}]`;
	console.log(`${ts} ${string}`);
}

/*function logS(string) {
	let date = new Date();
	let hr = date.getHours().toString();
	let min = date.getMinutes().toString();
	let sec = date.getSeconds().toString();
	if (hr.length < 2) hr = "0" + hr;
	if (min.length < 2) min = "0" + min;
	if (sec.length < 2) sec = "0" + sec;
}*/

init();

process.on("uncaughtException", err => {
	fs.writeFileSync("./logs/lastCrash.log", err.stack);
	console.error(err);
	self.channels.get("419968973287981061")
		.send(`<@211227683466641408> Crashed: ${err}\n at ${new Date().toString()}`, {
			files: ["./logs/lastCrash.log"]
		}).then(() => {
			process.exit(1);
		}, () => {
			process.exit(1);
		});
});

process.on('unhandledRejection', err => {
	console.warn(`Uncaught Promise Error: \n${err}`);
});