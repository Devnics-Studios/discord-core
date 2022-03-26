import Discord, { Collection, EmbedFooterData, GuildMember } from "discord.js";
import consola, { Consola } from "consola";
import { loadEvents, loadCommands } from "./Load";
import Command from "./Command";
import Util from "./Util";

type ClientOptions = {
    token: string;
    prefix?: string;
    intents: Discord.IntentsString[];
    partials?: Discord.PartialTypes[];
    paths: {
        commands: string;
        events: string;
    },
    color: string,
    footer: EmbedFooterData
}

export default class Client extends Discord.Client {

    public logger: Consola = consola;
    public commands: Collection<string, Command> = new Collection();
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
        await loadCommands(this, this.opt.paths.commands);
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
        this.login(this.opt.token).catch(err => {
            this.logger.error(err.message);
            process.exit();
        });
    }
}