import { ApplyOptions } from "@sapphire/decorators";
import {
  ChatInputCommandDeniedPayload,
  Events,
  Listener,
  ListenerOptions,
  UserError,
} from "@sapphire/framework";
import { MessageEmbed } from "discord.js";
// @ts-ignore
import { version } from "../../../package.json";

@ApplyOptions<ListenerOptions>({
  event: Events.ChatInputCommandDenied,
})
export default class extends Listener {
  async run(_error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
    const embed = new MessageEmbed()
      .setTitle("Command Denied!")
      .setDescription(`${_error.message}`)
      .setColor("RED")
      .setFooter({ text: `ReconOS v${version}` });

    interaction.reply({ embeds: [embed] });
  }
}
