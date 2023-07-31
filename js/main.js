const $basketStarter = document.querySelector('.header .basket-starter');
const $basket = $basketStarter.querySelector('.basket');

function showBasket() {
  $basket.classList.add('show');
}
function hideBasket() {
  $basket.classList.remove('show');
}

$basketStarter.addEventListener('click', (event) => {
  event.stopPropagation();
  if ($basket.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});
$basket.addEventListener('click', (event) => event.stopPropagation());
window.addEventListener('click', () => hideBasket());
