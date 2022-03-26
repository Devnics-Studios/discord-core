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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = exports.loadEvents = void 0;
const glob_1 = require("glob");
async function loadEvents(client, path) {
    const files = glob_1.glob.sync(path + "/**/*{.ts,.js}");
    client.logger.info(`Loading Events - ${files.length} events found.`);
    for (const file of files) {
        const eventFile = await (await Promise.resolve().then(() => __importStar(require(file)))).default;
        const event = new eventFile();
        client.on(event.name, event.run.bind(null, client));
    }
    client.logger.success(`Finished Loading Events - ${files.length}/${files.length}.`);
}
exports.loadEvents = loadEvents;
async function loadCommands(client, path) {
    const files = glob_1.glob.sync(path + "/**/*{.ts,.js}");
    client.logger.info(`Loading Commands - ${files.length} commands found.`);
    for (const file of files) {
        const commandFile = await (await Promise.resolve().then(() => __importStar(require(file)))).default;
        const command = new commandFile();
        client.commands.set(command.name, command);
    }
    client.logger.success(`Finished Loading Commands - ${files.length}/${files.length}.`);
}
exports.loadCommands = loadCommands;
