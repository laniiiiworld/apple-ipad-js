import ipads from '../../data/ipads.js';

export class IpadList {
  constructor() {
    // 당신에게 맞는 iPad는?
    this.$iPadList = document.querySelector('section.compare .items');
    this.render();
  }

  render() {
    ipads.forEach((ipad) => {
      const { thumbnail, colors, name, tagline, price, url } = ipad;
      const $item = document.createElement('div');
      $item.className = 'item';
      $item.innerHTML = /* html */ `
                          <div class="thumbnail">
                            <img src="${thumbnail}" alt="${name}" />
                          </div>
                          <ul class="colors">${getColorList(colors)}</ul>
                          <h3 class="name">${name}</h3>
                          <p class="tagline">${tagline}</p>
                          <p class="price">${getPrice(price)}</p>
                          <button class="btn">구입하기</button>
                          <a href="${url}" class="link">더 알아보기</a>
                        `;
      this.$iPadList.appendChild($item);
    });    
  }
}

function getColorList(colors) {
  return colors.map((color) => /* html */ `<li style="background-color: ${color};"></li>`).join('');
}

function getPrice(price) {
  return `₩${price.toLocaleString('en-US')}부터`;
}
