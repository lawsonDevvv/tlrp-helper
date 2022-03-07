import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Set's the bot's status. Lawson only, bitch.",
  preconditions: ["OwnerOnly"],
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("setstatus")
      .setDescription("Set my status!")
      .addStringOption((option) =>
        option
          .setName("status")
          .setDescription("Status to change to.")
          .setRequired(false)
      );

    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    const status = interaction.options.getString("status");
    await interaction.reply(`Setting status to \`${status}\``);
    await this.container.client.user?.setActivity(status as string, {
      type: "PLAYING",
    });
  }
}