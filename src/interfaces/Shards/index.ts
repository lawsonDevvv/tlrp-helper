import type { Client } from "discord-hybrid-sharding";

declare module "@sapphire/pieces" {
  interface Container {
    clusters: Client;
  }
}
