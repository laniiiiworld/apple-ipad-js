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
