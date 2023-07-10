const {
  CommandInteraction,
  EmbedBuilder,
  ModalSubmitInteraction,
  PermissionsBitField,
  TextInputBuilder
  
} = require("discord.js");
const DB = require("../../Structures/Models/Info");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "setupmodal") {
      const channel = interaction.channel;
      const guild = interaction.guild;

      const invite = await channel.createInvite({
        unique: true,
        maxAge: 0,
        maxUses: 0,
      });

      const Channel = interaction.fields.getTextInputValue("channelinput")
      const Description = interaction.fields.getTextInputValue("descriptioninput")

      const Setup = new DB({
        GuildID: guild.id,
        ChannelID: Channel,
        Description: Description,
        Invitation: invite,
      });

      await Setup.save();

      const Embed = new EmbedBuilder()
        .setTitle("Setup Has Been Completed")
        .setDescription("Your Server is ready to be Bumped!");

      const Embed2 = new EmbedBuilder()
        .setTitle("Your Ad Preview")
        .setDescription(Description);

      interaction.reply({ embeds: [Embed, Embed2] });
    }
  },
};
