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
  gMeme.lines[gMeme.selectedLineIdx].pos.x += gElCanvas.width / 2;
  gMeme.lines[gMeme.selectedLineIdx].pos.y += gElCanvas.height / 5;
  createImages();
  renderImgs();
  renderKeyword();
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isTextClicked(pos)) return;

  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
  gMeme.lines[gMeme.selectedLineIdx].isDragging = true;
}

function isTextClicked(clickedPos) {
  const { pos } = gMeme.lines[gMeme.selectedLineIdx];
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


function renderImgs() {
  var images = getImagesForDisplay();
  let strHtml = '';
  images.forEach((img) => {
    strHtml += `<img class="grid-item box" src="img/${img.id}.jpg" onclick="onChooseImg('${img.id}')">`;
  });
  let elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHtml;
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

function renderKeyword() {
  let strHTML = '';
  let elKeyWords = document.querySelector('.key-words');
  for (var key in gKeywords) {
    var clasName;
    if (gKeywords[key] <= 1) clasName = 'small';
    else if (gKeywords[key] <= 2) clasName = 'medium';
    else clasName = 'large';
    strHTML += `<span onclick="enlargeValue('${key}')" class="${clasName}"> ${key} </span>`;
  }
  elKeyWords.innerHTML = strHTML;
}
function enlargeValue(word) {
  for (var key in gKeywords) {
    if (key === word) gKeywords[key]++;
  }

  setFilter(word);
  renderImgs();
  renderKeyword();
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

  drawLine(gMeme.lines[selectedLine].pos.x, gMeme.lines[selectedLine].pos.y);
}

function drawLine(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 2;
  gCtx.moveTo(x - 50, y + 10);
  gCtx.lineTo(x + 50, y + 10);
  gCtx.strokeStyle = 'red';
  gCtx.stroke();
}

function renderCanvas() {
  onChooseImg(gMeme.selectedImgId);
  for (let i = 0; i < gMeme.lines.length; i++) {
    // if (gMeme.selectedLineIdx === i) continue;
    let text = gMeme.lines[i].txt;
    let color = gMeme.lines[i].color;
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${gMeme.lines[i].size}px Arial`;
    gCtx.textAlign = 'center';

    gCtx.fillText(text, gMeme.lines[i].pos.x, gMeme.lines[i].pos.y);
    gCtx.strokeText(text, gMeme.lines[i].pos.x, gMeme.lines[i].pos.y);
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
  renderCanvas();
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-img.jpg'
}

function onSetFilter() {
  var filterBy = document.getElementById('search-input').value;
  for (var key in gKeywords) {
    if (key === filterBy) gKeywords[key]++;
  }
  renderKeyword();
  setFilter(filterBy);
  renderImgs();
}

function onChangeColor(){
   var color =  document.querySelector('.color-input').value
   gMeme.lines[gMeme.selectedLineIdx].color = color;
   drawText();
}
