"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Util {
    color;
    footer;
    constructor(color, footer) {
        this.color = color;
        this.footer = footer;
    }
    generateEmbed(options) {
        return new discord_js_1.MessageEmbed(options).setColor(this.color).setFooter(this.footer);
    }
    getChannel(guild, channelRef) {
        return new Promise((resolve, reject) => {
            guild.channels.fetch(channelRef).then(channel => {
                if (!(channel instanceof discord_js_1.TextChannel))
                    return resolve(null);
                if (channel) {
                    resolve(channel ?? null);
                }
                else {
                    resolve(null);
                }
            }).catch(() => resolve(null));
        });
    }
    getMessage(channel, msgId) {
        return new Promise((resolve, reject) => {
            channel.messages.fetch(msgId).then(message => {
                if (message) {
                    resolve(message ?? null);
                }
                else {
                    resolve(null);
                }
            }).catch(() => resolve(null));
        });
    }
    getMember(guild, memberRef) {
        return new Promise((resolve, reject) => {
            guild.members.fetch(memberRef).then(member => {
                if (member) {
                    resolve(member ?? null);
                }
                else {
                    resolve(null);
                }
            }).catch(() => resolve(null));
        });
    }
}
exports.default = Util;
