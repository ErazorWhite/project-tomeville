import { BookAPI } from './bookAPI';
import { renderBsBookCardsMarkup } from './renderMarkup';
import { Notify } from 'notiflix';
import { spinerStart, spinerStop } from './spinner';

const bsBooksSectionEl = document.querySelector('.js-bs-books__section');

function onSeeMore(e) {
  const seeMoreBtnDataRole = e.target.getAttribute('data-role');
  if (!seeMoreBtnDataRole || seeMoreBtnDataRole !== 'see-more-btn') return;

  const targetCategory = e.target.getAttribute('data-list');
  const targetCategoryNavTabEl = document.querySelector(
    `[data-category="${targetCategory}"]`
  );

  targetCategoryNavTabEl.dispatchEvent(new Event('click'));
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
