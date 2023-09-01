import { BasketStarter } from './BasketStarter.js';
import { Scroll } from './Scroll.js';
import { SearchArea } from './SearchArea.js';

export class Header {
  constructor() {
    this.$header = document.querySelector('.header');
    this.$headerMenus = [...this.$header.querySelectorAll('.menu .item')];
    this.$searchStarter = this.$header.querySelector('.search-starter');
    this.$searchWrap = this.$header.querySelector('.search-wrap');
    this.$searchInput = this.$header.querySelector('input');

    this.searchArea = new SearchArea({
      $header: this.$header,
      $searchWrap: this.$searchWrap,
      $headerMenus: this.$headerMenus,
    });
    this.basketStarter = new BasketStarter({$header: this.$header});
    
    this.$searchStarter.addEventListener('click', (event) => {
      event.stopPropagation();
      this.searchArea.show();
    });
    
    //[mobile] header 메뉴 토글
    this.$menuStarter = this.$header.querySelector('.menu .menu-starter');
    this.scroll = new Scroll();
    this.$menuStarter.addEventListener('click', () => {
      if (this.$header.classList.contains('menuing')) {
        this.$header.classList.remove('menuing');
        this.$searchInput.value = '';
        this.scroll.play();
      } else {
        this.$header.classList.add('menuing');
        this.scroll.stop();
      }
    });

    //[mobile] header 검색
    this.$searchTextField = this.$header.querySelector('.textfield');
    this.$searchCanceler = this.$header.querySelector('.search-canceler');
    this.$searchTextField.addEventListener('click', () => {
      this.showSearchMobileMode();
      this.$searchInput.focus();
    });
    this.$searchCanceler.addEventListener('click', () => {
      this.hideSearchMobileMode();
    });
  }

  hideSearchDesktopMode() {
    this.$header.classList.remove('searching');
  }

  hideSearchMobileMode() {
    this.$header.classList.remove('searching--mobile');
  }
  
  showSearchMobileMode() {
    this.$header.classList.add('searching--mobile');
  }
}