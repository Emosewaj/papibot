// Some of this may be extracted to another module eventually
const fs = require("fs");
const Discord = require("discord.js");

const functions = require("./functions");

const client = new Discord.Client({
    intents: []
});
const config = require("./../config.json");

// Top.gg Bot List
if (config.mode == "prod") {
    const AutoPoster = require("topgg-autoposter").AutoPoster;
    const poster = AutoPoster(config.prod.dblToken, client);

    poster.on("posted", function (stats) {
        functions.log(`Posted stats to Top.gg | ${stats.serverCount} servers`);
    });

    poster.on("error", function (error) {
        functions.warn(`Failed to post stats to Top.gg: ${error}`);
    });
}

// Initialisation
(async () => {
    client.commands = new Map();
    let commandFiles = fs.readdirSync(__dirname + "/commands");

    let failed = 0;

    for (const commandFile of commandFiles) {
        try {
            client.commands.set(commandFile.substr(0, commandFile.length - 3).toLowerCase(), require(`./commands/${commandFile}`));
        }
        catch (error) {
            functions.warn(`Failed to load command "${commandFile}: ${error}`);
            failed++;
        }
    }

    client.commandsFailed = failed;

    client.login(config[config.mode].token);
})();

client.on("ready", function () {
    functions.log(`${client.user.tag} online!`);
    functions.log(`${client.commands.size} commands loaded!`);
    if (client.commandsFailed > 0) {
        functions.warn(`${client.commandsFailed} commands failed to load!`);
    }
    else {
        functions.log("0 commands failed to load!");
    }
});

// Command handler
client.on("interactionCreate", async function (interaction) {
    if (!interaction.isCommand)
        return;

    let command = client.commands.get(interaction.commandName.toLowerCase());

    if (!command) {
        await interaction.reply({
            content: "No such command loaded! Command list may be out of date!",
            ephemeral: true
        });
        return;
    }

    try {
        await command.run(interaction);
    }
    catch (error) {
        let args = "";

        for (const argument of interaction.options.data) {
            args += ` ${argument.name}:${argument.value}`;
        }

        functions.error(`An error occured when attempting to run "/${interaction.commandName}${args}":`)
        console.error(error);

        await interaction.reply({
            content: "An error occured while running this command!",
            ephemeral: true
        });
    }
});
