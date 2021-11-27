![text-example](https://github.com/zlatnaspirala/record-canvas/blob/main/imgs/logo1.png)
## Project name record-canvas
### RecordCanvas is SIMPLE-WEB-VIDEO-CREATOR with basic functionallity. Based on MediaRecorder API Javascript - Minimum ECMA6

### - Work with source and build from source:
Script type `module`.
First install node modules with `npm i`.

Build library (js text plane) with:
```js
npm run build
```
Take a look at `./build/compositor.lib.js`

## - For npm users first install it with:

Install command:
```js
npm i record-canvas
```

Source: https://github.com/zlatnaspirala/record-canvas

#### How to use it [Basic example is test.html]:

 - videoDuration: value in Seconds
 - injectCanvas: represent canvas id => "canvas",
    other way for injectCanvas is canvas Dom like object.

```js
 import { RecordCanvas } from "compositor";
// import { RecordCanvas } from "./src/index";

function attachFunction() {

  const mainOption = {
    injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: 10
  };

  let MyRecorder = new RecordCanvas(mainOption);
  window.removeEventListener("click", attachFunction);
  MyRecorder.run();
  MyRecorder.presentationPreview();
  console.info("Test instance MyRecorder => " + MyRecorder);
}

window.addEventListener("click", attachFunction);
```

### `index.html` Record-Canvas-Tool

![text-example](https://github.com/zlatnaspirala/record-canvas/blob/main/imgs/record-canvas.png)

Inputs for `any-canvas-example.js` 

```js
  // If you need canvas from iframe:
  injectCanvas = recordCanvasIframe.contentWindow.document.getElementById('canvas');

  let mainOption = {
    injectCanvas: injectCanvas,
    // injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: videoDuration,
    outputFilename: "record-canvas.mp4",
    mineType: "video/mp4",
    resolutions: resolutionsDom.selectedOptions[0].innerText
  };
```

### Next features:
   Add input options:
    - No generic audio context - No user request needed for download


### Idea:
To combine any source. To be reusable in any case.

```cpp
 INPUT PARAMS:
 -> Video duration
 -> External any canvas work or inline ctx
 -> Choose audio [GENERIC SOUND | AUDIO FILE | MIC]
```

```json
WEBCAM |
VIDEO FILE |
CANVAS
                      => MP4
GENERIC SOUND |
AUDIO FILE | 
MIC
```
