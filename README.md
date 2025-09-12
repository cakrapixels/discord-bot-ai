# N Chat Bot 🤖

[![Node.js](https://img.shields.io/badge/Node.js-latest-green.svg)](https://nodejs.org/) 
[![License](https://img.shields.io/badge/License-Reserved-red.svg)](#) 
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](#)
[![Discord](https://img.shields.io/badge/Join-Discord-7289DA?logo=discord&logoColor=white)](https://discord.gg/your-server-invite)
[![Last Commit](https://img.shields.io/github/last-commit/username/n-chat-bot)](https://github.com/username/n-chat-bot)

**N Chat Bot** adalah chatbot AI berbasis Discord yang menggunakan **Gemini 2.5 Flash** untuk percakapan cerdas. Bot ini dilengkapi berbagai command interaktif dan AI chat rapi.

---

## 🚀 Fitur Utama

| Command | Deskripsi | Contoh |
|---------|-----------|--------|
| `/setchat` | Mengatur channel untuk AI chat | `/setchat #ai-channel` |
| `/userinfo` | Menampilkan informasi pengguna | `/userinfo @Cakra` |
| `/avatar` | Menampilkan avatar pengguna | `/avatar @Cakra` |
| `/ping` | Mengecek latency bot | `/ping` |
| `/meme` | Mengirim meme acak | `/meme` |
| `/botinfo` | Menampilkan informasi bot | `/botinfo` |
| `/quote` | Mengirim quote inspiratif | `/quote` |
| `/setidentify` | Mengatur identitas AI | `/setidentify Nexa` |
| `/setstatus` | Mengubah status bot | `/setstatus idle` |
| `/uptime` | Menampilkan durasi aktif bot | `/uptime` |
| `/help` | Menampilkan daftar command | `/help` |
| `/weather` | Menampilkan info cuaca | `/weather Jakarta` |

### ✨ Fitur AI Chat
- Mengirim **text box rapi** tanpa tanda `*`.  
- Embed berwarna biru neon (`0x1abcff`) dengan footer default `NexaNation AI ✨`.  
- Teks panjang otomatis dibagi menjadi beberapa embed atau file jika melebihi batas Discord.

**Contoh AI Reply:**

```text
Halo! Ini adalah contoh balasan AI dari N Chat Bot. 😊

```

## 🛠️ Persyaratan

* Node.js **versi terbaru**
* Discord.js **v14+**
* API Key Gemini 2.5 Flash
* API Weather Key

---

## ⚡ Instalasi

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd n-chat-bot
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Konfigurasi Environment

Buat file `.env` di root folder:

```env
# Token Discord
DISCORD_TOKEN=YOUR_BOT_TOKEN

# API Key Gemini
GEMINI_API_KEY=YOUR_GEMINI_API

# Channel tempat bot merespon
DISCORD_CHANNEL_ID=YOUR_DISCORD_CHANEL_ID

# Model Gemini
GEMINI_MODEL=gemini-2.5-flash

# Identitas AI
GEMINI_IDENTITY=YOUR_BOT_IDENTITY.

# Status bot default (online / idle / dnd / invisible)
BOT_STATUS=idle

# API Key OpenWeatherMap (untuk command /weather)
OPENWEATHER_API_KEY=YOUR_WEATHER_API
```

### 4️⃣ Jalankan Bot

```bash
node index.js
```

---

## 🎨 Konfigurasi Opsional

* **Warna Embed**: Biru Neon (`0x1abcff`)
* **Footer**: `NexaNation AI ✨`
* **Text Box**: Default aktif untuk semua AI response

---

## 📄 Lisensi

Hak cipta © 2025 **CakraDev & Lab Nexa Nation**. Semua hak dilindungi.
Distribusi atau penggunaan tanpa izin dilarang.

---

## 💡 Catatan

* Bot menggunakan **queue per channel** agar AI response tidak tumpuk.
* Pastikan API Key Gemini dan Weather valid agar bot berjalan lancar.
* Text panjang otomatis dibagi menjadi beberapa embed atau file jika melebihi batas Discord.

---

## 📸 Screenshot (Placeholder)

| Fitur           | Contoh                                         |
| --------------- | ---------------------------------------------- |
| AI Chat         | ![AI Reply]([Imgur](https://imgur.com/YjGfQ5K))               |
| Command `/meme` | ![Meme Command](assets/meme-command.png)       |
| Weather         | ![Weather Command](assets/weather-command.png) |

> Ganti placeholder screenshot dengan hasil bot sebenarnya agar README lebih interaktif.

```
```
