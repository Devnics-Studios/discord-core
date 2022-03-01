import { EmbedFooterData, Guild, GuildMember, Message, MessageEmbed, MessageEmbedOptions, TextChannel } from "discord.js";

export default class Util {

    public color: string;
    public footer: EmbedFooterData;

    constructor(color, footer) {
        this.color = color;
        this.footer = footer;
    }

    generateEmbed(options: MessageEmbedOptions) {
        return new MessageEmbed(options).setColor(this.color as any).setFooter(this.footer);
    }

    getChannel(guild: Guild, channelRef: string) {
        return new Promise<TextChannel>((resolve, reject) => {
            guild.channels.fetch(channelRef).then(channel => {
                if (!(channel instanceof TextChannel)) return resolve(null);
                if (channel) {
                    resolve(channel ?? null);
                } else {
                    resolve(null)
                }
            }).catch(() => resolve(null))
        })
    }

    getMessage(channel: TextChannel, msgId: string) {
        return new Promise<Message>((resolve, reject) => {
            channel.messages.fetch(msgId).then(message => {
                if (message) {
                    resolve(message ?? null);
                } else {
                    resolve(null);
                }
            }).catch(() => resolve(null))
        })
    }

    getMember(guild: Guild, memberRef: string) {
        return new Promise<GuildMember>((resolve, reject) => {
            guild.members.fetch(memberRef).then(member => {
                if (member) {
                    resolve(member ?? null);
                } else {
                    resolve(null);
                }
            }).catch(() => resolve(null))
        })
    }
}