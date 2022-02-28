import { EmbedFooterData, Guild, GuildMember, MessageEmbed, MessageEmbedOptions, NewsChannel, TextChannel } from "discord.js";
declare type Config = {
    successColor: number | null;
    errorColor: number | null;
    primaryColor: number | null;
    footer: EmbedFooterData;
};
export default class Util {
    private config;
    constructor(config: Config);
    generateEmbed(type: "SUCCESS" | "ERROR" | "REGULAR", options: MessageEmbedOptions): MessageEmbed;
    getChannel(guild: Guild, channelReference: string): Promise<TextChannel | NewsChannel | null>;
    getMember(guild: Guild, memberReference: string): Promise<GuildMember | null>;
}
export {};
