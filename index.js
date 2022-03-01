"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.Command = exports.Client = void 0;
const Client_1 = __importDefault(require("./lib/Client"));
exports.Client = Client_1.default;
const Command_1 = __importDefault(require("./lib/Command"));
exports.Command = Command_1.default;
const Event_1 = __importDefault(require("./lib/Event"));
exports.Event = Event_1.default;
