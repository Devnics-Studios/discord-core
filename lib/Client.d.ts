import Discord, { Collection, EmbedFooterData } from "discord.js";
import { Consola } from "consola";
import Command from "./Command";
import Util from "./Util";
import SlashCommand from "./SlashCommand";
declare type ClientOptions = {
    token: string;
    prefix?: string;
    intents: Discord.IntentsString[];
    partials?: Discord.PartialTypes[];
    paths: {
        commands: string;
        events: string;
    };
    slash: boolean;
    slash_guilds?: string[];
    color: string;
    footer: EmbedFooterData;
};
export default class Client extends Discord.Client {
    logger: Consola;
    commands: Collection<string, Command | SlashCommand>;
    util: Util;
    private opt;
    constructor(options: ClientOptions);
    start(): Promise<void>;
}
export {};
