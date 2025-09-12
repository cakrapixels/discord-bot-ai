import { EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "userinfo",
    description: "ℹ️ Lihat info user Discord",
    options: [
      {
        name: "user",
        description: "Pilih user (opsional)",
        type: 6, // USER
        required: false,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle(`ℹ️ Info User: ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "Username", value: user.tag, inline: true },
        { name: "ID", value: user.id, inline: true },
        {
          name: "Join Server",
          value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : "Tidak diketahui",
          inline: true,
        },
        {
          name: "Akun dibuat",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
