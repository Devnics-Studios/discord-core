import { ApplicationCommandData, ApplicationCommandOptionData, GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "..";
export default abstract class Command {
    category: string;
    name: string;
    description: string;
    enabled: boolean;
    guilds: string[];
    options: ApplicationCommandOptionData[];
    permissions: string[];
    raw: ApplicationCommandData;
    protected constructor(category: string, name: string, description: string, options: ApplicationCommandOptionData[], guilds: string[], permissions: string[]);
    abstract run(client: Client, channel: TextChannel, member: GuildMember, message: Message, args: string[]): Promise<void>;
}
