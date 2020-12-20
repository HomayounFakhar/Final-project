
// Pre list Json for loding in html when page is loaded
var musicList = [
    {
        musicName: "Earth",
        musicCoverSrc: "img/piano-1.jpg",
        musicSrc: "audio/piano-1.mp3"
    },
    {
        musicName: "Fire",
        musicCoverSrc: "img/piano-2.jpg",
        musicSrc: "audio/piano-2.mp3"
    },
    {
        musicName: "Piano",
        musicCoverSrc: "img/piano-3.jpg",
        musicSrc: "audio/piano-3.mp3"
    },
    {
        musicName: "Rain",
        musicCoverSrc: "img/piano-4.jpg",
        musicSrc: "audio/piano-4.mp3"
    },
    {
        musicName: "Spring",
        musicCoverSrc: "img/piano-5.jpg",
        musicSrc: "audio/piano-5.mp3"
    },
    {
        musicName: "Water",
        musicCoverSrc: "img/piano-6.jpg",
        musicSrc: "audio/piano-6.mp3"
    },
];


// Selectors
var playListTemplate = ``;
var music = document.querySelector('.music-element');
var playBtn = document.querySelector('.play');
var seekbar = document.querySelector('.seekbar');
var currentTime = document.querySelector('.current-time');
var duration = document.querySelector('.duration');
var repIcon = document.querySelector('.repeat');

// Play - Pause // change icons() // Change Class button
function handlePlay() {
    if (music.paused) {
        music.play();
        playBtn.className = 'pause'
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M48 479h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48H48C21.5 31 0 52.5 0 79v352c0 26.5 21.5 48 48 48zM32 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V79zm272 400h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48zM288 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16V79z"/></svg>';
    } else {
        music.pause();
        playBtn.className = 'play'
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fcdab7" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"/></svg>';
    }

    music.addEventListener('ended', function () {
        playBtn.className = 'play'
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"/></svg>';
        music.currentTime = 0
    });
}


music.onloadeddata = function () {
    seekbar.max = music.duration;
    var ds = parseInt(music.duration % 60);
    var dm = parseInt((music.duration / 60) % 60);
    duration.innerHTML = (dm | '00') + ':' + (ds | '00');
}

// showing time set max
music.ontimeupdate = function () { seekbar.value = music.currentTime }
handleSeekBar = function () { music.currentTime = seekbar.value }
music.addEventListener('timeupdate', function () {
    var cs = parseInt(music.currentTime % 60);
    var cm = parseInt((music.currentTime / 60) % 60);
    currentTime.innerHTML = cm + ':' + cs;
}, false)

// active heart
//var favIcon = document.querySelector('.favorite');
//function handleFavorite() {
    //favIcon.classList.toggle('active');
//}


// 
//var repIcon = document.querySelector('.repeat');
// Active loop
function handleRepeat() {
    if (music.loop == true) {
        music.loop = false;
        repIcon.classList.toggle('active');
    }
    else {
        music.loop = true
        repIcon.classList.toggle('active');
    }
}




// Volume Control
var volIcon = document.querySelector('.volume');
var volBox = document.querySelector('.volume-box');
var volumeRange = document.querySelector('.volume-range');
var volumeDown = document.querySelector('.volume-down');
var volumeUp = document.querySelector('.volume-up');
function handleVolume() {
    volIcon.classList.toggle('active');
    volBox.classList.toggle('active');
}


// Chabe this VolomueChange (If its bigger so can Volume faster)
const VolomueChange = 10;

volumeDown.addEventListener('click', handleVolumeDown);
volumeUp.addEventListener('click', handleVolumeUp);
function handleVolumeDown() {
    volumeRange.value = Number(volumeRange.value) - VolomueChange;
    music.volume = volumeRange.value / 100;
}

function handleVolumeUp() {
    volumeRange.value = Number(volumeRange.value) + VolomueChange;
    music.volume = volumeRange.value / 100;
}

//

//var musicList = [
//    {
//        musicName: "Test",
//        musicCoverSrc: "img/Test.jpg",
//        musicSrc: "audio/Test.mp3"
//    },
//];

// Pre list Json for loding in html when page is loaded
// Load from pre in top of page
window.onload = () => {
    const playListContent = document.querySelector('#play-list-content');
    document.querySelector('#play-list-content-loading').style.display = 'none';
    for (let i = 0; i < musicList.length; i++) {
        let item = musicList[i];
        playListContent.innerHTML += playListItemTemplate(item.musicSrc, item.musicCoverSrc, item.musicName, i);
    }
}

// PlayListItem
function playListItemTemplate(musicSrc, musicCoverSrc, musicName, index) {
    return `<div class="play-list-item">
                <a class="${(index == 0) ? 'active' : ''}" id="${musicName}-${index}" onclick="loadMusic('${musicSrc}', '${musicCoverSrc}', '${musicName}', '${musicName}-${index}')">
                    <img src="${musicCoverSrc}" alt="">
                    <h4>${musicName}</h4>
                </a>
            </div>`;
}


function playListItemToggle(id) {
    let playListBtns = document.querySelectorAll('#play-list-content a');
    for (let i = 0; i < playListBtns.length; i++) {
        const element = playListBtns[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
}


// Load music
function loadMusic(musicSrc, musicCoverSrc, musicName, btnId) {
    playListItemToggle(btnId);
    document.querySelector('.player .cover img').src = musicCoverSrc;
    document.querySelector('.info .title').innerHTML = musicName;
    music.querySelector('source').src = musicSrc;
    music.load();
    handlePlay();
}

// Add url to use for feuture
const audioInput = document.querySelector('#audio-input')
audioInput.addEventListener('change', (e) => {
    const loading = document.querySelector('.container-loading');
    loading.style.display = 'flex';
    let sound = music.querySelector('source');
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        loading.style.display = 'none';
        let index = document.querySelectorAll('.play-list-item').length + 1;
        const playListContent = document.querySelector('#play-list-content');
        playListContent.innerHTML += playListItemTemplate(e.target.result, 'img/music-cover.jpg', file.name, index);
        loadMusic(e.target.result, 'img/music-cover.jpg', file.name, `${file.name}-${index}`);
    }
    reader.readAsDataURL(file);
});


// Recording Voice
const btnRecorder = document.querySelector('#voice-recorder');
var recorder;
var gumStream;
var voiceIndex = 0;
btnRecorder.addEventListener('click', (e) => {
    const thisBtn = e.currentTarget;
    if (thisBtn.classList.contains('stop')) {
        thisBtn.innerHTML = 'Stop Record';
        thisBtn.classList.remove('stop');
        thisBtn.classList.add('in-procces');
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(function (stream) {
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function (e) {
                    var url = URL.createObjectURL(e.data);
                    voiceIndex++;
                    const playListContent = document.querySelector('#play-list-content');
                    playListContent.innerHTML += playListItemTemplate(url, 'img/music-cover.jpg', `voice-${voiceIndex}`, voiceIndex);
                    loadMusic(url, 'img/music-cover.jpg', `voice-${voiceIndex}`, `voice-${voiceIndex}-${voiceIndex}`);
                };
                recorder.start();
            });
    }
    else {
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
        thisBtn.innerHTML = 'Start Record';
        thisBtn.classList.remove('in-procces');
        thisBtn.classList.add('stop');
    }
});
