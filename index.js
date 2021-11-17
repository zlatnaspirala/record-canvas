
/**
 * @description This project will explore 
 * some generic video creation on web platform.
 * Minimum ECMA6
 */
function generateVideoProcedure() {

  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext("2d")
  const recordedChunks = [];
  const stream = canvas.captureStream(60);

  // let combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
  let options = {
    audio: true,
    audioBitsPerSecond: 64000,
  };

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
  stream.addTrack(firstAudioTrack);

  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = (e) => recordedChunks.push(e.data);
  mediaRecorder.onstop = async (e) => {
    const download = (fileName, url) => {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: block";
      a.innerHTML = 'LINK';
      a.href = url;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(url);
    };

    // download video
    const videoData = new Blob(recordedChunks, {type: "video/mp4"});
    download("1.mp4", URL.createObjectURL(videoData));

  }

  // start recording
  mediaRecorder.start();

  var x = 10
  setInterval(function() {
    x += 20
    ctx.fillStyle = 'red'
    ctx.fillText("JAVASCRIPT POWER", x, 50, 200, 50);
  }, 1000);

  setTimeout(function() {
    mediaRecorder.stop();
  }, 10000);

}

function attachFunction() {
  generateVideoProcedure();
  window.removeEventListener("click", attachFunction);
}

window.addEventListener("click", attachFunction);
