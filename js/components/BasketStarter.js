import { Basket } from './Basket.js';

export class BasketStarter {
  constructor({$header}) {
    this.$basketStarter = $header.querySelector('.basket-starter');
    this.basket = new Basket();
    
    this.$basketStarter.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.basket.isShow()) {
        this.basket.hide();
      } else {
        this.basket.show();
      }
    });    
  }
}
