console.log('connect');

const gKeywords = { happy: 6, funny: 1, angry: 2 };
// const gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['angry'] }];

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,

  lines: [
    {
      txt: '',
      size: 40,
      align: 'left',
      color: 'red',
      
    },
  ],
};

function  restartGmeme(){
    gMeme.selectedImgId =1;
    gMeme.selectedLineIdx =0;
    if(gMeme.lines.length>1) gMeme.lines.pop()
    gMeme.lines[0].txt ='';
    gMeme.lines[0].size = 40;
    gMeme.lines[0].align = 'left';
    gMeme.lines[0].color = 'red';
}



function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onChangeFont(action){
    if(action==='+') gMeme.lines[gMeme.selectedLineIdx].size++;
    else gMeme.lines[gMeme.selectedLineIdx].size--;
    drawText();
}



