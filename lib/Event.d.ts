import { ClientEvents } from "discord.js";
import { Client } from "..";
export default abstract class Event {
    name: keyof ClientEvents;
    protected constructor(name: keyof ClientEvents);
    abstract run(client: Client, ...any: any): void;
}
