import Discord, { Collection, EmbedFooterData } from "discord.js";
import { Consola } from "consola";
import Command from "./Command";
import Util from "./Util";
declare type ClientOptions = {
    token: string;
    prefix?: string;
    intents: Discord.IntentsString[];
    partials?: Discord.PartialTypes[];
    paths: {
        commands: string;
        events: string;
    };
    color: string;
    footer: EmbedFooterData;
};
export default class Client extends Discord.Client {
    logger: Consola;
    commands: Collection<string, Command>;
    util: Util;
    private opt;
    constructor(options: ClientOptions);
    start(): Promise<void>;
}
export {};
