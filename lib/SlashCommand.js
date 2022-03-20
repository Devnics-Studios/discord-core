"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    category;
    name;
    description;
    enabled = true;
    guilds;
    options;
    permissions = [];
    raw = null;
    constructor(category, name, description, options, guilds, permissions) {
        this.name = name;
        this.description = description;
        this.guilds = guilds;
        this.permissions = permissions;
        this.category = category;
        this.options = options;
        this.raw = {
            name: name,
            description: description,
            options: options,
            defaultPermission: permissions.length > 0 ? false : true,
            type: "CHAT_INPUT"
        };
    }
}
exports.default = Command;
