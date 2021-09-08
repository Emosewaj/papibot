// Deploy commands to Discord.js API
const fs = require("fs");
const REST = require('@discordjs/rest').REST;
const Routes = require('discord-api-types/v9').Routes;
const SlashCommandBuilder = require('@discordjs/builders').SlashCommandBuilder;

const config = require("../config.json");

let isDev = process.argv.includes("--dev");


const commands = [];
const commandFiles = fs.readdirSync(__dirname + "/../src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    /** @type {SlashCommandBuilder} */
    const commandData = require(`./../src/commands/${file}`).getCommand();
    commands.push(commandData.toJSON());
}


let clientId = isDev ? config.dev.clientId : config.prod.clientId;
let guildId = isDev ? config.dev.guildId : null;
let token = isDev ? config.dev.token : config.prod.token;

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        console.log(`${commands.length} commands found.`);

        if (isDev) {
            console.log("Deploying commands to dev.");
            await rest.put(Routes.applicationGuildCommands(clientId,
                guildId), {
                body: commands
            });
        }
        else {
            console.log("Deploying commands to prod.");
            await rest.put(Routes.applicationCommands(clientId), {
                body: commands
            });
        }

        console.log("Done");
    }
    catch (error) {
        console.error(error);
    }
})();
