'use strict';

import ipads from '../data/ipads.js';
import { FooterNavigations } from './components/FooterNavigations.js';

new FooterNavigations();

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
  stopScroll();
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
  playScroll();
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
function playScroll() {
  document.documentElement.classList.remove('fixed');
}
function stopScroll() {
  document.documentElement.classList.add('fixed');
}
function showBasket() {
  $basket.classList.add('show');
}
function hideBasket() {
  $basket.classList.remove('show');
}

//검색 창
$searchStarter.addEventListener('click', (event) => {
  event.stopPropagation();
  showSearch();
});
$searchCloser.addEventListener('click', (event) => {
  event.stopPropagation();
  hideSearch();
});
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

//[mobile] header 메뉴 토글
const $menuStarter = $header.querySelector('.menu .menu-starter');
$menuStarter.addEventListener('click', () => {
  if ($header.classList.contains('menuing')) {
    $header.classList.remove('menuing');
    $searchInput.value = '';
    playScroll();
  } else {
    $header.classList.add('menuing');
    stopScroll();
  }
});

//[mobile] header 검색
const $searchTextField = $header.querySelector('.textfield');
const $searchCanceler = $header.querySelector('.search-canceler');
$searchTextField.addEventListener('click', () => {
  $header.classList.add('searching--mobile');
  $searchInput.focus();
});
$searchCanceler.addEventListener('click', () => {
  $header.classList.remove('searching--mobile');
});

//[mobile] 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리
window.addEventListener('resize', () => {
  if (window.innerWidth <= 740) { //mobile mode
    $header.classList.remove('searching');
  } else {
    $header.classList.remove('searching--mobile');
  }
});

//[mobile] 네비게이션 메뉴 토글
const $nav = document.querySelector('.nav');
const $navMenuShadow = $nav.querySelector('.shadow');
const $navMenuToggler = $nav.querySelector('.menu-toggler');
$navMenuToggler.addEventListener('click', () => {
  if ($nav.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
$nav.addEventListener('click', (event) => event.stopPropagation());
window.addEventListener('click', hideNavMenu);
$navMenuShadow.addEventListener('click', hideNavMenu);
function showNavMenu() {
  $nav.classList.add('menuing');
}
function hideNavMenu() {
  $nav.classList.remove('menuing');
}

//요소의 가시성 관찰
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

// 올해 연도
const $thisYear = document.querySelector('span.this-year');
$thisYear.textContent = new Date().getFullYear();
