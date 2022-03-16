import { Precondition } from "@sapphire/framework";
import type { CommandInteraction, GuildMember } from "discord.js";

export default class extends Precondition {
  chatInputRun(interaction: CommandInteraction) {
    return (interaction.member as GuildMember).roles.cache.has(
      "951294985821634601"
    )
      ? // if they have the role, let them proceed
        this.ok()
      : // if they dont have the role, throw an error which will be caught by the "commandDenied.ts" file
        this.error({
          message:
            "You need to be a member of emergency services or a dispatcher to run this command!",
        });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    EmergencyServicesOnly: never;
  }
}
