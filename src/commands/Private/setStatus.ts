import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
  RegisterBehavior,
} from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
  description:
    "!! If you're trying to set your CAD status, wrong command !! Set's the bot's status.",
  preconditions: ["OwnerOnly"],
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName("setstatus")
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("status")
          .setDescription("Status to change to.")
          .setRequired(false)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    const status = interaction.options.getString("status");
    await interaction.reply(`Setting status to \`${status}\``);
    this.container.client.user?.setActivity(status as string, {
      type: "PLAYING",
    });
  }
}
