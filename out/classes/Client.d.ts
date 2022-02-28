import { Consola } from "consola";
import { Client, Collection, EmbedFooterData, IntentsString as Intents } from "discord.js";
import { Command } from "./Types";
import Util from "./Util";
declare type ClientOptions = {
    token: string;
    prefix: string;
    intents: Intents[];
    eventPath: string;
    commandPath: string;
    UtilConfig: {
        successColor: number | null;
        errorColor: number | null;
        primaryColor: number | null;
        footer: EmbedFooterData;
    };
};
export declare class CoreClient extends Client {
    private PrivateOptions;
    logger: Consola;
    util: Util;
    commands: Collection<string, Command>;
    constructor(options: ClientOptions);
    start(): Promise<void>;
}
export {};
