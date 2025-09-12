import { PermissionsBitField } from "discord.js";

let currentChatChannelRef;

export function setChatChannelRef(ref) {
  currentChatChannelRef = ref;
}

export default {
  data: {
    name: "setchat",
    description: "Set channel tempat AI merespon (Admin only)",
    options: [
      {
        name: "channel",
        description: "Pilih channel",
        type: 7, // CHANNEL
        required: true,
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

    const channel = interaction.options.getChannel("channel");
    currentChatChannelRef.value = channel.id;

    await interaction.reply(
      `✅ Channel AI berhasil diubah!\nChannel sekarang: <#${channel.id}>`
    );
    console.log(`🔄 Channel AI diubah menjadi: ${channel.id}`);
  },
};
