import { Intents } from "discord.js";
import { Client } from "../../src";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static async start() {
    this._client = new Client({
      classes: [
        `${__dirname}/discords/*.ts`, // glob string to load the classes
        `${__dirname}/discords/*.js`, // If you compile your bot, the file extension will be .js
      ],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      // slashGuilds: [YOUR_GUILD_ID],
      requiredByDefault: true,
    });

    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    await this._client.login("YOUR_TOKEN");

    this._client.once("ready", async () => {
      await this._client.initSlashes();
    });

    this._client.on("interactionCreate", (interaction) => {
      this._client.executeInteraction(interaction);
    });
  }
}

Main.start();
