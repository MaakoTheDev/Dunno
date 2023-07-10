const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client,
    EmbedBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputStyle,
    TextInputBuilder
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("editad")
        .setDescription("Edit your server advertisement!")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const Modal = new ModalBuilder()
        .setTitle("Edit Your Server Ad")
        .setCustomId("editmodal")

        const EditInput = new TextInputBuilder()
        .setCustomId("editI")
        .setStyle(TextInputStyle.Paragraph)
        .setMinLength(20)
        .setRequired(true)
        .setPlaceholder("Provide a new advertisement for your server")
        .setLabel("New Advertisement")

        const ActionRow1 = new ActionRowBuilder()
        .addComponents(EditInput)

        Modal.addComponents(ActionRow1)
      
        await interaction.showModal(Modal)
    }
};