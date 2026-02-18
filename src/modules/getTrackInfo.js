import { getCurrentTrack } from "./spotify.js";
import { DEBUG } from "../config/config.js";

const MAX_BIO_LENGTH = 70;
const emoji = "📀";
// 💿

const cleanTrackName = (name) => {
  return name
    .replace(/\(feat\..*?\)/gi, "")
    .replace(/\(.*?mix.*?\)/gi, "")
    .trim();
};

const buildBio = (track, artists) => {
  let base = `${emoji} ${track} — ${artists}`;

  if (base.length <= MAX_BIO_LENGTH) return base;
  return `${track}|${artists}`;
};

const getTrackInfo = async () => {
  const trackData = await getCurrentTrack();

  if (!trackData || !trackData.item) {
    return `${emoji} nothing playing`;
  }

  const trackName = cleanTrackName(trackData.item.name);

  const artists = trackData.item.artists
    .map((artist) => artist.name)
    .slice(0, 2)
    .join(", ");

  const bioString = buildBio(trackName, artists);

  if (DEBUG) console.log(`[LOG] Now playing: ${bioString}`);
  return bioString;
};

export { getTrackInfo };
