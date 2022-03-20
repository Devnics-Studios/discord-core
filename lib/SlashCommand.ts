import { ApplicationCommandData, ApplicationCommandOptionData, CommandInteraction, GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "..";

export default abstract class Command {

    public category: string;
    public name: string;
    public description: string;
    public enabled: boolean = true;
    public guilds: string[];
    public options: ApplicationCommandOptionData[];
    public permissions: string[] = [];
    public raw: ApplicationCommandData = null;

    protected constructor(category: string, name: string, description: string, options: ApplicationCommandOptionData[], guilds: string[], permissions: string[]) {
        this.name = name;
        this.description = description;
        this.guilds = guilds;
        this.permissions = permissions;
        this.category = category;
        this.options = options;
        this.raw = {
            name: name,
            description: description,
            options: options,
            defaultPermission: permissions.length > 0 ? false : true,
            type: "CHAT_INPUT"
        }
    }

    abstract run(client: Client, channel: TextChannel, member: GuildMember, interaction: CommandInteraction): Promise<void> | void;
}