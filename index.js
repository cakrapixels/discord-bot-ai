import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  ActivityType,
  Collection,
} from "discord.js";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Command refs
import { setIdentityRef as setBotInfoIdentity } from "./commands/botinfo.js";
import { setIdentityRef as setIdentityIdentity } from "./commands/setidentity.js";
import { setChatChannelRef } from "./commands/setchat.js";

// ===== Ambil ENV =====
const {
  DISCORD_TOKEN,
  GEMINI_API_KEY,
  DISCORD_CHANNEL_ID,
  GEMINI_MODEL = "gemini-2.5-flash",
  GEMINI_IDENTITY = "Saya adalah NexaNation AI.",
  BOT_STATUS = "idle",
} = process.env;

// ===== Variabel runtime =====
let currentIdentity = { value: GEMINI_IDENTITY };
let currentChatChannel = { value: DISCORD_CHANNEL_ID };

// Set referensi ke command
setBotInfoIdentity(currentIdentity);
setIdentityIdentity(currentIdentity);
setChatChannelRef(currentChatChannel);

// ===== Init Gemini =====
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ===== Init Discord =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// ===== Load commands =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const { default: command } = await import(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// ===== Presence bergantian =====
function setDynamicPresence() {
  let toggle = 0;

  setInterval(() => {
    const totalMembers = client.guilds.cache.reduce(
      (acc, g) => acc + g.memberCount,
      0
    );
    const totalServers = client.guilds.cache.size;

    const activity =
      toggle === 0
        ? { name: `${totalMembers} members • ${totalServers} servers`, type: ActivityType.Watching }
        : { name: `NexaNation AI ✨`, type: ActivityType.Playing };

    client.user.setPresence({
      status: BOT_STATUS,
      activities: [activity],
    });

    toggle = (toggle + 1) % 2;
  }, 15000);
}

// ===== Saat bot siap =====
client.once("clientReady", async () => {
  console.log(`✅ Bot login sebagai ${client.user.tag}`);
  console.log(`📌 Channel aktif: ${currentChatChannel.value}`);
  console.log(`🤖 Identitas awal: ${currentIdentity.value}`);

  setDynamicPresence();

  // Daftarkan slash commands
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands.map((cmd) => cmd.data),
    });
    console.log("✅ Slash commands berhasil didaftarkan.");
  } catch (err) {
    console.error("❌ Gagal daftar slash commands:", err);
  }
});

// ===== Listener slash command =====
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error("❌ Error saat eksekusi command:", err);
    await interaction.reply({
      content: "⚠️ Terjadi error saat menjalankan command.",
      flags: 64, // ephemeral
    });
  }
});

// ===== Listener chat message =====
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== currentChatChannel.value) return;

    const userPrompt = message.content.trim();
    if (!userPrompt) return;

    await message.channel.sendTyping();

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: `${currentIdentity.value}\n\nUser: ${userPrompt}` }],
        },
      ],
    });

    const text =
      response?.text ||
      (response?.candidates &&
        response.candidates[0]?.content?.[0]?.text) ||
      "⚠️ Maaf, tidak ada respons dari model.";

    const output =
      text.length > 1900
        ? text.slice(0, 1900) + "\n\n(Respons terpotong karena panjang.)"
        : text;

    await message.reply(output);
  } catch (err) {
    console.error("❌ Error Gemini:", err);
    await message.reply("Terjadi error saat memanggil AI.");
  }
});

// ===== Login bot =====
client.login(DISCORD_TOKEN).catch((err) => {
  console.error("❌ Gagal login ke Discord. Cek DISCORD_TOKEN di env!");
  console.error(err);
  process.exit(1);
});
