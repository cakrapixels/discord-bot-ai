import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "meme",
    description: "🎭 Dapatkan meme random dari internet",
  },
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await fetch("https://meme-api.com/gimme", { timeout: 5000 });
      const data = await res.json();

      if (!data?.url) {
        return await interaction.editReply("⚠️ Gagal ambil meme. Coba lagi!");
      }

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(data.title || "Random Meme")
        .setURL(data.postLink || "")
        .setImage(data.url)
        .setFooter({ text: `👍 ${data.ups || 0} • r/${data.subreddit || "unknown"}` });

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error("❌ Error fetch meme:", err);
      await interaction.editReply("⚠️ Terjadi kesalahan saat ambil meme.");
    }
  },
};
