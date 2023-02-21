const body = document.getElementsByTagName("body")[0];
const videoPreview = document.getElementById("preview");
const startBtn = document.getElementById("btn-save");
const closeBtn = document.getElementById("btn-save");

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
  systemAudio: "exclude",
};

async function handleStartRecording() {
  ///body.style.width = "1000px";
  ///body.style.height = "1000px";

  try {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm";
    let mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime,
    });

    let chunks = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      let blob = new Blob(chunks, {
        type: chunks[0].type,
      });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();
    });
    mediaRecorder.start();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function handleStopRecording() {
  console.log("from stop recording");
}

startBtn.addEventListener("click", handleStartRecording);
closeBtn.addEventListener("click", handleStopRecording);
