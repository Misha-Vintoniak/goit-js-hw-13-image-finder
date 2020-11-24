const BASE_IPI = '19212472-91085f93384c895bec44df301';
const BASE_URL = 'https://pixabay.com/api';

export default class NewfetchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCard() {
    return fetchCard(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${BASE_IPI}`,
    )
      .then(r => r.json())
      .then(data => {
        incrementPage();
        return data.images;
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
/*
export default async (searchQuery, page) => {
  try {
    const searchImage = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${BASE_IPI}`,
    );
    return searchImage.json();
  } catch (error) {
    return error;
  }
};
*/
