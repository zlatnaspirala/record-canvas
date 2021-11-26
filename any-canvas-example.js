
import { RecordCanvas } from "./index";
import { resolutions } from "./index";

let MyRecorder = null;
let recordCanvasIframe = document.getElementsByTagName("iframe")[0];

// Start Btn
let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startRecording);

function initRecording() {

  startBtn.removeEventListener("click", MyRecorder.stopRecording);
  startBtn.addEventListener("click", startRecording);
}

let reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", () => {
  recordCanvasIframe.contentWindow.location.reload();
});

function setNewResolution() {
  var x = document.getElementById("resolution").value;
  x = x.replace("r", "");
  recordCanvasIframe.width = x.split("x")[0];
  recordCanvasIframe.height = x.split("x")[1];
}

// get input from DOM
let resolutionsDom = document.getElementById("resolution");
resolutionsDom.addEventListener("change" , (e) => {
  setNewResolution();
});
console.log("resolutionsDom " + resolutionsDom);

for (let resolution in resolutions) {
  let localOption = document.createElement("option");
  localOption.text = resolution;
  if (localOption.text == "r960x540") {
    localOption.setAttribute("selected" ,true);
  }
  resolutionsDom.add(localOption);
}
setNewResolution();

// get input for iframe urls
let myIframeRoutesDom = document.getElementById("listOfRoutes");
myIframeRoutesDom.addEventListener("change" , (e) => {
  // set new route
  console.log("TETS" , recordCanvasIframe)
  recordCanvasIframe.src = document.getElementById("listOfRoutes").value;
});

// Pu any yours canvas app here
let myIframeRoutes = [
  "http://localhost/PRIVATE_SERVER/matrix-engine-starter/projects/matrix-slot/",
  "http://localhost/PRIVATE_SERVER/matrix-engine-starter/examples.html",
  "http://localhost/PRIVATE_SERVER/NUI-COMMANDER/project/nui-commander/test_npm/"
];

myIframeRoutes.forEach((myIframeRoute) => {
  let localOption = document.createElement("option");
  localOption.text = myIframeRoute;
  myIframeRoutesDom.add(localOption);
})

function stopRecording(e) {
  e.currentTarget.innerText = "Start Recording";
  MyRecorder.stopRecording();
  startBtn.removeEventListener("click", stopRecording );
  startBtn.addEventListener("click", startRecording);
}

window.addEventListener("record-canvas-saved", () =>{
  if (startBtn.innerText == "Recording") {
    startBtn.innerText = "Start recording";
    startBtn.removeEventListener("click", stopRecording);
    startBtn.addEventListener("click", startRecording);
  }
})

function startRecording(e) {
  console.log(e.currentTarget + "<<<<<<<")
  e.currentTarget.innerText = "Recording";
  const videoDuration = document.getElementById("videoDuration").value;
  // Collect canvas element with canvas id from iframe what ever ...
  // And sending like html Object in other way you can set string Id of canvas element from root html.
  window.injectCanvas = recordCanvasIframe.contentWindow.document.getElementById('canvas');
  if (window.injectCanvas == null) { // look deeply in iframe
    window.injectCanvas = recordCanvasIframe.contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById('canvas');
  }
  var injectCanvas = window.injectCanvas;
  console.log("injectCanvas make it global , test =>", window.injectCanvas)

  let mainOption = {
    injectCanvas: injectCanvas,
    // injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: videoDuration,
    outputFilename: "record-canvas.mp4",
    mineType: "video/mp4",
    resolutions: resolutionsDom.selectedOptions[0].innerText
  };

  MyRecorder = new RecordCanvas(mainOption);
  window.removeEventListener("click", startRecording);
  MyRecorder.run();
  console.info("Test instance MyRecorder => " + MyRecorder);

  startBtn.removeEventListener("click", startRecording);
  startBtn.addEventListener("click", stopRecording);
}

// window.addEventListener("click", startRecording);