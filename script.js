const video = document.querySelector('.flex');
const playerButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('[name="volume"]');
const playbackRateSlider = document.querySelector('[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update play button icon
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playerButton.textContent = icon;
}

// Adjust volume and playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
playerButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('change', handleRangeUpdate);
volumeSlider.addEventListener('mousemove', handleRangeUpdate);
playbackRateSlider.addEventListener('change', handleRangeUpdate);
playbackRateSlider.addEventListener('mousemove', handleRangeUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
