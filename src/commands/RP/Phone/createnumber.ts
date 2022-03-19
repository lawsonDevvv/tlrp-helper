import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Create a new phone number!")
      .addStringOption((o) =>
        o
          .setName("owner")
          .setDescription("The RP name of the owner of this phone number.")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  chatInputRun(interaction: CommandInteraction) {
    interaction.reply("This command isn't done. Don't @ me.");
  }
}
