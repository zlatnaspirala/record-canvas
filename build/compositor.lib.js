(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordCanvas = void 0;

/**
 * @description This project will explore 
 * some generic video creation on web platform.
 * Minimum ECMA6
 * @name RecordCanvas
 * @typedef class
 * @param frameRequestRate
 * @param videoDuration
 */
class RecordCanvas {
  constructor(mainOption) {
    this.canvas = document.getElementById(mainOption.injectCanvas);
    this.ctx = canvas.getContext("2d");
    this.recordedChunks = [];
    this.videoData = null;

    if (typeof mainOption.frameRequestRate == 'undefined') {
      mainOption.frameRequestRate = 30;
    }

    if (typeof mainOption.videoDuration == 'undefined') {
      mainOption.videoDuration = 10;
    }

    this.mainOption = mainOption;
    this.mediaRecorder = null;
    this.stream = this.canvas.captureStream(mainOption.frameRequestRate);
    this.options = {
      audio: true,
      audioBitsPerSecond: 64000
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

  initVideo() {
    this.mediaRecorder = new MediaRecorder(this.stream, this.options);

    this.mediaRecorder.ondataavailable = e => this.recordedChunks.push(e.data);

    this.mediaRecorder.onstop = async e => {
      const download = (fileName, url) => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: block";
        a.innerHTML = 'download link';
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }; // download video


      this.videoData = new Blob(this.recordedChunks, {
        type: "video/mp4"
      });
      download("example.mp4", URL.createObjectURL(this.videoData)); // start recording
    };

    this.mediaRecorder.start();
    this.presentationPreview();
  }

  initAudio() {
    // let combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 0;
    const streamAudioDestination = audioContext.createMediaStreamDestination();
    oscillator.connect(streamAudioDestination);
    oscillator.start(); // add audio track

    const audioStream = streamAudioDestination.stream;
    const audioTracks = audioStream.getAudioTracks();
    const firstAudioTrack = audioTracks[0];
    this.stream.addTrack(firstAudioTrack);
  }

  killPresentationDrawer() {
    clearInterval(this.internalPresentationDrawer);
  }

  presentationPreview = () => {
    var x = 10;
    this.internalPresentationDrawer = setInterval(() => {
      x += 90;
      this.ctx.font = "100px Bold Arial";
      this.ctx.fillStyle = 'red';
      this.ctx.fillText("Record From canvas to mp4.", 50, 0 + x, 350, 30);
    }, 500);
    setTimeout(() => {
      this.mediaRecorder.stop();
      this.killPresentationDrawer();
    }, this.mainOption.videoDuration * 1000);
  };
}

exports.RecordCanvas = RecordCanvas;

},{}]},{},[1]);
