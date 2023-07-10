require("dotenv/config");
const { Client, Collection, Partials } = require("discord.js");
const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Reaction,
  ThreadMember,
  User,
} = Partials;
const Util = require("./Utils");
const { BotToken } = process.env;
const { loadEvents } = require("../Handlers/Events");
const { loadCommands } = require("../Handlers/Commands");
const chalk = require("chalk");

class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: [
        Channel,
        GuildMember,
        GuildScheduledEvent,
        Message,
        Reaction,
        ThreadMember,
        User,
      ],
    });
    this.config = require("./config.json");
    this.commands = new Collection();
    this.subCommands = new Collection();
    this.events = new Collection();
    this.components = {
      buttons: new Collection(),
      selectMenus: new Collection(),
      modals: new Collection(),
    };

    this.token = BotToken;
    this.utils = new Util(this);
    global.chalk = chalk;
  }

  async init(token) {
    await loadEvents(this);
    await this.login(BotToken).then(() => {
      console.log(
        chalk.redBright(
          `[CLIENT] - ${this.user.tag} has logged into Discord. `
        )
      );
    });
    await loadCommands(this);
    await this.utils.logger();
  }
}

module.exports = BOT;