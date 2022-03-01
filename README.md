# Discord Core Documentation

### TS-Use only.
## Initialising Client & Start
```
import { Client } from "discord-core";

const client = new Client({
    token: "YOUR_TOKEN",
    prefix: "PREFIX",
    intents: [],
    partials?: [],
    paths: {
        commands: "./commands",
        events: "./events"
    }
});

client.start();
```

## Registering Events
#### Create a new file under the events path
```
import { Client, Event } from "discord-core"

export default class Ready extends Event {
    constructor() {
        super("ready");
    }

    public run(client: Client) {
        client.logger.info(`Logged in as ${client.user.tag}!`);
    }
}
```

## Registering Commands
#### Create a new file under the commands path
```
import { TextChannel, GuildMember, Message } from "discord.js";
import Client from "../Client";
import Command from "../Command";

export default class Ping extends Command {
    constructor() {
        super("ping", "Pong!", "ping", ["GUILDS"], ["ROLEIDS"], true);
    }

    async run(client: Client, channel: TextChannel, member: GuildMember, message: Message<boolean>, args: string[]): Promise<void> {
        const ping = Date.now() - message.createdTimestamp;
        channel.send({
            embeds: [client.util.generateEmbed({
                title: "Pong!",
                description: `${ping}ms`,
            })]
        });
    }
}
```

## Utils
#### {Client}.util.{Function}
### Functions include:
- generateEmbed
- getMessage
- getChannel
- getMember

## Logging
#### The core uses the Consola logging package, which provides info debug and success logs.

---
# That's it! Enjoy!