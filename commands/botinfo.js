import { EmbedBuilder } from "discord.js";

let currentIdentityRef;

export function setIdentityRef(ref) {
  currentIdentityRef = ref;
}

export default {
  data: {
    name: "botinfo",
    description: "Info tentang NexaNation AI",
  },
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2) // warna biru Discord
      .setTitle("🤖 NexaNation AI")
      .setDescription("Asisten resmi komunitas **Nexa Nation Community**")
      .addFields(
        {
          name: "🌐 Fokus Bidang",
          value: "Gaming 🎮 • Hosting ☁️ • Software Engineering 💻",
          inline: false,
        },
        {
          name: "🛒 Marketplace",
          value: "Menyediakan berbagai kebutuhan digital",
          inline: false,
        },
        {
          name: "📚 Guru Privat",
          value:
            "Bisa jadi guru privat kamu belajar teknologi, hosting, coding, dan gaming!",
          inline: false,
        },
        {
          name: "⚡ Teknologi",
          value: "Dijalankan dengan **Google Gemini** 🚀",
          inline: false,
        },
        {
          name: "📝 Identitas Aktif",
          value: currentIdentityRef?.value || "Belum diset",
          inline: false,
        }
      )
      .setFooter({ text: "Powered by Nexa Nation Community ✨" })
      .setTimestamp();

    // Jika ingin reply publik
    await interaction.reply({ embeds: [embed] });

    // Jika ingin reply ephemeral (hanya user yang lihat)
    // await interaction.reply({ embeds: [embed], flags: 64 });
  },
};
