import {
  SPOTIFY_ID,
  SPOTIFY_SECRET,
  DEBUG,
  REFRESH_TOKEN,
} from "../config/config.js";

let cachedAccessToken = null;
let cachedAccessTokenExp = 0;

const getAccessToken = async () => {
  const now = Date.now();

  if (cachedAccessToken && now < cachedAccessTokenExp - 10_000) {
    return cachedAccessToken;
  }

  const basic = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString(
    "base64",
  );

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: REFRESH_TOKEN,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Token refresh failed ${res.status}: ${text}`);
  }

  const data = await res.json();

  cachedAccessToken = data.access_token;
  cachedAccessTokenExp = now + (data.expires_in ?? 3600) * 1000;

  return cachedAccessToken;
};

const getCurrentTrack = async () => {
  const accessToken = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/me/player/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 204) {
    if (DEBUG) console.log("no current playing");
    global.trackTime = null;

    return null;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify API error ${res.status}: ${text}`);
  }

  const data = await res.json();

  if (!data?.item?.duration_ms) {
    global.trackTime = null;
    return data;
  }

  const duration = data.item.duration_ms;
  const progress = data.progress_ms ?? 0;

  global.trackTime = Math.max(0, duration - progress - 3000);
  return data;
};

export { getAccessToken, getCurrentTrack };
