
import { generateVideoProcedure } from "./index.js";

function attachFunction() {
  // videoDuration

  const videoDuration = document.getElementById('videoDuration').value;

  const mainOption = {
    videoDuration: videoDuration
  };

  generateVideoProcedure(mainOption);
  window.removeEventListener("click", attachFunction);
}

window.addEventListener("click", attachFunction);
