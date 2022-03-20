import { glob } from "glob";
import { Client } from "..";
import Command from "./Command";
import Event from "./Event";
import SlashCommand from "./SlashCommand";

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

async function loadCommands(client: Client, path: string, isSlash: boolean) {
    const files = glob.sync(path + "/**/*{.ts,.js}");
    client.logger.info(`Loading Commands - ${files.length} commands found.`);

    if (!isSlash) {
        for (const file of files) {
            const commandFile = await (await import(file)).default;
            const command: Command = new commandFile();
            client.commands.set(command.name, command);
        }
        client.logger.success(`Finished Loading [Regular]:Commands - ${files.length}/${files.length}.`)
    } else {
        for (const file of files) {
            const commandFile = await (await import(file)).default;
            const command: SlashCommand = new commandFile();
            client.commands.set(command.name, command);
        }
        client.logger.success(`Finished Loading [Slash]:Commands - ${files.length}/${files.length}.`)
    }
}

export {loadEvents, loadCommands}