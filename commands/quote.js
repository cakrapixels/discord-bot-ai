import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "quote",
    description: "📜 Dapatkan quote inspiratif/random",
  },
  async execute(interaction) {
    await interaction.deferReply();

    try {
      // ==== Coba API ZenQuotes ====
      let quote, author;
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        quote = data[0]?.q;
        author = data[0]?.a;
      } catch (err) {
        console.warn("⚠️ ZenQuotes gagal, coba fallback ke AdviceSlip:", err);
      }

      // ==== Fallback ke AdviceSlip kalau ZenQuotes gagal ====
      if (!quote) {
        try {
          const res = await fetch("https://api.adviceslip.com/advice");
          const data = await res.json();
          quote = data.slip?.advice;
          author = "AdviceSlip";
        } catch (err) {
          console.warn("⚠️ AdviceSlip juga gagal:", err);
        }
      }

      // ==== Kalau semua gagal ====
      if (!quote) {
        await interaction.editReply("⚠️ Gagal mengambil quote dari API manapun. Coba lagi nanti!");
        return;
      }

      // ==== Buat embed ====
      const embed = new EmbedBuilder()
        .setColor("#FFD700")
        .setTitle("📜 Quote Inspiratif")
        .setDescription(`"${quote}"\n— **${author || "Unknown"}**`)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error("❌ Error di command quote:", err);
      await interaction.editReply("⚠️ Terjadi error saat mengambil quote.");
    }
  },
};
