import { ClientEvents } from "discord.js";
import { Client } from "..";

export default abstract class Event {

    public name: keyof ClientEvents;

    protected constructor(name: keyof ClientEvents) {
        this.name = name;
    }

    public abstract run(client: Client, ...any: any): void;
}