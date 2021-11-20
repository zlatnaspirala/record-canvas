(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compositor = compositor;

/**
 * @description This project will explore 
 * some generic video creation on web platform.
 * Minimum ECMA6
 */
function compositor(mainOption) {
  var canvas = document.getElementById(mainOption.injectCanvas);
  var ctx = canvas.getContext("2d");
  const recordedChunks = [];

  if (typeof mainOption.frameRequestRate == 'undefined') {
    mainOption.frameRequestRate = 30;
  }

  const stream = canvas.captureStream(mainOption.frameRequestRate); // let combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);

  let options = {
    audio: true,
    audioBitsPerSecond: 64000
  };
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = 0;
  const streamAudioDestination = audioContext.createMediaStreamDestination();
  oscillator.connect(streamAudioDestination);
  oscillator.start(); // add audio track

  const audioStream = streamAudioDestination.stream;
  const audioTracks = audioStream.getAudioTracks();
  const firstAudioTrack = audioTracks[0];
  stream.addTrack(firstAudioTrack);
  let mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);

  mediaRecorder.onstop = async e => {
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


    const videoData = new Blob(recordedChunks, {
      type: "video/mp4"
    });
    download("example.mp4", URL.createObjectURL(videoData));
  }; // start recording


  mediaRecorder.start();
  var x = 10;
  setInterval(function () {
    x += 10;
    ctx.fillStyle = 'red';
    ctx.fillText("JAVASCRIPT POWER", 10, 50 + x, 90);
  }, 500);
  setTimeout(function () {
    mediaRecorder.stop();
  }, mainOption.videoDuration * 1000);
}

},{}]},{},[1]);
