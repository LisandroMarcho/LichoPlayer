const playList = ["song1", "song2", "song3", "song4", "song5"];
const songNames = ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"];

var LichoPlayer = null;
var playButton = null;
var stopButton = null;
var progressBar = null;
var timeLabel = null;
var durationLabel = null;
var currentlyPlaying = null;

window.onload = function () {
  LichoPlayer = document.getElementById("audio");
  playButton = document.getElementById("play");
  stopButton = document.getElementById("stop");
  progressBar = document.getElementById("progress");
  timeLabel = document.getElementById("currentTime");
  durationLabel = document.getElementById("duration");
  currentlyPlaying = document.getElementById("currentlyPlaying");

  LichoPlayer.onended = songEnded;
  LichoPlayer.ontimeupdate = updateProgressBar
  LichoPlayer.onloadedmetadata = metaLoaded; 

  progressBar.onchange = clickOnProgressBar;

  loadSong(playList[0]);
};

function loadSong(song) {
  stopSong();
  let songIndex = playList.indexOf(song);

  try {
    LichoPlayer.src = `songs/${song}.mp3`;
    LichoPlayer.load();
    LichoPlayer.dataset.state = "loaded";
    LichoPlayer.dataset.file = song;
  } catch (error) {
    console.error(error);
  }

  progressBar.value = 0;
  currentlyPlaying.innerText = songNames[songIndex];
}

function playPause() {
  switch (LichoPlayer.dataset.state) {
    case "playing":
      LichoPlayer.pause();
      LichoPlayer.dataset.state = "paused";
      playButton.innerText = "Play";
      break;
    default:
      LichoPlayer.play();
      LichoPlayer.dataset.state = "playing";
      playButton.innerText = "Pause";
      break;
  }

  stopButton.disabled = false;
}

function stopSong() {
  LichoPlayer.pause();
  LichoPlayer.currentTime = 0;
  LichoPlayer.dataset.state = "stoped";

  playButton.innerText = "Play";
  stopButton.disabled = true;

  progressBar.value = 0;
}

function nextSong() {
  let songIndex = playList.indexOf(LichoPlayer.dataset.file);
  if (songIndex != playList.length - 1) {
    loadSong(playList[songIndex + 1]);
    playPause();
  }
  else {
    loadSong(playList[0]);
    playPause();
  }
}

function previusSong() {
  let songIndex = playList.indexOf(LichoPlayer.dataset.file);
  if (songIndex != 0) {
    loadSong(playList[songIndex - 1]);
    playPause();
  }
  else {
    loadSong(playList[playList.length - 1]);
    playPause();
  }
}

function playFromList (song) {
  let songIndex = playList.indexOf(song.dataset.file);
  loadSong(playList[songIndex]);
  playPause();
}

function songEnded () {
  let songIndex = playList.indexOf(LichoPlayer.dataset.file);
  if((songIndex + 1) == playList.length || LichoPlayer.dataset.autoplay == "off") 
    stopSong();
  else nextSong();
}

function updateProgressBar () {
  let currentTime = Math.floor(LichoPlayer.currentTime);
  let minutes = parseInt(currentTime / 60);
  let seconds = currentTime - minutes * 60;
  
  if(seconds < 10) seconds = `0${currentTime - minutes * 60}`;

  timeLabel.innerText = `${minutes}:${seconds}`;
  progressBar.value = currentTime;
}

function metaLoaded () {
  let duration = Math.floor(LichoPlayer.duration);
  let minutes = parseInt(duration / 60);
  let seconds = duration - minutes * 60;
  
  durationLabel.innerText = `${minutes}:${seconds}`;
  progressBar.max = Math.floor(LichoPlayer.duration);
}

function clickOnProgressBar () {
  LichoPlayer.currentTime = progressBar.value;
}

function toggleAutoplay (autoplayButton) {
  if (LichoPlayer.dataset.autoplay == "on"){
    LichoPlayer.dataset.autoplay ="off";
    autoplayButton.innerText = "Autoplay: OFF";
  }
  else {
    LichoPlayer.dataset.autoplay ="on";
    autoplayButton.innerText = "Autoplay: ON";
  }
}