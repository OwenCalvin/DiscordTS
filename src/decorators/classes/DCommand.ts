import { ApplicationCommandPermissionData } from "discord.js";
import { Client } from "../..";
import { CommandMessage } from "../../types/public/CommandMessage";
import { DCommandOption } from "./DCommandOption";
import { Method } from "./Method";

export class DCommand extends Method {
  private _description!: string;
  private _name!: string;
  private _defaultPermission!: boolean;
  private _directMessage!: boolean;
  private _argSplitter!: string;
  private _options: DCommandOption[] = [];
  private _permissions: ApplicationCommandPermissionData[] = [];
  private _guilds!: string[];
  private _botIds!: string[];

  get botIds() {
    return this._botIds;
  }
  set botIds(value) {
    this._botIds = value;
  }

  get permissions() {
    return this._permissions;
  }
  set permissions(value) {
    this._permissions = value;
  }

  get guilds() {
    return this._guilds;
  }
  set guilds(value) {
    this._guilds = value;
  }

  get argSplitter() {
    return this._argSplitter;
  }
  set argSplitter(value) {
    this._argSplitter = value;
  }

  get directMessage() {
    return this._directMessage;
  }
  set directMessage(value) {
    this._directMessage = value;
  }

  get defaultPermission() {
    return this._defaultPermission;
  }
  set defaultPermission(value) {
    this._defaultPermission = value;
  }

  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get description() {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get options() {
    return this._options;
  }
  set options(value: DCommandOption[]) {
    this._options = value;
  }

  protected constructor() {
    super();
  }

  static create(
    name: string,
    description?: string,
    argSplitter?: string,
    directMessage?: boolean,
    defaultPermission?: boolean,
    guilds?: string[],
    botIds?: string[]
  ) {
    const cmd = new DCommand();

    cmd.name = name.toLowerCase();
    cmd.description = description || cmd.name;
    cmd.directMessage = directMessage ?? true;
    cmd.defaultPermission = defaultPermission ?? true;
    cmd.argSplitter = argSplitter ?? " ";
    cmd.guilds = guilds || Client.slashGuilds;
    cmd.botIds = botIds || [];

    return cmd;
  }

  parseParams(message: CommandMessage) {
    if (!this.options.length) return [];
    const args = message.command.argString.split(this.argSplitter);

    return this.options
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
      .map((op, index) =>
        !args?.[index]?.length
          ? undefined
          : op.type === "boolean"
          ? Boolean(args[index])
          : op.type === "number"
          ? Number(args[index])
          : args[index]
      );
  }
}
