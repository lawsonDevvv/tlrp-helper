import { Precondition } from "@sapphire/framework";
import type { CommandInteraction } from "discord.js";
const disallowedResponses = [
  "No.",
  "Nope.",
  "Stop trying.",
  "Lawson only.",
  "Absolutely not.",
  "Please stop trying.",
];

export class UserPrecondition extends Precondition {
  public async chatInputRun(interaction: CommandInteraction) {
    const response = Math.floor(Math.random() * (10 - 0) + 0);

    return interaction.user.id === "415278805683404821"
      ? this.ok()
      : this.error({ message: disallowedResponses[response] });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
