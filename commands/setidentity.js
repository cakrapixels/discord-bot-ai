import { PermissionsBitField } from "discord.js";

let currentIdentityRef;

export function setIdentityRef(ref) {
  currentIdentityRef = ref;
}

export default {
  data: {
    name: "setidentity",
    description: "Ubah identitas AI (Admin only)",
    options: [
      {
        name: "text",
        description: "Identitas baru untuk AI",
        type: 3, // STRING
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
        flags: 64, // ephemeral
      });
    }

    const newIdentity = interaction.options.getString("text");
    currentIdentityRef.value = newIdentity;

    await interaction.reply({
      content: `✅ Identitas AI berhasil diubah!\n\n🆕 Identitas sekarang:\n${currentIdentityRef.value}`,
      flags: 64, // ephemeral
    });

    console.log(`🔄 Identitas AI diubah menjadi: ${currentIdentityRef.value}`);
  },
};
