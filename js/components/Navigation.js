export class Navigation {
  constructor() {
    this.$nav = document.querySelector('.nav');
    this.$shadow = this.$nav.querySelector('.shadow');
    this.$menuToggler = this.$nav.querySelector('.menu-toggler');    
    
    //[mobile] 네비게이션 메뉴 토글
    this.$menuToggler.addEventListener('click', () => {
      if (this.$nav.classList.contains('menuing')) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    });
    this.$nav.addEventListener('click', (event) => event.stopPropagation());
    this.$shadow.addEventListener('click', this.hideMenu);
  }

  showMenu = () => {
    this.$nav.classList.add('menuing');
  }
  hideMenu = () => {
    this.$nav.classList.remove('menuing');
  }
}
