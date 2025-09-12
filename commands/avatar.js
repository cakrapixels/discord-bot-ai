export default {
  data: {
    name: "avatar",
    description: "Lihat avatar kamu atau user lain",
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

    await interaction.reply({
      content: `🖼 Avatar milik **${user.username}**: ${user.displayAvatarURL({
        size: 1024,
        dynamic: true,
      })}`,
      // Jika ingin ephemeral supaya hanya user yang lihat
      // flags: 64
    });
  },
};
