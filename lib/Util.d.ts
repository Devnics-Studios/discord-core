import { EmbedFooterData, Guild, GuildMember, Message, MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";
export default class Util {
    color: string;
    footer: EmbedFooterData;
    constructor(color: any, footer: any);
    generateEmbed(options: MessageEmbedOptions): MessageEmbed;
    getChannel(guild: Guild, channelRef: string): Promise<TextChannel>;
    getMessage(channel: TextChannel, msgId: string): Promise<Message<boolean>>;
    getMember(guild: Guild, memberRef: string): Promise<GuildMember>;
}
