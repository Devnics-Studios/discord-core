import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "..";
export default abstract class Command {
    category: string;
    name: string;
    description: string;
    usage: string;
    enabled: boolean;
    guilds: string[];
    permissions: string[];
    protected constructor(category: string, name: string, description: string, usage: string, guilds: string[], permissions: string[], enabled?: boolean);
    abstract run(client: Client, channel: TextChannel, member: GuildMember, message: Message, args: string[]): Promise<void>;
}
