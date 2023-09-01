export class Camera {
  constructor() {
    this.$section = document.querySelector('.camera');
    this.$video = this.$section.querySelector('.stage video');
    this.$playBtn = this.$section.querySelector('.stage .controller--play');
    this.$pauseBtn = this.$section.querySelector('.stage .controller--pause');
    
    this.$playBtn.addEventListener('click', () => this.togglePlayOrPauseVideo());
    this.$pauseBtn.addEventListener('click', () => this.togglePlayOrPauseVideo());
  }

  togglePlayOrPauseVideo() {
    this.$playBtn.classList.toggle('hide');
    this.$pauseBtn.classList.toggle('hide');
    if (this.$playBtn.classList.contains('hide')) {
      this.$video.play();
    } else {
      this.$video.pause();
    }
  }
}
