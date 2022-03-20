import Discord, { Collection, EmbedFooterData, GuildMember } from "discord.js";
import consola, { Consola } from "consola";
import { loadEvents, loadCommands } from "./Load";
import Command from "./Command";
import Util from "./Util";
import SlashCommand from "./SlashCommand";

type ClientOptions = {
    token: string;
    prefix?: string;
    intents: Discord.IntentsString[];
    partials?: Discord.PartialTypes[];
    paths: {
        commands: string;
        events: string;
    },
    slash: boolean;
    slash_guilds?: string[];
    color: string,
    footer: EmbedFooterData
}

export default class Client extends Discord.Client {

    public logger: Consola = consola;
    public commands: Collection<string, Command | SlashCommand> = new Collection();
    public util: Util;

    private opt: ClientOptions;

    constructor(options: ClientOptions) {
        super({
            intents: options.intents,
            partials: options.partials ?? []
        })
        this.opt = options;
        this.util = new Util(this.opt.color, this.opt.footer)
    }

    async start() {
        await loadEvents(this, this.opt.paths.events);
        await loadCommands(this, this.opt.paths.commands, this.opt.slash);
        await console.log();
        this.on('messageCreate', message => {
            if (message.author.bot) return;
            if (!message.guild) return;
            if (message.content.startsWith(this.opt.prefix)) {
                const command = message.content.slice(this.opt.prefix.length).split(/ +/);
                const name = command.shift()?.toLowerCase() ?? '';
                const cmd = this.commands.get(name);
                if (cmd.permissions.length > 0 && !message.member.roles.cache.some(r => cmd.permissions.includes(r.id))) return;
                if (cmd && cmd.guilds.includes(message.guild.id) && cmd instanceof Command) {
                    cmd.run(this, message.channel as Discord.TextChannel, message.member, message, command);
                }
            }
        });
        this.on('interactionCreate', interaction => {
            if (!interaction.isCommand()) return;
            const command = this.commands.get(interaction.commandName) as SlashCommand;
            if (!command) return;
            if (command.permissions.length > 0 && !(interaction.member as GuildMember).roles.cache.some(r => command.permissions.includes(r.id))) return;
            command.run(this, interaction.channel as Discord.TextChannel, interaction.member as GuildMember, interaction);
        });
        this.on("ready", () => {
            if (!this.opt.slash) return;
            for (const guildId of this.opt.slash_guilds) {
                const guild = this.guilds.cache.get(guildId);
                if (!guild) continue;
                var commands = [];
                for (const command of this.commands.toJSON().filter(r => r.guilds.includes(guild.id))) {
                    if(!(command instanceof SlashCommand)) continue;
                    commands.push(command.raw);
                }
                guild.commands.set(commands);
            }
        })
        this.login(this.opt.token).catch(err => {
            this.logger.error(err.message);
            process.exit();
        });
    }
}