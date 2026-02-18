# 𝄟⃝💞 Current Song → Telegram Bio | [Ukraine version](./readme.ua.md)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/femboyjs)
[![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white)](https://open.spotify.com/user/phkgo2oahrxcdb3p1u88f79oq?si=935a96da3c964540)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/fxhxyz4/current-song/main)
![GitHub top language](https://img.shields.io/github/languages/top/fxhxyz4/current-song)
![GitHub Issues](https://img.shields.io/github/issues/fxhxyz4/current-song)
![GitHub License](https://img.shields.io/badge/license-MIT-blue)



_Automatically updates your Telegram bio with your currently playing Spotify track._

Format:
```📀 Track — Artist1, Artist2```

---


## 🚀 What This Project Does

- Fetches your currently playing track from Spotify
- Formats a clean bio string (max 140 characters - telegram restriction)
- Updates your Telegram bio using MTProto ([GramJS](https://github.com/gram-js/gramjs))
- Works with a regular Telegram user account (not a bot)

---

## 📦 Installation

```bash
git clone https://github.com/fxhxyz4/current-song.git
cd ./current-song

npm install
```

---

## 🔐 Environment Variables (.env)

Rename `.env.example` to `.env` file and fill out:

```
DEBUG=true

TELEGRAM_ID=
TELEGRAM_HASH=

SPOTIFY_ID=
SPOTIFY_SECRET=
REDIRECT_URI=
REFRESH_TOKEN=
```

---

## 📁 Important Files

### telegram.session

- Located in the project root
- Automatically created after the first successful login
- Stores your Telegram session
- Prevents repeated login requests
- DO NOT commit this file

After first login you will see:

```
TG_SESSION=xxxxxxxxxxxxx
```

Copy this value into your `.env` file to avoid re-authentication.

---

### 🎧 Spotify refresh token

Used once to obtain your SPOTIFY_REFRESH_TOKEN.

Steps:

1. Run in project root `node ./src/utils/getRefreshToken.js`
2. Open the generated Spotify authorization URL
3. Paste the returned `code`
4. Receive your `refresh_token`

After that, save it in `.env`:

```
REFRESH_TOKEN=...
```

This file is only required for initial setup.

---

## ▶ Run production or development mode

```bash
npm run deploy # production

npm run dev # development
```

---

## ⚠️ Security

Add to `.gitignore`:

```
.env
telegram.session
```

---

## ©️ License: [MIT License](./license.md)
