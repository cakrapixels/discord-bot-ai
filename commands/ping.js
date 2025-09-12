import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "ping",
    description: "🏓 Tes respon bot (latency)",
  },
  async execute(interaction) {
    const ping = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor(ping < 100 ? "#00FF00" : ping < 250 ? "#FFA500" : "#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`**Latency saat ini:** \`${ping}ms\``)
      .setFooter({ text: "NexaNation AI • Ping Monitor" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 }); // ephemeral
  },
};
