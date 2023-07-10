const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  Guild,
  ChannelType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const mongoose = require("mongoose");
const DB = require("../../Structures/Models/Info");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup The Bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const guildId = interaction.guildId;

    // Check if the server setup has already been completed
    const existingSetup = await DB.findOne({ GuildID: guildId });
    if (existingSetup) {
      interaction.reply({
        content: "Server setup has already been completed.",
      });
      return;
    }

    const Modal = new ModalBuilder()
      .setCustomId("setupmodal")
      .setTitle("Setup");

    const IChannel = new TextInputBuilder()
      .setCustomId("channelinput")
      .setLabel("Provide a Channel ID")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const IDes = new TextInputBuilder()
      .setCustomId("descriptioninput")
      .setLabel("Provide your server's advertisement")
      .setMinLength(20)
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(IChannel);
    const secondActionRow = new ActionRowBuilder().addComponents(IDes);

    Modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(Modal);
  },
};
