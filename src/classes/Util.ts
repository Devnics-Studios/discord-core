import { EmbedFooterData, Guild, GuildMember, MessageEmbed, MessageEmbedOptions, NewsChannel, TextChannel } from "discord.js";

type Config = {
    successColor: number | null;
    errorColor: number | null;
    primaryColor: number | null;
    footer: EmbedFooterData;
}

export default class Util {

    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public generateEmbed(type: "SUCCESS" | "ERROR" | "REGULAR", options: MessageEmbedOptions) {
        const embed = new MessageEmbed(options);
        embed.color = type == "SUCCESS" ? 
            this.config.successColor : type == "ERROR" ?
            this.config.errorColor : this.config.primaryColor;
        embed.footer = this.config.footer;
        return embed;
    }

    public getChannel(guild: Guild, channelReference: string) {
        return new Promise<TextChannel | NewsChannel | null>((resolve, reject) => {
            // its channelmanager.fetch lol
            guild.channels.fetch(channelReference).then(channel => {
                if (!channel) return resolve(null);
                if (channel instanceof TextChannel || channel instanceof NewsChannel) {
                    return resolve(channel);
                } else resolve(null)
            }).catch(() => resolve(null))
        })
    }
    
    public getMember(guild: Guild, memberReference: string) {
        return new Promise<GuildMember | null>((resolve, reject) => {
            guild.members.fetch(memberReference).then(member => {
                if (!member) return resolve(null);
                if (member instanceof GuildMember) {
                    return resolve(member);
                } else resolve(null)
            }).catch(() => resolve(null))
        })
    }

}