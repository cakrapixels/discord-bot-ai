export default {
  data: {
    name: "uptime",
    description: "Lihat sudah berapa lama bot online",
  },
  async execute(interaction) {
    const uptime = Math.floor(process.uptime());
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = uptime % 60;

    await interaction.reply({
      content: `⏱ Uptime: ${h}h ${m}m ${s}s`,
      flags: 64, // ephemeral
    });
  },
};
