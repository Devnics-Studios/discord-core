import { ClientEvents, GuildMember, Message, TextChannel } from "discord.js";
import { CoreClient } from "./Client";
export declare abstract class Event {
    name: keyof ClientEvents;
    constructor(name: keyof ClientEvents);
    abstract run(client: CoreClient, ...args: any): Promise<void>;
}
export declare abstract class Command {
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    category: string;
    enabled: boolean;
    guilds: string[];
    permissions: string[];
    constructor(name: string, description: string, usage: string, aliases: string[], category: string, guilds: string[], permissions: string[]);
    abstract run(client: CoreClient, channel: TextChannel, member: GuildMember, message: Message, args: string[]): Promise<void>;
}
