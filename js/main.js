'use strict';

import { Scroll } from './components/Scroll.js';
import { Navigation } from './components/Navigation.js';
import { Camera } from './components/Camera.js';
import { IpadList } from './components/IpadList.js';
import { FooterNavigations } from './components/FooterNavigations.js';

const scroll = new Scroll();
const navigation = new Navigation();
new Camera();
new IpadList();
new FooterNavigations();

window.addEventListener('click', navigation.hideMenu);

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
  scroll.stop();
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
  scroll.play();
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
    scroll.play();
  } else {
    $header.classList.add('menuing');
    scroll.stop();
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

// 올해 연도
const $thisYear = document.querySelector('span.this-year');
$thisYear.textContent = new Date().getFullYear();
