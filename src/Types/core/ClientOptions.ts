import { ClientOptions as DiscordJSClientOptions } from "discord.js";

export interface ClientOptions extends DiscordJSClientOptions {
  /**
   * Do not log anything in the console
   */
  silent?: boolean;

  /**
   * "first" injecte the params of a @On event as an array in the first argument
   * "spread" injects the params using the spread operator
   */
  payloadInjection?: "spread" | "first";
}