import { BookAPI } from './bookAPI';
import { renderBsBookCardsMarkup } from './renderMarkup';
import { Notify } from 'notiflix';
import { spinerStart, spinerStop } from './spinner';
import { hideSection } from './renderCategories';
import { refreshPopupDOM } from './popup';
import {
  displayBooksByCategory,
  booksByCategoryInitMarkup,
} from './renderBooksByCategory';

const bsBooksSectionEl = document.querySelector('.js-bs-books__section');
const booksByCategoriesSectionEl = document.querySelector(
  '.js-books-container'
);

function onSeeMore(e) {
  const isSeeMoreBtn = e.target.getAttribute('data-role');
  if (!isSeeMoreBtn || isSeeMoreBtn !== 'see-more-btn') return;

  const targetCategory = e.target.getAttribute('data-list');

  hideSection(bsBooksSectionEl);
  booksByCategoriesSectionEl.style.display = '';
  booksByCategoriesSectionEl.innerHTML = booksByCategoryInitMarkup;

  displayBooksByCategory(targetCategory);
  refreshPopupDOM();
}

bsBooksSectionEl.addEventListener('click', onSeeMore);

export async function renderBestSellerBooks() {
  spinerStart();
  const api = new BookAPI();

  const bestSellersBooksList = document.querySelector(
    '.bs-books__categories-list'
  );

  const resp = await api.getTopBooks();
  if (resp.length == 0) {
    Notify.failure('There are no books, sorry.');
    return;
  }

  renderBsBookCardsMarkup(resp);
  bestSellersBooksList.insertAdjacentHTML(
    'beforeend',
    renderBsBookCardsMarkup(resp)
  );
  spinerStop();
}

renderBestSellerBooks();
