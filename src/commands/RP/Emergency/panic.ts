import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ApplicationCommandRegistry,
  Command,
  RegisterBehavior,
} from "@sapphire/framework";
import axios from "axios";
import { CommandInteraction, MessageEmbed } from "discord.js";

export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(
        "Toggle your PANIC status in CAD. Requires your discord to be linked to your Sonoran."
      )
      .addBooleanOption((o) =>
        o
          .setName("toggle")
          .setDescription("True for panic on. False for panic off.")
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    const api = axios.create({ baseURL: "https://api.sonorancad.com" });

    const res = await api.post("/emergency/unit_panic", {
      id: process.env.COMMUNITY_ID,
      key: process.env.API_KEY,
      type: "UNIT_PANIC",
      data: [
        {
          apiId: interaction.user.id,
          isPanic: interaction.options.getBoolean("toggle"),
        },
      ],
    });

    const firedEmbed = new MessageEmbed()
      .setTitle("Panic Button Pressed")
      .setDescription("***DISTRESS SIGNAL FIRED***");

    const unfiredEmbed = new MessageEmbed()
      .setTitle("Welcome back to the safe zone.")
      .setDescription("Distress signal un-fired. Hope you're safe. :wave:");

    console.log(res.status);
    console.log(res.data);

    if (interaction.options.getBoolean("toggle")) {
      // if theyre turning it on
      interaction.reply({ embeds: [firedEmbed] });
    } else {
      // if theyre turning it off
      interaction.reply({ embeds: [unfiredEmbed] });
    }
  }
}
