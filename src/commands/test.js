const { CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    /**
     * @param {CommandInteraction} interaction
     */
    async run(interaction) {
        await interaction.reply("Hello World!");
    },

    help: {
        category: "",
        shortDesc: "",
        longDesc: "",
    },

    getCommand() {
        return new SlashCommandBuilder()
            .setName("test")
            .setDescription("Test")
    }
}
