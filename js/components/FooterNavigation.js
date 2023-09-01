export class FooterNavigation {
  constructor({ $target, props }) {
    this.$navigation = document.createElement('div');
    this.$navigation.className = 'map';
    this.props = props;
    this.render();
    $target.appendChild(this.$navigation);

    //[mobile] 아코디언 메뉴 이벤트 토글
    const $h3 = this.$navigation.querySelector('h3');
    $h3.addEventListener('click', () => this.$navigation.classList.toggle('active'));
  }

  render() {
    const { title, maps } = this.props;
    this.$navigation.innerHTML = /* html */ `
      <h3>
        <span class="text">${title}</span>
        <span class="icon">+</span>
      </h3>
      ${maps.length && getMenuList(maps)}
    `;
  }
}

function getMenuList(menus) {
  return /* html */ `
    <ul>
      ${menus.map((menu) =>/* html */`<li><a href="${menu.url}">${menu.name}</a></li>`).join('')}
    </ul>
  `;
}
