// 酷我音乐移动端 UI 同步
const kwDisc = document.getElementById("kwDisc");
const kwSong = document.getElementById("kwSong");
const kwArtist = document.getElementById("kwArtist");
const kwCurrTime = document.getElementById("kwCurrTime");
const kwTotalTime = document.getElementById("kwTotalTime");
const kwProgress = document.getElementById("kwProgress");
const kwPlay = document.getElementById("kwPlay");
const kwPlayIcon = document.getElementById("kwPlayIcon");
const kwPlaylist = document.getElementById("kwPlaylist");

function syncMobilePlayer() {
  if (!window.currentSong) return;
  const s = window.currentSong;
  kwDisc.style.backgroundImage = `url(${s.cover || ''})`;
  kwSong.textContent = s.name;
  kwArtist.textContent = s.artist;
}

function syncProgress() {
  if (!window.audio) return;
  const cur = window.audio.currentTime;
  const dur = window.audio.duration;
  kwCurrTime.textContent = formatTime(cur);
  kwTotalTime.textContent = dur ? formatTime(dur) : "00:00";
  kwProgress.style.width = dur ? (cur / dur) * 100 + "%" : "0%";
}

kwPlay.addEventListener("click", () => {
  if (!window.audio) return;
  if (window.isPlaying) {
    window.audio.pause();
    window.isPlaying = false;
    kwPlayIcon.className = "fa-solid fa-play";
  } else {
    window.audio.play();
    window.isPlaying = true;
    kwPlayIcon.className = "fa-solid fa-pause";
  }
});

setInterval(() => {
  syncMobilePlayer();
  syncProgress();
}, 100);

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sc = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sc).padStart(2, '0')}`;
}
