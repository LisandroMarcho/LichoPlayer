const playList = ["song1", "song2", "song3", "song4", "song5"];

var LichoPlayer = null;
var playButton = null;
var stopButton = null;

window.onload = () => {
  // Grabbing from DOM and events
  LichoPlayer = document.getElementById("audio");
  LichoPlayer.onended = stopSong;

  playButton = document.getElementById("play");
  playButton.onclick = playPause;

  stopButton = document.getElementById("stop");
  stopButton.onclick = stopSong;

  loadSong(playList[0]);
};

function loadSong(song) {
  stopSong();

  try {
    LichoPlayer.src = `songs/${song}.mp3`;
    LichoPlayer.load();
    LichoPlayer.dataset.state = "loaded";
    LichoPlayer.dataset.file = song;
  } catch (error) {
    console.error(error);
  }
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
  }

  stopButton.disabled = false;
}

function stopSong() {
  LichoPlayer.pause();
  LichoPlayer.currentTime = 0;
  LichoPlayer.dataset.state = "stoped";

  playButton.innerText = "Play";
  stopButton.disabled = true;
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

function selectFromList (song) {
  let songIndex = playList.indexOf(song.dataset.file);
  loadSong(playList[songIndex]);
  playPause();
}