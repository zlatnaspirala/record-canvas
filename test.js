
import { RecordCanvas } from "./src/index";

function attachFunction() {

  const videoDuration = 10; // Second
  // const videoDuration = document.getElementById('videoDuration').value;

  const mainOption = {
    injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: videoDuration
  };

  let MyRecorder = new RecordCanvas(mainOption);
  window.removeEventListener("click", attachFunction);
  MyRecorder.run();
  MyRecorder.presentationPreview();
  console.info("Test instance MyRecorder => " + MyRecorder);
}

window.addEventListener("click", attachFunction);