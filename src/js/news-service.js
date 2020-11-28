const API_KEY = '19212472-91085f93384c895bec44df301';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewfetchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCard() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
