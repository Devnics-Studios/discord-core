import { ClientEvents, GuildMember, Message, TextChannel } from "discord.js";
import {CoreClient} from "./Client";

export abstract class Event {

    public name: keyof ClientEvents;

    constructor(name: keyof ClientEvents) {
        this.name = name;
    }

    public abstract run(client: CoreClient, ...args: any): Promise<void>;
}

export abstract class Command {

    public name: string;
    public description: string;
    public usage: string;
    public aliases: string[];
    public category: string;
    public enabled: boolean;
    public guilds: string[];
    public permissions: string[];

    constructor(name: string, description: string, usage: string, aliases: string[], category: string, guilds: string[], permissions: string[]) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.aliases = aliases;
        this.category = category;
        this.enabled = true;
        this.guilds = guilds;
        this.permissions = permissions;
    }

    public abstract run(client: CoreClient, channel: TextChannel, member: GuildMember, message: Message, args: string[]): Promise<void>;
}