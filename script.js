const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const image = document.getElementById("cover");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const songs = ["hey", "summer", "ukulele"];
let songIndex = 0;

songsLoadInDom(songs[songIndex]);
//update title,image and audio
function songsLoadInDom(song) {
  title.textContent = song;
  audio.src = `music/${song}.mp3`;
  image.src = `images/${song}.jpg`;
}
//play music
function pauseMusic() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

//pause music
function playMusic() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  songsLoadInDom(songs[songIndex]);
  playMusic();
}

//next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  songsLoadInDom(songs[songIndex]);
  playMusic();
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(event) {
  const Totalwidth = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / Totalwidth) * duration;
}

//event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time  update

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
