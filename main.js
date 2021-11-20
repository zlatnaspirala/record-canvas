
import { compositor } from "./src/index";

function attachFunction() {

  const videoDuration = 10; // Second
  // const videoDuration = document.getElementById('videoDuration').value;

  const mainOption = {
    injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: videoDuration
  };

  compositor(mainOption);
  window.removeEventListener("click", attachFunction);
}

window.addEventListener("click", attachFunction);