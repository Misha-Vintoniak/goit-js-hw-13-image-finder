import debounce from 'lodash.debounce';
import NewfetchImages from './js/news-service';
import photoCard from './template/photo-card.hbs';
import './css/style.css';
// import './js/form';

const newfetchImages = new NewfetchImages();
const input = document.querySelector('[type="text"]');
const listImages = document.querySelector('.gallery');
const searchBtn = document.querySelector('.clear');
const sentinel = document.querySelector('#sentinel');
// const loadMoreBtn = document.querySelector('.load-more');

input.addEventListener('input', debounce(onSearch, 500));
searchBtn.addEventListener('submit', onClearBtn);
// loadMoreBtn.addEventListener('click', throttle(onLoadMore, 500));

function onSearch(e) {
  if (!input.value) {
    return alert('Введіть пошукові дані...');
  }
  e.preventDefault();

  newfetchImages.query = input.value;
  newfetchImages.resetPage();
  newfetchImages.fetchCard().then(images => onRenderList(images));
}

function onRenderList(images) {
  console.log(images);
  listImages.insertAdjacentHTML('beforeend', photoCard(images));
}
function onClearBtn() {
  listImages.innerHTML = '';
}
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newfetchImages.query !== '') {
      newfetchImages.fetchCard().then(images => {
        onRenderList(images);
        newsApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});
observer.observe(sentinel);

// function onLoadMore() {
//   //   newfetchImages.fetchCard();
//   newfetchImages.fetchCard().then(images => onRenderList(images));
//   // divCountries.innerHTML = '';
// }
