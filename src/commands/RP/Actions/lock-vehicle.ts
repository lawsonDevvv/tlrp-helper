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
  description: "Lock that car! Keep it safe!",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((o) =>
        o
          .setName("vehicle_description")
          .setDescription("What does the car look like!")
          .setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("plate")
          .setDescription(
            "Let's hear that license plate! If your vehicle doesn't have one, you can always leave this blank."
          )
          .setRequired(false)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite
    });
  }

  chatInputRun(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setTitle("Vehicle Locked!")
      .addField(
        "Vehicle Description",
        `${interaction.options.getString("vehicle_description")}`,
        true
      )
      .addField("\u200b", "\u200b", true)
      .addField(
        "License Plate",
        `${interaction.options.getString("plate") ?? "None Provided"}`,
        true
      )
      .setFooter({ text: "This car cannot be stolen until it is unlocked!" })
      .setTimestamp(Date.now());

    interaction.reply({ embeds: [embed] });
  }
}
