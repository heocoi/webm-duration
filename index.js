import ffmpeg from "ffmpeg.js";
import { nanoid } from "nanoid/non-secure";

export default function webmDuration(input, options) {
  if (!input) {
    return 0;
  }

  // using ffmpeg to get file metadata
  const fileId = nanoid();
  let stdout = "";
  ffmpeg({
    MEMFS: [{ name: fileId, data: input }],
    arguments: ["-i", fileId],
    print: function (data) {
      stdout += data + "\n";
    },
    printErr: function (data) {
      stdout += data + "\n";
    },
  });

  // parse duration text from ffmpeg stdout
  const inputTokens = stdout.match(/^Input #.+/m);
  if (!inputTokens) {
    // input info not found
    return 0;
  }
  const webmMime = inputTokens[0].match(/webm/);
  if (!webmMime) {
    // not .webm file
    return 0;
  }

  // parse duration text from ffmpeg stdout
  const durationTokens = stdout.match(/^\s+Duration:\s+([^,]+)/m);
  if (!durationTokens) {
    // duration not found
    return 0;
  }

  const time = durationTokens[1];
  // return seconds from duration string
  if (Number.isFinite(time)) return time;
  const m = time.match(/^(?:(\d+):)?(?:(\d+)+:)?(\d+(?:\.\d+)?)$/);
  if (!m) {
    // invalid time format
    return 0;
  }

  const [hours, minutes, seconds] = m.slice(1);
  let duration = Number(seconds);
  if (hours) {
    if (minutes) {
      duration += Number(minutes) * 60;
      duration += Number(hours) * 3600;
    } else {
      duration += Number(hours) * 60;
    }
  }

  return duration;
}
