import { BookAPI } from './bookAPI';
import { renderBsBookCardsMarkup } from './renderMarkup';
import { Notify } from 'notiflix';

function renderBestSellerBooks() {
  const api = new BookAPI();

  const bestSellersBooksList = document.querySelector(
    '.bs-books__categories-list'
  );

  api
    .getTopBooks()
    .then(resp => {
      if (resp.length == 0) {
        Notify.failure('There are no books, sorry.');
        return;
      }
      renderBsBookCardsMarkup(resp);
      bestSellersBooksList.insertAdjacentHTML(
        'beforeend',
        renderBsBookCardsMarkup(resp)
      );
    })
    .catch(err => Notify.failure(err));;
}

renderBestSellerBooks();