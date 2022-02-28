"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreClient = void 0;
const consola_1 = __importDefault(require("consola"));
const discord_js_1 = require("discord.js");
const glob_1 = __importDefault(require("glob"));
const logger = consola_1.default;
process.on("unhandledRejection", err => {
    return logger.error(err);
});
process.on("uncaughtException", err => {
    return logger.error(err);
});
class CoreClient extends discord_js_1.Client {
    constructor(options) {
        super({
            intents: options.intents
        });
        this.logger = consola_1.default;
        this.commands = new discord_js_1.Collection();
        this.PrivateOptions = options;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventFiles = glob_1.default.sync(this.PrivateOptions.eventPath + "/**/*{.ts,.js}");
            eventFiles.map(value => {
                var _a;
                const file = require(value);
                const event = (_a = new file()) !== null && _a !== void 0 ? _a : new file().default;
                if (event) {
                    this.on(event.name, event.run.bind(null, this));
                }
            });
            this.on("messageCreate", (message) => {
                if (!message.guild || !message.content.startsWith(this.PrivateOptions.prefix))
                    return;
                const args = message.content.substr(this.PrivateOptions.prefix.length).split(" ");
                const shiftedArgs = args.shift();
                if (!shiftedArgs)
                    return;
                const command = this.commands.get(shiftedArgs.toLowerCase());
                if (!message.member)
                    return;
                if (!command || !command.guilds.includes(message.guild.id))
                    return;
                if (command.permissions && command.permissions.length > 0 && !message.member.roles.cache.some(r => command.permissions.includes(r.id))) {
                    return;
                }
                return command.run(this, message.channel, message.member, message, args);
            });
            const commandFiles = glob_1.default.sync(this.PrivateOptions.commandPath + "/**/*{.ts,.js}");
            commandFiles.map(value => {
                var _a;
                const file = require(value);
                const command = (_a = new file()) !== null && _a !== void 0 ? _a : new file().default;
                if (command) {
                    this.commands.set(command.name, command);
                }
            });
            yield this.login(this.PrivateOptions.token);
        });
    }
}
exports.CoreClient = CoreClient;
//# sourceMappingURL=Client.js.map