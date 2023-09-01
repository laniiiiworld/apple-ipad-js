'use strict';

import { Header } from './components/Header.js';
import { Basket } from './components/Basket.js';
import { Navigation } from './components/Navigation.js';
import { Camera } from './components/Camera.js';
import { IpadList } from './components/IpadList.js';
import { FooterNavigations } from './components/FooterNavigations.js';

const header = new Header();
const basket = new Basket();
const navigation = new Navigation();
new Camera();
new IpadList();
new FooterNavigations();

window.addEventListener('click', () => {
  basket.hide();
  navigation.hideMenu();
});

//[mobile] 화면 크기가 달라졌을 때 검색 모드가 종료되도록 처리
window.addEventListener('resize', () => {
  if (window.innerWidth <= 740) { //mobile mode
    header.hideSearchDesktopMode();
  } else {
    header.hideSearchMobileMode();
  }
});

//요소의 가시성 관찰:: 정보들 애니메이션
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

// footer에서 사용하는 올해 연도
const $thisYear = document.querySelector('span.this-year');
$thisYear.textContent = new Date().getFullYear();
