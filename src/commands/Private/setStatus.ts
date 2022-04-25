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
      .addStringOption((o) =>
        o
          .setName("type")
          .setDescription("You already know this Lawson...")
          .addChoice("Watching", "WATCHING")
          .addChoice("Streaming", "STREAMING")
          .addChoice("Playing", "PLAYING")
          .addChoice("Competing", "COMPETING")
          .addChoice("Listening", "LISTENING")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("status")
          .setDescription("Status to change to.")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    const name = interaction.options.getString("status", true);
    const type = interaction.options.getString("type", true);
    await interaction.reply(`Setting status to \`${name}\``);
    /** i ts-ignore'd this because i couldnt be asked to properly set up something, plus pain and suffering.  Cry later.*/
    // @ts-ignore
    this.container.client.user?.setActivity(name, { type });
  }
}
