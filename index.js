import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const ROLE_ID = process.env.ROLE_ID;
const COOLDOWN = Number(process.env.COOLDOWN_SECONDS) * 1000;

// Keywords / Commands (lowercase)
const TRIGGERS = new Set([
  "m", "mx", "ma", "mg", "mb",
  "w", "wx", "wa", "wg", "wb",
  "h", "hx", "ha", "hg", "hb"
]);

let lastPing = 0;

/**
 * Shared ping function
 */
async function tryPing(channel) {
  const now = Date.now();
  if (now - lastPing < COOLDOWN) return;

  lastPing = now;

  await channel.send({
    content: `<@&${ROLE_ID}>`,
    allowedMentions: { roles: [ROLE_ID] }
  });
}

/**
 * TEXT COMMANDS ($m, $wx, etc.)
 */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.id !== CHANNEL_ID) return;

  const words = msg.content.toLowerCase().split(/\s+/);

  for (const word of words) {
    if (word.startsWith("$")) {
      const cmd = word.slice(1);
      if (TRIGGERS.has(cmd)) {
        await tryPing(msg.channel);
        break;
      }
    }
  }
});

/**
 * SLASH COMMANDS (/m, /wx, etc.)
 */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.channelId !== CHANNEL_ID) return;

  if (TRIGGERS.has(interaction.commandName.toLowerCase())) {
    await tryPing(interaction.channel);
  }
});

client.login(process.env.BOT_TOKEN);
