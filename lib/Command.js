"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    category;
    name;
    description;
    usage;
    enabled = true;
    guilds;
    permissions = [];
    constructor(category, name, description, usage, guilds, permissions, enabled) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.guilds = guilds;
        this.permissions = permissions;
        this.enabled = enabled ?? true;
        this.category = category;
    }
}
exports.default = Command;
