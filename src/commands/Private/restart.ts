import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  preconditions: ["OwnerOnly"],
})
export default abstract class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("restart")
      .setDescription("Restart the bot.")
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("Reason for restarting.")
          .setRequired(false)
      );

    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    const reason = interaction.options.getString("reason");

    const embed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `Restart Incoming!\n\nStated Reason: \`${
          reason ?? "No reason provided"
        }\``
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp(Date.now());

    interaction.reply({ embeds: [embed] });

    const embed2 = new MessageEmbed().setDescription(
      `Hey! Fucker! Yeah, you! I just fucking died. 2 possibilities: restart or error. CHECK YOUR FUCKING PM2 LOGS BITCH.`
    );

    await this.container.client.users.cache
      .get("415278805683404821")
      ?.send({ embeds: [embed2] });
    
    process.exit(0);
  }
}
