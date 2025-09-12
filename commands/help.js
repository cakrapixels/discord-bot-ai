import { EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

export default {
  data: {
    name: "help",
    description: "📖 Lihat daftar command yang tersedia",
  },
  async execute(interaction) {
    const commandFiles = fs
      .readdirSync(path.resolve("./commands"))
      .filter((file) => file.endsWith(".js"));

    const fields = [];

    for (const file of commandFiles) {
      const command = (await import(`./${file}`)).default;
      if (command?.data) {
        fields.push({
          name: `/${command.data.name}`,
          value: command.data.description || "Tidak ada deskripsi",
          inline: true,
        });
      }
    }

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("📖 Daftar Command NexaNation AI")
      .setDescription("Berikut adalah semua command yang bisa kamu gunakan:")
      .addFields(fields)
      .setFooter({ text: "NexaNation AI • Powered by Google Gemini 🚀" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 }); // ephemeral
  },
};
