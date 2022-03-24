import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import type { CommandInteraction, TextChannel } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Purges #in-game-interaction. Restricted to staff.",
  preconditions: ["Staff"],
  chatInputCommand: {
    register: true,
  },
})
export default class extends Command {
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
    registry.registerChatInputCommand(builder);
  }

  async chatInputRun(interaction: CommandInteraction) {
    const channel = interaction.guild?.channels.cache.get(
      "898661401399291914"
    ) as TextChannel;

    const messages = await channel.messages.fetch();

    const deletable = messages.filter((message) => !message.pinned);

    await channel.bulkDelete(deletable);

    await interaction.reply("Done.");
  }
}
