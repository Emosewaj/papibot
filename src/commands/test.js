const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    run() {

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
