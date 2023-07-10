const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const DB = require("../../Structures/Models/Info");
const moment = require("moment");
const { trusted } = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("preview")
    .setDescription("Get a preview of the server's advertisement!")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const serverCreatedTimestamp = interaction.guild.createdTimestamp;
    const serverCreatedAgo = moment(serverCreatedTimestamp).fromNow();
    const info = await DB.findOne({ GuildID: interaction.guildId });
    const Embed = new EmbedBuilder()
      .setTitle(interaction.guild.name)
      .setDescription(info.Description)
      .addFields(
        {
          name: "Server Owner",
          value: `<@${interaction.guild.ownerId}> - ${interaction.guild.ownerId}`,
        },
        {
          name: "Server Created At",
          value: serverCreatedAgo,
          inline: true,
        }
      )
      .setFooter({
        text: `Bumped By ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    const Component = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`Join ${interaction.guild.name}`)
        .setStyle(ButtonStyle.Link)
        .setURL(info.Invitation),
    );
    interaction.reply({
      content: "**Preview**",
      embeds: [Embed],
      components: [Component],
    });
  },
};
