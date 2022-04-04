import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Sends a link to the CAD.");

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  chatInputRun(interaction: CommandInteraction) {
    const embed = new MessageEmbed().setAuthor({
      name: "Click me.",
      url: "https://cad.thelostrp.net/#/",
    });

    interaction.reply({ embeds: [embed] });
  }
}
