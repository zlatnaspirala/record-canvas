
/**
 * @description This project will explore 
 * some generic video creation on web platform.
 * Minimum ECMA6
 * @name RecordCanvas
 * @typedef class
 * @param frameRequestRate
 * @param videoDuration
 */
export class RecordCanvas {

  constructor(mainOption) {
    if (typeof mainOption.injectCanvas == "string")  {
      console.log("Arg represent id of canvas:" + mainOption.injectCanvas);
      this.canvas = document.getElementById(mainOption.injectCanvas);
    } else {
      console.info("Arg object: ", mainOption.injectCanvas);
      this.canvas = mainOption.injectCanvas;
    }

    this.ctx = this.canvas.getContext("2d");
    this.recordedChunks = [];
    this.videoData = null;
    if (typeof mainOption.frameRequestRate == 'undefined') {
      mainOption.frameRequestRate = 30;
    }
    if (typeof mainOption.videoDuration == 'undefined') {
      mainOption.videoDuration = 10;
    }

    if (typeof mainOption.outputFilename == 'undefined') {
      mainOption.outputFilename = "record-canvas-default.mp4";
    }

    console.log("resolutions" + mainOption.resolutions)

    this.mainOption = mainOption;
    this.mediaRecorder = null;
    this.stream = this.canvas.captureStream(mainOption.frameRequestRate);

    this.options = {
      audio: true,
      audioBitsPerSecond: 64000,
    };

    if (typeof mainOption.audio != 'undefined') {
      this.option.audio = mainOption.audio;
    }

    if (typeof mainOption.audioBitsPerSecond != 'undefined') {
      this.option.audioBitsPerSecond = mainOption.audioBitsPerSecond;
    }

    this.internalPresentationDrawer = null;
  }

  run() {
    this.initAudio();
    this.initVideo();
  }

  autoRun() {
    this.initVideo();
  }

  initVideo() {
    this.mediaRecorder = new MediaRecorder(this.stream, this.options);
    this.mediaRecorder.ondataavailable = (e) => this.recordedChunks.push(e.data);
    this.mediaRecorder.onstop = async (e) => {
      const download = (fileName, url) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.innerHTML = 'download link';
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        window.dispatchEvent(new CustomEvent("record-canvas-saved", {}));
      };
  
      // download video
      this.videoData = new Blob(this.recordedChunks, {type: this.mainOption.mineType});
      download(this.mainOption.outputFilename, URL.createObjectURL(this.videoData));
    }
    // start recording
    this.mediaRecorder.start();
    this.stopAfter();
  }

  initAudio() {

    // let combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 0;
    const streamAudioDestination = audioContext.createMediaStreamDestination();
    oscillator.connect(streamAudioDestination);
    oscillator.start();
  
    // add audio track
    const audioStream = streamAudioDestination.stream;
    const audioTracks = audioStream.getAudioTracks();
    const firstAudioTrack = audioTracks[0];
    this.stream.addTrack(firstAudioTrack);

  }

  killPresentationDrawer() {
    clearInterval(this.internalPresentationDrawer);
  }

  presentationPreview = function() {
    var x = 10;
    this.internalPresentationDrawer = setInterval(() => {
      x += 90;
      this.ctx.font = "100px Bold Arial";
      this.ctx.fillStyle = 'red';
      this.ctx.fillText("Record From canvas to mp4.", 50, 0 + x, 350, 30);
    }, 500);
  }

  stopRecording() {
    if (this.mediaRecorder.state == "recording") this.mediaRecorder.stop();
    this.killPresentationDrawer();
  }

  stopAfter() {
    setTimeout(() => {
      this.stopRecording();
    }, this.mainOption.videoDuration * 1000);
  }

}
