import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

const $header = document.querySelector('.header');
const $headerMenus = [...$header.querySelectorAll('.menu .item')];
//검색
const $searchStarter = $header.querySelector('.search-starter');
const $searchWrap = $header.querySelector('.search-wrap');
const $searchInput = $searchWrap.querySelector('input');
const $searchCloser = $searchWrap.querySelector('.search-closer');
const $searchShadow = $searchWrap.querySelector('.shadow');
const $searchDelays = [...$searchWrap.querySelectorAll('.autocompletes ul li')];
//장바구니
const $basketStarter = $header.querySelector('.basket-starter');
const $basket = $basketStarter.querySelector('.basket');

//검색 창 보여주기
function showSearch() {
  $header.classList.add('searching');
  document.documentElement.classList.add('fixed');
  //header 메뉴들 애니메이션 지연 설정
  $headerMenus.reverse().forEach(($menu, index) => {
    $menu.style.transitionDelay = `${(0.4 * index) / $headerMenus.length}s`;
  });
  //빠른 링크들 애니메이션 지연 설정
  $searchDelays.forEach(($element, index) => {
    $element.style.transitionDelay = `${(0.6 * index) / $searchDelays.length}s`;
  });
  setTimeout(() => $searchInput.focus(), 600);
}
//검색 창 숨기기
function hideSearch() {
  $header.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  //header 메뉴들 애니메이션 지연 설정
  $headerMenus.reverse().forEach(($menu, index) => {
    $menu.style.transitionDelay = `${(0.4 * index) / $headerMenus.length}s`;
  });
  //빠른 링크들 애니메이션 지연 설정
  $searchDelays.reverse().forEach(($element, index) => {
    $element.style.transitionDelay = `${(0.6 * index) / $searchDelays.length}s`;
  });
  $searchDelays.reverse();
  $searchInput.value = '';
}
//장바구니 보여주기
function showBasket() {
  $basket.classList.add('show');
}
//장바구니 숨기기
function hideBasket() {
  $basket.classList.remove('show');
}

//검색 창
$searchStarter.addEventListener('click', (event) => {
  event.stopPropagation();
  showSearch();
});
$searchCloser.addEventListener('click', hideSearch);
$searchShadow.addEventListener('click', hideSearch);

//장바구니
$basketStarter.addEventListener('click', (event) => {
  event.stopPropagation();
  if ($basket.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});
$basket.addEventListener('click', (event) => event.stopPropagation());
window.addEventListener('click', hideBasket);

//요소의 가성 관찰
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});
const $infos = document.querySelectorAll('.info');
$infos.forEach(($info) => io.observe($info));

//동영상 재생 제어
const $video = document.querySelector('.camera .stage video');
const $playBtn = document.querySelector('.camera .stage .controller--play');
const $pauseBtn = document.querySelector('.camera .stage .controller--pause');
function togglePlayOrPauseVideo() {
  $playBtn.classList.toggle('hide');
  $pauseBtn.classList.toggle('hide');
  if ($playBtn.classList.contains('hide')) {
    $video.play();
  } else {
    $video.pause();
  }
}
$playBtn.addEventListener('click', togglePlayOrPauseVideo);
$pauseBtn.addEventListener('click', togglePlayOrPauseVideo);

// '당신에게 맞는 iPad는?' 랜더링
const $items = document.querySelector('section.compare .items');
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
  $items.appendChild($item);
});
function getColorList(colors) {
  return colors.map((color) => /* html */ `<li style="background-color: ${color};"></li>`).join('');
}
function getPrice(price) {
  return `₩${price.toLocaleString('en-US')}부터`;
}

//Footer navigations 랜더링
const $navigations = document.querySelector('footer .navigations');
navigations.forEach((nav) => {
  const { title, maps } = nav;
  const $map = document.createElement('div');
  $map.className = 'map';
  $map.innerHTML = /* html */ `
    <h3 class="text"><span>${title}</span></h3>
    ${maps.length && getMenuList(maps)}
  `;
  $navigations.appendChild($map);
});
function getMenuList(menus) {
  return /* html */ `
    <ul>
      ${menus.map((menu) => /* html */ `<li><a href="${menu.url}">${menu.name}</a></li>`).join('')}
    </ul>
  `;
}