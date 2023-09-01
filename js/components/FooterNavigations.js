import navigations from '../../data/navigations.js';
import { FooterNavigation } from './FooterNavigation.js';

export class FooterNavigations {
  constructor() {
    this.$navigations = document.querySelector('footer .navigations');
    this.render();
  }
  
  render() {
    navigations.forEach((nav) => new FooterNavigation({
          $target: this.$navigations,
          props: nav,
        })
    );
  }
}
