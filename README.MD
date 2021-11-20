
# Project name Compositor
### Compositor is WEB-VIDEO-CREATOR with basic functionallity
### Based on MediaRecorder API Javascript
### Minimum ECMA6

Script type `module`.

First install node modules with `npm i`.

Build library with:
```js
npm run build
```

Take a look at `./build/compositor.lib.js`

## How to use it:
```js
 import { compositor } from "compositor";
// import { compositor } from "./src/index"; DEV

function attachFunction() {
  // videoDuration
  const videoDuration = document.getElementById('videoDuration').value;

  const mainOption = {
    injectCanvas: "canvas",
    frameRequestRate: 30,
    videoDuration: videoDuration
  };

  compositor(mainOption);
  window.removeEventListener("click", attachFunction);
}

window.addEventListener("click", attachFunction);
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
