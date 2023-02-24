import MediaOptions from "./config.js";

class Recorder {
  stream;
  mediaRecorder;
  chunks = [];
  blob;
  downloadType = "video.webm";
  getMimeType() {
    return MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
      ? "video/webm; codecs=vp9"
      : "video/webm";
  }
  constructor() {
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.handlDataStop = this.handlDataStop.bind(this);
  }

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getDisplayMedia(MediaOptions);
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.getMimeType(),
      });
      this.mediaRecorder.addEventListener(
        "dataavailable",
        this.handleDataAvailable
      );
      this.mediaRecorder.addEventListener("stop", this.handlDataStop);
      this.mediaRecorder.start();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
  async getStream() {
    this.stream = await navigator.mediaDevices.getDisplayMedia(MediaOptions);
    return this.stream;
  }
  setMediaRecorder() {
    return new MediaRecorder(this.stream, {
      mimeType: this.getMimeType,
    });
  }
  handleDataAvailable(e) {
    this.chunks.push(e.data);
  }

  handlDataStop() {
    this.blob = new Blob(this.chunks, {
      type: this.chunks[0].type,
    });

    let url = URL.createObjectURL(this.blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "video.webm";
    a.click();
  }
}

export default Recorder;
