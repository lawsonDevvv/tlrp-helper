import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Do something!",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((o) =>
        o
          .setName("action")
          .setDescription("What are you trying to do?!")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder);
  }

  chatInputRun(interaction: CommandInteraction) {
    interaction.reply(
      `*${interaction.user} ${interaction.options.getString("action", true)}*`
    );
  }
}
