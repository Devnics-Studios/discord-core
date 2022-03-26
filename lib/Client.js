"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const consola_1 = __importDefault(require("consola"));
const Load_1 = require("./Load");
const Command_1 = __importDefault(require("./Command"));
const Util_1 = __importDefault(require("./Util"));
class Client extends discord_js_1.default.Client {
    logger = consola_1.default;
    commands = new discord_js_1.Collection();
    util;
    opt;
    constructor(options) {
        super({
            intents: options.intents,
            partials: options.partials ?? []
        });
        this.opt = options;
        this.util = new Util_1.default(this.opt.color, this.opt.footer);
    }
    async start() {
        await Load_1.loadEvents(this, this.opt.paths.events);
        await Load_1.loadCommands(this, this.opt.paths.commands);
        await console.log();
        this.on('messageCreate', message => {
            if (message.author.bot)
                return;
            if (!message.guild)
                return;
            if (message.content.startsWith(this.opt.prefix)) {
                const command = message.content.slice(this.opt.prefix.length).split(/ +/);
                const name = command.shift()?.toLowerCase() ?? '';
                const cmd = this.commands.get(name);
                if (cmd.permissions.length > 0 && !message.member.roles.cache.some(r => cmd.permissions.includes(r.id)))
                    return;
                if (cmd && cmd.guilds.includes(message.guild.id) && cmd instanceof Command_1.default) {
                    cmd.run(this, message.channel, message.member, message, command);
                }
            }
        });
        this.login(this.opt.token).catch(err => {
            this.logger.error(err.message);
            process.exit();
        });
    }
}
exports.default = Client;
