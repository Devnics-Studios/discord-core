import consola, { Consola } from "consola";
import { Client, Collection, EmbedFooterData, IntentsString as Intents, TextChannel } from "discord.js";
import glob from "glob";
import { Command, Event } from "./Types";
import Util from "./Util";

type ClientOptions = {
    token: string;
    prefix: string;
    intents: Intents[];
    eventPath: string;
    commandPath: string;
    UtilConfig: {
        successColor: number | null;
        errorColor: number | null;
        primaryColor: number | null;
        footer: EmbedFooterData;
    }
}

const logger = consola;

process.on("unhandledRejection", err => {
    return logger.error(err)
})
process.on("uncaughtException", err => {
    return logger.error(err)
})

export class CoreClient extends Client {
    private PrivateOptions: ClientOptions;

    public logger: Consola = consola;
    public util: Util;
    public commands: Collection<string, Command> = new Collection();

    constructor(options: ClientOptions) {
        super({
            intents: options.intents
        });
        this.PrivateOptions = options;
        this.util = new Util(this.PrivateOptions.UtilConfig)
    }

    public async start(): Promise<void> {
        const eventFiles = glob.sync(this.PrivateOptions.eventPath + "/**/*{.ts,.js}");
        eventFiles.map(value => {
            const file = require(value);
            const event: Event = new file() ?? new file().default;
            if (event) {
                this.on(event.name, event.run.bind(null, this))
            }
        });
        this.on("messageCreate", (message) => {
            if (!message.guild || !message.content.startsWith(this.PrivateOptions.prefix)) return;

            const args = message.content.substr(this.PrivateOptions.prefix.length).split(" ");
            const shiftedArgs = args.shift();
            if(!shiftedArgs) return;

            const command = this.commands.get(shiftedArgs.toLowerCase());
            if (!message.member) return;
            if (!command || !command.guilds.includes(message.guild.id)) return;
            if (command.permissions && command.permissions.length > 0 && !message.member.roles.cache.some(r => command.permissions.includes(r.id))) {
                return;
            }

            return command.run(this, message.channel as TextChannel, message.member, message, args);
        })

        const commandFiles = glob.sync(this.PrivateOptions.commandPath + "/**/*{.ts,.js}");
        commandFiles.map(value => {
            const file = require(value);
            const command: Command = new file() ?? new file().default;
            if (command) {
                this.commands.set(command.name, command)
            }
        })
        await this.login(this.PrivateOptions.token);
    }
}