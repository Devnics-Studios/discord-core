import { Consola } from "consola";
import { Client, Collection, IntentsString as Intents } from "discord.js";
import { Command } from "./Types";
declare type ClientOptions = {
    token: string;
    prefix: string;
    intents: Intents[];
    eventPath: string;
    commandPath: string;
};
export declare class CoreClient extends Client {
    private PrivateOptions;
    logger: Consola;
    commands: Collection<string, Command>;
    constructor(options: ClientOptions);
    start(): Promise<void>;
}
export {};
