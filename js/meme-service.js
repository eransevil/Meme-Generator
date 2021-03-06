var gElCanvas;
var gId = 1;
var gImgs = [];
var gCurrPosTxt1;
var gCurrPosTxt2;
var gFilterBy = 'all';
var saveMemes;
const KEY = 'MEME-DB';

const gKeywords = {
  happy: 1,
  funny: 1,
  angry: 1,
  cute: 1,
};

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,

  lines: [
    {
      txt: '',
      size: 40,
      align: 'center',
      color: 'white',
      isDragging: false,
      font: 'Impact',
      pos: {
        x: 0,
        y: 0,
      },
    },
  ],
};

function restartGmeme() {
  gMeme.selectedImgId = 1;
  gMeme.selectedLineIdx = 0;
  if (gMeme.lines.length > 1) gMeme.lines.pop();
  gMeme.lines[0].txt = '';
  gMeme.lines[0].size = 40;
  gMeme.lines[0].align = 'center';
  gMeme.lines[0].color = 'white';
  gMeme.lines[0].font = 'Impact';
}

function createImages() {
  gImgs.push(createImage('img/1.png', 'angry'));
  gImgs.push(createImage('img/2.png', 'cute'));
  gImgs.push(createImage('img/3.png', 'cute'));
  gImgs.push(createImage('img/4.png', 'cute'));
  gImgs.push(createImage('img/5.png', 'happy'));
  gImgs.push(createImage('img/6.png', 'cute'));
  gImgs.push(createImage('img/7.png', 'cute'));
  gImgs.push(createImage('img/8.png', 'happy'));
  gImgs.push(createImage('img/9.png', 'happy'));
  gImgs.push(createImage('img/10.png', 'funny'));
  gImgs.push(createImage('img/11.png', 'funny'));
  gImgs.push(createImage('img/12.png', 'angry'));
  gImgs.push(createImage('img/13.png', 'happy'));
  gImgs.push(createImage('img/14.png', 'angry'));
  gImgs.push(createImage('img/15.png', 'cute'));
  gImgs.push(createImage('img/16.png', 'funny'));
  gImgs.push(createImage('img/17.png', 'cute'));
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
    align: 'center',
    color: 'white',
    font: 'Impact',
    pos: {
      x: gElCanvas.width / 2,
      y: gElCanvas.height / 1.2,
    },
  });
}

function setFilter(filterBy) {
  if (
    filterBy !== 'happy' &&
    filterBy !== 'angry' &&
    filterBy !== 'funny' &&
    filterBy !== 'cute'
  ) {
    document.getElementById('search-input').value = 'Word does not exist';
    gFilterBy = 'all';
    renderKeyword();
    return;
  }
  gFilterBy = filterBy;
}

function getImagesForDisplay() {
  if (gFilterBy === 'all') return gImgs;
  var images = gImgs.filter(function (img) {
    return (
      (gFilterBy === 'happy' && img.keyword === 'happy') ||
      (gFilterBy === 'funny' && img.keyword === 'funny') ||
      (gFilterBy === 'angry' && img.keyword === 'angry') ||
      (gFilterBy === 'cute' && img.keyword === 'cute')
    );
  });
  return images;
}

function SetFontFamily(value) {
  gMeme.lines[gMeme.selectedLineIdx].font = value;
}

function changeAlign(value) {
  gMeme.lines[gMeme.selectedLineIdx].align = value;
}

function isTextClicked(ev, clickedPos) {
  const { pos } = gMeme.lines[gMeme.selectedLineIdx];
  console.log('text pos', pos , ' clickedPos=' ,clickedPos);
  if (ev.type === 'touchstart' && clickedPos.y <240){
   return true;

    
  } 
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  return distance <= gMeme.lines[gMeme.selectedLineIdx].size;
}


function _saveMemeToStorage(urlImg) {
  saveToStorage(KEY, urlImg);

}
function _loadMemeToStorage(){
  console.log('hey')
 return loadFromStorage(KEY)
}
