const songs = ["song1", "song2", "song3", "song4"];

var audio = null;

window.onload(() => {
    audio = document.getElementById("audio");
    audio.onended = songEnded;
});

function songEnded () {
    alert("song ended");
}

function play () {
    alert("play");

}

function stop () {
    alert("stop");
}