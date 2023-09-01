import { Scroll } from './Scroll.js';

export class SearchArea {
  constructor({ $header, $searchWrap, $headerMenus }) {
    this.$header = $header;
    this.$headerMenus = $headerMenus;
    this.$searchInput = $searchWrap.querySelector('input');
    this.$searchCloser = $searchWrap.querySelector('.search-closer');
    this.$searchShadow = $searchWrap.querySelector('.shadow');
    this.$searchDelays = [...$searchWrap.querySelectorAll('.autocompletes ul li')];
    this.scroll = new Scroll();

    this.$searchCloser.addEventListener('click', (event) => {
      event.stopPropagation();
      this.hide();
    });
    this.$searchShadow.addEventListener('click', this.hide);    
  }

  show = () => {
    this.$header.classList.add('searching');
    this.scroll.stop();
    setAnimationDelayForMenu(this.$headerMenus);
    setAnimationDelayForLink(this.$searchDelays);
    setTimeout(() => this.$searchInput.focus(), 600);
  }

  hide = () => {
    this.$header.classList.remove('searching');
    this.scroll.play();
    setAnimationDelayForMenu(this.$headerMenus);
    setAnimationDelayForLink(this.$searchDelays.reverse());
    this.$searchDelays.reverse();
    this.$searchInput.value = '';
  }  
}

function setAnimationDelayForMenu($menus) {
  $menus.reverse().forEach(($menu, index) => {
    $menu.style.transitionDelay = `${(0.4 * index) / $menus.length}s`;
  });
}

function setAnimationDelayForLink($links) {
  $links.forEach(($link, index) => {
    $link.style.transitionDelay = `${(0.6 * index) / $links.length}s`;
  });
}