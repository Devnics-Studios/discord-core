import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "..";

export default abstract class Command {

    public category: string;
    public name: string;
    public description: string;
    public usage: string;
    public enabled: boolean = true;
    public guilds: string[];
    public permissions: string[] = [];

    protected constructor(category: string, name: string, description: string, usage: string, guilds: string[], permissions: string[], enabled?: boolean) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.guilds = guilds;
        this.permissions = permissions;
        this.enabled = enabled ?? true;
        this.category = category;
    }

    abstract run(client: Client, channel: TextChannel, member: GuildMember, message: Message, args: string[]): Promise<void> | void;
}