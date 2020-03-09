import {
  DiscordEvent,
  IInstance
} from ".";

export interface IOn {
  event: DiscordEvent | string;
  method: (...params: any[]) => void;
  linkedInstance?: IInstance;
  restriction?: [Function, string],
  once: boolean;
}
