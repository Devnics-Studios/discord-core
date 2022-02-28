"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Util {
    constructor(config) {
        this.config = config;
    }
    generateEmbed(type, options) {
        const embed = new discord_js_1.MessageEmbed(options);
        embed.color = type == "SUCCESS" ?
            this.config.successColor : type == "ERROR" ?
            this.config.errorColor : this.config.primaryColor;
        embed.footer = this.config.footer;
        return embed;
    }
    getChannel(guild, channelReference) {
        return new Promise((resolve, reject) => {
            // its channelmanager.fetch lol
            guild.channels.fetch(channelReference).then(channel => {
                if (!channel)
                    return resolve(null);
                if (channel instanceof discord_js_1.TextChannel || channel instanceof discord_js_1.NewsChannel) {
                    return resolve(channel);
                }
                else
                    resolve(null);
            }).catch(() => resolve(null));
        });
    }
    getMember(guild, memberReference) {
        return new Promise((resolve, reject) => {
            guild.members.fetch(memberReference).then(member => {
                if (!member)
                    return resolve(null);
                if (member instanceof discord_js_1.GuildMember) {
                    return resolve(member);
                }
                else
                    resolve(null);
            }).catch(() => resolve(null));
        });
    }
}
exports.default = Util;
//# sourceMappingURL=Util.js.map