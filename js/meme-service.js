console.log('connect');
var gElCanvas;
var gId = 1;
var gImgs = [];
var gCurrPosTxt1;
var gCurrPosTxt2;

const KEY = 'MEME-DB';

const gKeywords = {
  happy: 6,
  funny: 1,
  angry: 2
};
// const gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['angry'] }];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,

  lines: [{
    txt: '',
    size: 40,
    align: 'left',
    color: 'red',
    isDragging: false,
    pos: {
      x: 0,
      y: 0
    },
  }, ],
};

function restartGmeme() {
  gMeme.selectedImgId = 1;
  gMeme.selectedLineIdx = 0;
  if (gMeme.lines.length > 1) gMeme.lines.pop();
  gMeme.lines[0].txt = '';
  gMeme.lines[0].size = 40;
  gMeme.lines[0].align = 'left';
  gMeme.lines[0].color = 'red';
}

function createImages() {
  gImgs.push(createImage('img/1.png', 'angry'));
  gImgs.push(createImage('img/2.png', 'cute'));
  gImgs.push(createImage('img/3.png', 'cute'));
  gImgs.push(createImage('img/4.png', 'cute'));
  gImgs.push(createImage('img/5.png', 'happy'));
  gImgs.push(createImage('img/6.png', 'smart'));
  gImgs.push(createImage('img/7.png', 'smart'));
  gImgs.push(createImage('img/8.png', 'evil'));
  gImgs.push(createImage('img/9.png', 'evil'));
  gImgs.push(createImage('img/10.png', 'funny'));
  gImgs.push(createImage('img/11.png', 'funny'));
  gImgs.push(createImage('img/12.png', 'smart'));
  gImgs.push(createImage('img/13.png', 'happy'));
  gImgs.push(createImage('img/14.png', 'smart'));
  gImgs.push(createImage('img/15.png', 'smart'));
  gImgs.push(createImage('img/16.png', 'funny'));
  gImgs.push(createImage('img/17.png', 'evil'));
  gImgs.push(createImage('img/18.png', 'funny'));
}

function createImage(url, keyword) {
  let img = {
    id: gId++,
    keyword,
    url,
  };
  return img;
}

function onChangeFont(action) {
  if (action === '+') gMeme.lines[gMeme.selectedLineIdx].size++;
  else gMeme.lines[gMeme.selectedLineIdx].size--;
  drawText();
}

function addLine() {
  gMeme.lines.push({
    txt: '',
    size: 40,
    align: 'left',
    color: 'red',
    pos: {
      x: gElCanvas.width / 2,
      y: gElCanvas.height / 1.2
    },
  });
}