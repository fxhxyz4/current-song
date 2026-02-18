# 𝄟⃝💞 Current Song → Telegram Bio | [Eng version](./readme.md)

[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/femboyjs)
[![Spotify](https://img.shields.io/badge/Spotify-1DB954?style=flat&logo=spotify&logoColor=white)](https://open.spotify.com/user/phkgo2oahrxcdb3p1u88f79oq?si=935a96da3c964540)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/fxhxyz4/current-song/main)
![GitHub top language](https://img.shields.io/github/languages/top/fxhxyz4/current-song)
![GitHub Issues](https://img.shields.io/github/issues/fxhxyz4/current-song)
![GitHub License](https://img.shields.io/github/license/fxhxyz4/current-song)

_Автоматично оновлює біо Telegram вашим поточним треком зі Spotify._

Формат:
```📀 Track — Artist1, Artist2```

---

## 🚀 Що робить цей проєкт

- Отримує поточний трек зі Spotify
- Форматує рядок для біо (до 140 символів — обмеження Telegram)
- Оновлює біо Telegram через MTProto ([GramJS](https://github.com/gram-js/gramjs))
- Працює зі звичайним акаунтом Telegram (не ботом)

---

## 📦 Встановлення
```
git clone https://github.com/fxhxyz4/current-song.git
cd ./current-song

npm install
```
---

## 🔐 Змінні середовища (.env)

Перейменуйте `.env.example` на `.env` та заповніть його:
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

## 📁 Важливі файли

### telegram.session

- Знаходиться в корені проєкту
- Створюється автоматично після першого входу
- Зберігає Telegram-сесію
- Дозволяє не проходити авторизацію повторно
- НЕ додавайте цей файл у репозиторій

Після першого входу в консолі з’явиться:

```TG_SESSION=xxxxxxxxxxxxx```

Скопіюйте це значення у `.env`.

---

### 🎧 Отримання Spotify Refresh Token

Використовується один раз для отримання REFRESH_TOKEN.

Кроки:

1. В корні проекту виконайте: ```node ./src/utils/getRefreshToken.js```
2. Перейдіть за згенерованим посиланням авторизації Spotify
3. Вставте отриманий code
4. Отримайте refresh_token

Збережіть його у .env:

```REFRESH_TOKEN=...```

---

## ▶ Запуск
```
npm run deploy   # продакшн
npm run dev      # розробка
```
---

## ⚠️ Безпека

Додайте до ```.gitignore```:
```
.env
telegram.session
```
Ніколи не публікуйте:

- TELEGRAM_HASH
- REFRESH_TOKEN
- telegram.session

---

## ©️ Ліцензія: [MIT License](./license.md)
