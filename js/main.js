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
  gMeme.lines[gMeme.selectedLineIdx].pos.x += gElCanvas.width / 2;
  gMeme.lines[gMeme.selectedLineIdx].pos.y += gElCanvas.height / 5;
  createImages();
  renderImgs();
}

function onDown(ev) {
  console.log('evenet', ev);
  const pos = getEvPos(ev);
  if (!isTextClicked(pos)) return;

  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
  gMeme.lines[gMeme.selectedLineIdx].isDragging = true;
}

function isTextClicked(clickedPos) {
  const {
    pos
  } = gMeme.lines[gMeme.selectedLineIdx];
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  return distance <= gMeme.lines[gMeme.selectedLineIdx].size;
}

function onMove(ev) {
  if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;

    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;

    gStartPos = pos;
    drawText();
  }
}

function onUp() {
  gMeme.lines[gMeme.selectedLineIdx].isDragging = false;
  document.body.style.cursor = '';
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
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
  document.querySelector('.search-container').classList.add('hide');
}

function drawText() {
  if (!document.getElementById('text-input').value) return;
  let selectedLine = gMeme.selectedLineIdx;
  renderCanvas();
  let text = gMeme.lines[selectedLine].txt;
  let color = gMeme.lines[selectedLine].color;
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${gMeme.lines[selectedLine].size}px Arial`;
  gCtx.textAlign = 'center';
  if (!gMeme.lines[selectedLine].isDragging) {
    if (selectedLine === 0) {
      gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 5);
      gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 5);
    } else {
      gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
      gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 1.2);
    }
  } else {
    gCtx.fillText(
      text,
      gMeme.lines[selectedLine].pos.x,
      gMeme.lines[selectedLine].pos.y
    );
    gCtx.strokeText(
      text,
      gMeme.lines[selectedLine].pos.x,
      gMeme.lines[selectedLine].pos.y
    );
  }
}

function renderCanvas() {
  onChooseImg(gMeme.selectedImgId);
  for (let i = 0; i < gMeme.lines.length; i++) {
    // debugger;
    if (gMeme.selectedLineIdx === i) continue;
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
  addLine();
}

function onShowGallery() {
  document.querySelector('.editor-form').classList.add('hide');
  document.querySelector('.gallery-container').style.display = 'grid';
  document.querySelector('.search-container').classList.remove('hide');
  restartGmeme();
  document.getElementById('text-input').value = '';
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg');

  elLink.href = imgContent;
  console.log(elLink.href);
}