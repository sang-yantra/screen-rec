import Recorder from "./src/recording/Recorder.js";
import MediaOptions from "./src/recording/config.js";

const body = document.getElementsByTagName("body")[0];
const videoPreview = document.getElementById("preview");
const startBtn = document.getElementById("btn-save");
const closeBtn = document.getElementById("btn-close");

const getDisplayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
    suppressLocalAudioPlayback: true,
  },
  surfaceSwitching: "include",
  selfBrowserSurface: "exclude",
  systemAudio: "include",
};

function handleStopRecording() {
  console.log("from stop recording");
}

const recorder = new Recorder();
startBtn.addEventListener("click", () => recorder.start());
closeBtn.addEventListener("click", handleStopRecording);
