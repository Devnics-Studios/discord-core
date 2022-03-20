import { Client } from "..";
declare function loadEvents(client: Client, path: string): Promise<void>;
declare function loadCommands(client: Client, path: string, isSlash: boolean): Promise<void>;
export { loadEvents, loadCommands };
