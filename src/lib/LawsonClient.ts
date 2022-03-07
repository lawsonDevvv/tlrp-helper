import { LogLevel, SapphireClient } from "@sapphire/framework";
import * as Cluster from "discord-hybrid-sharding";

export class LawsonClient extends SapphireClient {
  public async login(token: string) {
    return super.login(token);
  }

  constructor() {
    super({
      intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
      ],

      shards: Cluster.data.SHARD_LIST,
      shardCount: Cluster.data.TOTAL_SHARDS,
      logger: {
        level: LogLevel.Debug,
      },
    });
  }
}
