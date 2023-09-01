export class Scroll {
  constructor() { }
  play() {
    document.documentElement.classList.remove('fixed');
  }
  stop() {
    document.documentElement.classList.add('fixed');
  }
}