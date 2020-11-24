import debounce from 'lodash.debounce';
import newfetchImages from './apiService.js';
import photoCard from '../template/photo-card.hbs';

const input = document.querySelector('[type="text"]');
const listImages = document.querySelector('.gallery');
const searchBtn = document.querySelector('[type="submit"]');

input.addEventListener('input', debounce(onSearch, 500));
searchBtn.addEventListener('submit', onLoadMore);

function onSearch(e) {
  if (!input.value) {
    return;
  }
  e.preventDefault();
  newfetchImages.query = e.currentTarget.query.value;

  newfetchImages.resetPage();
  newfetchImages(fetchCard).then(image => onRenderList());
}

function onRenderList() {
  listImages.insertAdjacentHTML('beforend', fetchCard(photoCard));
}

function onLoadMore() {
  newfetchImages.fetchCard();
  // divCountries.innerHTML = '';
}
