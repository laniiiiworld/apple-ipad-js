export class Basket {
  constructor() {
    this.$basket = document.querySelector('.header .basket');
    this.$basket.addEventListener('click', (event) => event.stopPropagation());
  }

  isShow() {
    return this.$basket.classList.contains('show');
  }

  show() {
    this.$basket.classList.add('show');
  }

  hide() {
    this.$basket.classList.remove('show');
  }
}