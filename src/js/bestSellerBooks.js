import { BookAPI } from './bookAPI';
import { renderBsBookCardsMarkup } from './renderMarkup';
import { Notify } from 'notiflix';

async function renderBestSellerBooks() {
  console.log('Function is working: renderBestSellerBooks');
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
}

console.log('BEFORE');
renderBestSellerBooks();
console.log('AFTER');
