import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
  RegisterBehavior,
} from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Displays the latency of the bot.",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  chatInputRun(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`> ${this.container.client.ws.ping}ms!`)
      .setFooter({ text: "TLRP Bot | Made by PossiblySebo#0001" });

    interaction.reply({ embeds: [embed] });
  }
}
