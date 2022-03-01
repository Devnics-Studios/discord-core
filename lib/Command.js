"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    name;
    description;
    usage;
    enabled = true;
    guilds;
    permissions = [];
    constructor(name, description, usage, guilds, permissions, enabled) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.guilds = guilds;
        this.permissions = permissions;
        this.enabled = enabled ?? true;
    }
}
exports.default = Command;
