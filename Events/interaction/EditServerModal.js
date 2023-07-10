const {
  CommandInteraction,
  EmbedBuilder,
  ModalSubmitInteraction,
  PermissionsBitField,
  TextInputBuilder,
} = require("discord.js");
const DB = require("../../Structures/Models/Info");
const Info = require("../../Structures/Models/Info");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {import("../../Structures/bot")} client
   */
  async execute(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "editmodal") {
      const newad = interaction.fields.getTextInputValue("editI");

      const Embed = new EmbedBuilder()
        .setTitle("Your New Ad")
        .setDescription(newad)
        .setFooter({
          text: `Run the command "/preview" to view it in a larger and more detailed manner.`,
          iconURL: client.user.displayAvatarURL(),
        });

      // Update the description in the database
      await DB.findOneAndUpdate({ GuildID: interaction.guildId }, { Description: newad });

      // Handle the updatedAd object as needed
      // ...

      // Send the embed message with the updated description
      await interaction.reply({ embeds: [Embed] });
    }
  },
};
