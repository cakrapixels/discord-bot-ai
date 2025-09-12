import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export default {
  data: {
    name: "weather",
    description: "🌤 Cek cuaca di kota tertentu",
    options: [
      {
        name: "city",
        description: "Nama kota",
        type: 3, // STRING
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const city = interaction.options.getString("city");
    await interaction.deferReply();

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        return await interaction.editReply(`⚠️ Kota "${city}" tidak ditemukan.`);
      }

      const embed = new EmbedBuilder()
        .setColor("#1E90FF")
        .setTitle(`🌤 Cuaca di ${data.name}, ${data.sys.country}`)
        .addFields(
          { name: "Suhu", value: `${data.main.temp}°C`, inline: true },
          { name: "Kelembapan", value: `${data.main.humidity}%`, inline: true },
          { name: "Cuaca", value: data.weather[0].description, inline: true }
        )
        .setFooter({ text: "Data dari OpenWeatherMap" })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error("❌ Error fetch weather:", err);
      await interaction.editReply("⚠️ Terjadi kesalahan saat mengambil data cuaca.");
    }
  },
};
