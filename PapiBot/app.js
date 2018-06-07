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

self.version = {
	major: 3,
	minor: 0,
	release: 0
};

async function init() {
	self.ready = false;
	self.commands = new Collection();
	let cmds = fs.readdirSync("./commands");
	for (let i in cmds) {
		self.commands.set(cmds[i].slice(0, cmds[i].length - 3).toLowerCase(), require("./commands/" + cmds[i]));
	}

	self.db = new Database("./data/servers.db");

	let customPrefixGuilds = await self.db.all("prefixes");
	self.customPrefixGuilds = new Collection();
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
});

self.on("message", async m => {
	if (m.author.bot) return;
	let prefix = self.customPrefixGuilds.get(m.guild.id);
	if (!prefix) prefix = "//";
	if (!m.content.startsWith(prefix)) return;
	if (!self.ready) return m.channel.send("Papi-Bot is currently not accepting commands! Please wait a short bit!");
	let cmd = m.content.split(" ")[0].slice(prefix.length);
	let args = m.content.split(" ").splice(1);

	if (self.commands.has(cmd.toLowerCase())) {
		args.unshift(m);
		self.commands.get(cmd.toLowerCase()).run(self, args);
		log(`${m.author.tag} in ${m.guild.name}: ${m.content}`);
	} else {
		m.channel.send("No such command (Debug)!");
	}
});

self.checkOverride = function (id) {
	if (id === "211227683466641408" ||
		id === "297556557774979072") {
		return true;
	}
	return false;
};

self.checkPermission = function (member, permissions) {
	if (member.hasPermission(permissions, checkAdmin = true, checkOwner = true)) return true;
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

process.on("uncaughtException", e => {
	console.error(e);
	process.exit();
});