
const gMouseEvs = [
  'click',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseleave',
  'mousemove',
];
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gCtx;


function onInit() {
    restartGmeme();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log(gCtx);
    // resizeCanvas()
    createImages();
    renderImgs();
  }

//   function initHandlers() {
//     gMouseEvs.forEach((evName) => {
//       document.querySelector('.mouse').addEventListener(evName, handleMouse);
//       document.querySelector('.both').addEventListener(evName, handleMouse);
//     });
//     gTouchEvs.forEach((evName) => {
//       document.querySelector('.touch').addEventListener(evName, handleTouch);
//       document.querySelector('.both').addEventListener(evName, handleTouch);
//     });
//   }
  
  
// function handleMouse(ev) {
//   console.log('handleMouse');
//   if (ev.target.className.includes('pos-container') || ev.type !== 'click')
//     return;
//   console.log(ev);
//   renderPos(ev, 'mouse');
// }

// // Handle touch events
// function handleTouch(ev) {
//   console.log(ev);
//   if (ev.target.className.includes('pos-container') || ev.type !== 'touchstart')
//     return;
//   ev.preventDefault();
//   renderPos(ev, 'touch');
// }



function renderImgs() {
  let strHtml = '';
  gImgs.forEach((img) => {
    strHtml += `<img class="grid-item box" src="img/${img.id}.jpg" onclick="onChooseImg('${img.id}')">`;
  });
  let elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHtml;
  console.log(elGallery);
}

function onChooseImg(imgId) {
  let img = new Image();
  img.src = `img/${imgId}.jpg`;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  gMeme.selectedImgId = imgId;
  document.querySelector('.editor-form').classList.remove('hide');
  document.querySelector('.gallery-container').style.display = 'none';
}

function drawText() {
  let selectedLine = gMeme.selectedLineIdx;
  renderCanvas();
  let text = gMeme.lines[selectedLine].txt;
  let color = gMeme.lines[selectedLine].color;
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${gMeme.lines[selectedLine].size}px Arial`;
  gCtx.textAlign = 'center';
  if (selectedLine === 0) {
    gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 5);
    gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 5);
  } else {
    gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
    gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
  }
}

function renderCanvas() {
  onChooseImg(gMeme.selectedImgId);
  for (let i = 0; i < gMeme.lines.length; i++) {
    let text = gMeme.lines[i].txt;
    let color = gMeme.lines[i].color;
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${gMeme.lines[i].size}px Arial`;
    gCtx.textAlign = 'center';
    if (i === 0) {
      gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 5);
      gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 5);
    } else {
      gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
      gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
    }
  }
}

addEventListener('input', function () {
  let inputText = document.getElementById('text-input').value;
  gMeme.lines[gMeme.selectedLineIdx].txt = inputText;
  drawText();
});

function onChangeLine() {
  if (gMeme.lines.length === 1) return;
  gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0;
  document.getElementById('text-input').value =
    gMeme.lines[gMeme.selectedLineIdx].txt;

  drawText();
}

function onAddLine() {
  if (gMeme.lines.length > 1) return;
  addLine()

}

function onShowGallery() {
  document.querySelector('.editor-form').classList.add('hide');
  document.querySelector('.gallery-container').style.display = 'grid';
  restartGmeme()
  document.getElementById('text-input').value ='';
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}