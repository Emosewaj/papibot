const { CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const functions = require("../functions");

const REPLIES_POSITIVE = [
    "Outlook good!",
    "Most likely.",
    "As I see it, yes.",
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Signs point to yes.",
    "Yes, definitely.",
    "Yes.",
    "You may rely on it."
];

const REPLIES_NEGATIVE = [
    "Outlook not so good...",
    "Don't count on it.",
    "My reply is no.",
    "Very doubtful.",
    "My sources say no."
];

const REPLIES_INCONCLUSIVE = [
    "Reply hazy, try again...",
    "Concentrate and ask again.",
    "Cannot predict now.",
    "Better not tell you now.",
    "Ask again later.",
];

module.exports = {
    /**
     * @param {CommandInteraction} interaction
     */
    async run(interaction) {
        let reply = "";

        let text = interaction.options.getString("text");
        if (text != null) {
            reply += `**Question:** ${text}\n`;
        }

        let result = functions.randomInt(100);
        let resultText;

        if (result < 10) {
            resultText = REPLIES_INCONCLUSIVE[functions.randomInt(REPLIES_INCONCLUSIVE.length)];
        }
        else if (result >= 10 && result < 55) {
            resultText = REPLIES_POSITIVE[functions.randomInt(REPLIES_POSITIVE.length)];
        }
        else {
            resultText = REPLIES_NEGATIVE[functions.randomInt(REPLIES_NEGATIVE.length)];
        }

        reply += `**Answer:** ${resultText}`;

        await interaction.reply(reply);
    },

    help: {
        category: "general",
        shortDesc: "Let the magic 8ball decide your fate",
        longDesc: "Let a magic 8ball randomly select from a pool of answers to your Yes/No questions.",
    },

    getCommand() {
        return new SlashCommandBuilder()
            .setName("8ball")
            .setDescription("Let the magic 8ball decide your fate")
            .addStringOption(
                option => option.setName("text")
                .setDescription("Optional flavour text")
                .setRequired(false)
            );
    }
}
