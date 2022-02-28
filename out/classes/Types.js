"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.Event = void 0;
class Event {
    constructor(name) {
        this.name = name;
    }
}
exports.Event = Event;
class Command {
    constructor(name, description, usage, aliases, category, guilds, permissions) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.aliases = aliases;
        this.category = category;
        this.enabled = true;
        this.guilds = guilds;
        this.permissions = permissions;
    }
}
exports.Command = Command;
//# sourceMappingURL=Types.js.map