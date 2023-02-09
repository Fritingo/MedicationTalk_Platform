
// // ------------------ device setting ----------------------
// // Attach audio output device to video element using device/sink ID.
// function attachSinkId(element, sinkId) {
//   if (typeof element.sinkId !== 'undefined') {
//     element.setSinkId(sinkId)
//     .then(() => {
//       console.log(`Success, audio output device attached: ${sinkId}`);
//     })
//     .catch(error => {
//       let errorMessage = error;
//       if (error.name === 'SecurityError') {
//         errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
//       }
//       console.error(errorMessage);
//       // Jump back to first output device in the list as it's the default.
//       audioOutputSelect.selectedIndex = 0;
//     });
//   } else {
//     console.warn('Browser does not support output device selection.');
//   }
// }

// function changeAudioDestination() {
//   const audioDestination = audioOutputSelect.value;
//   attachSinkId(videoElement, audioDestination);
// }

// function gotStream(stream) {
//   window.stream = stream; // make stream available to console
//   videoElement.srcObject = stream;
//   // Refresh button list in case labels have become available
//   return navigator.mediaDevices.enumerateDevices();
// }

// function handleError(error) {
//   console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
// }

// function start() {
//   if (window.stream) {
//     window.stream.getTracks().forEach(track => {
//       track.stop();
//     });
//   }
  
//   const videoSource = videoSelect.value;
//   const constraints = {
//     audio: false,
//     video: {deviceId: videoSource ? {exact: videoSource} : undefined,
//     "width": {
//       "min": "640",
//       "max": "640"
//     },
//     "height": {
//       "min": "640",
//       "max": "640"
//     }},
    
//   };
//   navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
// }


// ------------------------ load opencv ------------------------
function onCvLoaded () {
    console.log('cv', cv);
    cv.onRuntimeInitialized = onReady;
}
// ------------------------ webrtc ------------------------
const video = document.getElementById('video');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [videoSelect];

const width = 640;
const height = 640;
const FPS = 30;
let stream;
let streaming = false;

// ------------------------ get device ----------------------
function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
      if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
          select.value = values[selectorIndex];
        }
    });
}
function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// ------------------------ action ------------------------

const actionBtn = document.getElementById('actionBtn');

function onReady () {
    let src;
    let dst;
    const cap = new cv.VideoCapture(video);

    actionBtn.addEventListener('click', () => {
        if (streaming) {
            stop();
            actionBtn.textContent = 'Start';
        } else {
            start();
            actionBtn.textContent = 'Stop';
        }
    });

    function start () {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(_stream => {
            stream = _stream;
            console.log('stream', stream);
            video.srcObject = stream;
            video.play();
            streaming = true;
            src = new cv.Mat(height, width, cv.CV_8UC4);
            dst = new cv.Mat(height, width, cv.CV_8UC1);
            setTimeout(processVideo, 0)
        })
        .catch(err => console.log(`An error occurred: ${err}`));
    }

    function stop () {
        if (video) {
            video.pause();
            video.srcObject = null;
        }
        if (stream) {
            stream.getVideoTracks()[0].stop();
        }
        streaming = false;
    }

    function processVideo () {
        if (!streaming) {
            src.delete();
            dst.delete();
            return;
        }
        const begin = Date.now();
        cap.read(src)
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow('canvasOutput', dst);
        const delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
}

    


// // ---------------- init canvas ---------------------
// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');


// // ---------------- file to canvas --------------
// function handlefile(e){
//   var reader = new FileReader();
//   reader.onload = function(event){
//       var img = new Image();
//       img.onload = function(){
//           canvas.width = img.width;
//           canvas.height = img.height;
//           // canvas.width = 416;
//           // canvas.height = 416;

//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       }
//       img.src = event.target.result;
//   }
//   reader.readAsDataURL(e.target.files[0]);     
// }

//----------- take picture (webrtc to canvas) ------------------
// function take_picture(){
//   canvas.width = videoElement.videoWidth;
//   canvas.height = videoElement.videoHeight;
//   ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
// }

// ---------- start streaming -----------
// videoSelect.onchange = start;
// start();