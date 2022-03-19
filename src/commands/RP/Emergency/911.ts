import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions,
  RegisterBehavior,
} from "@sapphire/framework";
import axios from "axios";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  description: "Call 911!",
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((o) =>
        o
          .setName("address")
          .setDescription("The address/place the incident is occuring at.")
          .setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("call_description")
          .setDescription(
            "The information that emergency services will see when they recieve the 911 call."
          )
          .setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("type")
          .setDescription("The type of call.")
          .addChoice("Emergency", "emergency")
          .addChoice("Civil", "civil")
          .setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("caller_name")
          .setDescription(
            'Roleplay name of the caller. If you\'re calling anonymously, just put "[REDACTED]" or something.'
          )
          .setRequired(true)
      );

    registry.registerChatInputCommand(builder, {
      behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    const api = axios.create({
      baseURL: "https://api.sonorancad.com",
    });

    const res = await api.post("/emergency/call_911", {
      id: process.env.COMMUNITY_ID,
      key: process.env.API_KEY,
      type: "CALL_911",
      data: [
        {
          serverId: 1,
          isEmergency:
            interaction.options.getString("type") === "emergency"
              ? true
              : false,
          caller: (interaction.member as GuildMember).nickname,
          location: interaction.options.getString("address"),
          description: interaction.options.getString("call_description"),
        },
      ],
    });

    switch (res.status) {
      case 200:
        const embed = new MessageEmbed()
          .setTitle("New 911!")
          .setDescription(
            `
**Description**: ${interaction.options.getString("call_description")}
**Address**: ${interaction.options.getString("address")}
**Caller**: ${interaction.user}
**Type of Call**: ${
              interaction.options.getString("type") === "emergency"
                ? "Emergency"
                : "Civil"
            }
`
          )
          .setFooter({
            text: `TLRP Helper | v${
              require("../../../../package.json").version as string
            }`,
          });
        interaction.reply({embeds: [embed]});
        break;
      case 400:
        interaction.reply("Error! Contact TLRP staff.");
        break;
      case 429:
        interaction.reply(
          "Server responded with `429: You are being ratelimited`. This probably means we sent too many requests to the API in a short amount of time. Wait a little, then try again."
        );
    }
  }
}
