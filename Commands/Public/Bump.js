const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
const DB = require("../../Structures/Models/Info");
const Info = require("../../Structures/Models/Info");
const moment = require("moment");

const cooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bump")
    .setDescription("Bump This Server!")
    .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const guildId = interaction.guildId;
    const cooldownSeconds = 3600; // 1 hour

    if (!cooldowns.has(guildId)) {
      // Execute the command
      DB.find({}, async (err, channels) => {
        if (err) {
          console.error("Error retrieving channels from the database:", err);
          return;
        }

        for (const storedChannel of channels) {
          const channel = client.channels.cache.get(storedChannel.ChannelID);
          if (channel && channel.isTextBased()) {
            const info = await DB.findOne({ GuildID: interaction.guildId });
            const serverCreatedTimestamp = interaction.guild.createdTimestamp;
            const serverCreatedAgo = moment(serverCreatedTimestamp).fromNow();

            const embed = new EmbedBuilder()
              .setTitle(interaction.guild.name)
              .setThumbnail(interaction.guild.iconURL())
              .setDescription(info.Description)
              .addFields(
                {
                  name: "Server Owner",
                  value: interaction.guild.ownerId,
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

            try {
              await channel.send({
                embeds: [embed],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel(`Join ${interaction.guild.name}`)
                      .setStyle(ButtonStyle.Link)
                      .setURL(info.Invitation)
                  ),
                ],
              });
            } catch (error) {
              console.error("Error sending embed to channel:", error);
            }
          }
        }

        interaction.reply({
          embeds: [new EmbedBuilder().setTitle("Server Has Been Bumped!")],
        });

        // Set the command cooldown
        cooldowns.set(guildId, Date.now() + cooldownSeconds * 1000);
        setTimeout(() => cooldowns.delete(guildId), cooldownSeconds * 1000);
      });
    } else {
      // Command is on cooldown
      const cooldownEnd = cooldowns.get(guildId);
      const remainingMinutes = Math.ceil((cooldownEnd - Date.now()) / 60000);
      interaction.reply(
        `Command is on cooldown. Please wait ${remainingMinutes} minutes before using it again.`
      );
    }
  },
};
