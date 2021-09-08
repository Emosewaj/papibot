const path = require("path");
require("./../functions");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const config = require("./../../config.json");

module.exports = {
    /**
     * @param {CommandInteraction} interaction
     */
    async run(interaction) {
        let client = interaction.client;

        await interaction.guild.members.fetch(client.user.id);
        await interaction.guild.roles.fetch();

        let embed = new MessageEmbed()
            .setAuthor("Papi-Bot", client.user.displayAvatarURL)
            .setDescription(`Click [here](${config.inviteUrl}) to invite me to your server!`)
            .addField("Users cached", client.users.cache.size.toLocaleString())
            .addField("Servers cached", client.guilds.cache.size.toLocaleString())
            .addField("D.JS Version", Discord.version)
            .setColor(interaction.guild.me.displayHexColor.replace("000000", "FFFFFF"));

        let uptimeSecs = Math.round(process.uptime());
        let uptimeMins = Math.floor(uptimeSecs / 60);
        uptimeSecs = uptimeSecs % 60;
        let uptimeHrs = Math.floor(uptimeMins / 60);
        uptimeMins = uptimeMins % 60;
        let uptimeDays = Math.floor(uptimeHrs / 24);
        uptimeHrs = uptimeHrs % 24;

        uptimeSecs = uptimeSecs.leftpad("0", 2);
        uptimeMins = uptimeMins.leftpad("0", 2);
        uptimeHrs = uptimeHrs.leftpad("0", 2);
        uptimeDays = uptimeDays.leftpad("0", 2);

        embed.addField("Uptime", `${uptimeDays}:${uptimeHrs}:${uptimeMins}:${uptimeSecs}`);

        await interaction.reply({ embeds: [embed] });
    },

    help: {
        category: "technical",
        shortDesc: "Displays info about Papi-Bot",
        longDesc: "Displays technical information about Papi-Bot.",
    },

    getCommand() {
        let filename = path.basename(__filename);

        return new SlashCommandBuilder()
            .setName(filename.substr(0, filename.length - 3))
            .setDescription(this.help.shortDesc)
    }
}
