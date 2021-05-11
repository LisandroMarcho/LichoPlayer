const songs = ["song1", "song2", "song3", "song4", "song5"];

var LichoPlayer = null;
var playButton = null;
var stopButton = null;

window.onload = () => {
    // Grabbing from DOM and events
    LichoPlayer = document.getElementById("audio");
    LichoPlayer.onended = songEnded;

    playButton = document.getElementById("play");
    playButton.onclick = playPause;
    
    stopButton = document.getElementById("stop");
    stopButton.onclick = stop;

    try {
        LichoPlayer.src = `songs/${songs[0]}.mp3`;
        loadSong();
    } catch (e) {
        console.error(e);
    }
    

    console.log(LichoPlayer);
};

async function loadSong() {
    await LichoPlayer.load();
    LichoPlayer.dataset.state = "loaded";
}

function songEnded () {
    alert("song ended");
}

function playPause () {
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

function stop () {
    LichoPlayer.pause();
    LichoPlayer.currentTime = 0;
    LichoPlayer.dataset.state = "stoped";
    
    playButton.innerText = "Play";
    stopButton.disabled = true;
}