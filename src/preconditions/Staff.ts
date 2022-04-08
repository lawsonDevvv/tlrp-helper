import { Precondition } from "@sapphire/framework";
import type { CommandInteraction, GuildMember } from "discord.js";

export default class extends Precondition {
  chatInputRun(interaction: CommandInteraction) {
    return (interaction.member as GuildMember).roles.cache.has(
      "898661101401673810"
    )
      ? this.ok()
      : this.error({ message: "You need to be staff to run this!" });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    Staff: never;
  }
}
