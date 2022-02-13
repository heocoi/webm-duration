import fs from "node:fs";
import test from "ava";
import webmDuration from "./index.js";

const webmFixture = fs.readFileSync('fixtures/sample.webm');
const mp3Fixture = fs.readFileSync("fixtures/sample.mp3");
const txtFixture = fs.readFileSync("fixtures/sample.txt");

test("get duration of .webm file", (t) => {
  t.true(webmDuration(webmFixture) > 0);
});

test("get duration of other audio/video filetype", (t) => {
  t.true(webmDuration(mp3Fixture) == 0);
});

test("get duration of not-audio/video file", (t) => {
  t.true(webmDuration(txtFixture) == 0);
});
