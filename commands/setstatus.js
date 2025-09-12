import { PermissionsBitField, ActivityType } from "discord.js";

export default {
  data: {
    name: "setstatus",
    description: "Ubah status dan aktivitas bot (Admin only)",
    options: [
      {
        name: "status",
        description: "Pilih status bot",
        type: 3, // STRING
        required: true,
        choices: [
          { name: "Online", value: "online" },
          { name: "Idle", value: "idle" },
          { name: "Do Not Disturb", value: "dnd" },
          { name: "Invisible", value: "invisible" },
        ],
      },
      {
        name: "activity",
        description: "Teks aktivitas bot (opsional)",
        type: 3, // STRING
        required: false,
      },
      {
        name: "type",
        description: "Jenis aktivitas",
        type: 3, // STRING
        required: false,
        choices: [
          { name: "Playing", value: "Playing" },
          { name: "Watching", value: "Watching" },
          { name: "Listening", value: "Listening" },
          { name: "Competing", value: "Competing" },
        ],
      },
    ],
  },

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content: "❌ Kamu harus Admin untuk menggunakan command ini!",
        ephemeral: true,
      });
    }

    const status = interaction.options.getString("status");
    const activity = interaction.options.getString("activity");
    const type = interaction.options.getString("type") || "Playing";

    let activityObj = [];
    if (activity) {
      activityObj = [
        {
          name: activity,
          type: ActivityType[type],
        },
      ];
    }

    await interaction.client.user.setPresence({
      status: status,
      activities: activityObj,
    });

    await interaction.reply(
      `✅ Status bot berhasil diubah!\n\n` +
        `📌 Status: **${status}**\n` +
        (activity ? `🎮 Activity: **${type} ${activity}**` : "")
    );
  },
};
