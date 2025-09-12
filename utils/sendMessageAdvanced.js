import { EmbedBuilder, AttachmentBuilder } from "discord.js";

const messageQueue = new Map();

export async function sendMessageAdvanced(
  target,
  text,
  options = { filename: "response.txt", footer: "NexaNation AI ✨", useTextBox: true }
) {
  // Tentukan channel
  const channel = target?.channel ?? target;
  if (!channel || !channel.send) {
    console.error("❌ Target tidak valid untuk mengirim pesan.");
    return;
  }

  // Pastikan text valid
  if (!text || typeof text !== "string") text = "⚠️ AI tidak mengembalikan teks valid.";

  // Hilangkan semua tanda * agar tidak bold/italic
  text = text.replace(/\*/g, "");

  // Tambahkan text box jika useTextBox true
  if (options.useTextBox) text = "```\n" + text + "\n```";

  // Fungsi kirim chunk
  const sendChunk = async (chunk) => {
    try {
      if (chunk.length <= 2000) {
        const embed = new EmbedBuilder()
          .setDescription(chunk)
          .setColor(0x1abcff); // biru neon
        if (options.footer) embed.setFooter({ text: options.footer });
        await channel.send({ embeds: [embed] });
      } else if (chunk.length <= 8000) {
        // Bagi menjadi sub-chunks 2000 karakter
        for (let start = 0; start < chunk.length; start += 2000) {
          const subChunk = chunk.slice(start, start + 2000);
          const embed = new EmbedBuilder()
            .setDescription(subChunk)
            .setColor(0x1abcff); // biru neon
          if (options.footer) embed.setFooter({ text: options.footer });
          await channel.send({ embeds: [embed] });
        }
      } else {
        // Jika terlalu besar, kirim sebagai file
        const buffer = Buffer.from(chunk, "utf-8");
        const attachment = new AttachmentBuilder(buffer, { name: options.filename || "response.txt" });
        await channel.send({ files: [attachment] });
      }
    } catch (err) {
      console.error("❌ Error kirim pesan advanced:", err);
      if (target?.reply) await target.reply("⚠️ Terjadi error saat mengirim pesan.");
    }
  };

  // Queue per channel agar pesan tidak tumpuk
  const queueKey = channel.id;
  if (!messageQueue.has(queueKey)) messageQueue.set(queueKey, Promise.resolve());
  const lastPromise = messageQueue.get(queueKey);
  const newPromise = lastPromise.then(() => sendChunk(text));
  messageQueue.set(queueKey, newPromise);
  await newPromise;
}
