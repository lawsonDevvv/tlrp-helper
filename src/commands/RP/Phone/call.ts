import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";

export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Banana phone.")
      .addStringOption((o) =>
        o
          .setName("phone_number")
          .setDescription("Who the hell do you want to call???")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  chatInputRun(interaction: CommandInteraction) {
    interaction.reply("This command isn't done. Don't @ me.");
  }
}
