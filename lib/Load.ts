import { glob } from "glob";
import { Client } from "..";
import Command from "./Command";
import Event from "./Event";

async function loadEvents(client: Client, path: string) {
    const files = glob.sync(path + "/**/*{.ts,.js}");
    client.logger.info(`Loading Events - ${files.length} events found.`);

    for (const file of files) {
        const eventFile = await (await import(file)).default;
        const event: Event = new eventFile();
        client.on(event.name, event.run.bind(null, client))
    }
    client.logger.success(`Finished Loading Events - ${files.length}/${files.length}.`)
}

async function loadCommands(client: Client, path: string) {
    const files = glob.sync(path + "/**/*{.ts,.js}");
    client.logger.info(`Loading Commands - ${files.length} commands found.`);

    for (const file of files) {
        const commandFile = await (await import(file)).default;
        const command: Command = new commandFile();
        client.commands.set(command.name, command);
    }
    client.logger.success(`Finished Loading Commands - ${files.length}/${files.length}.`)
}

export {loadEvents, loadCommands}