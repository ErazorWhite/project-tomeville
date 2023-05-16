import noImg from '../images/noImage/noImage-desk@1x.png';

export default function renderBookCardsMarkup(books) {
  const markup = books
    .map(
      ({ _id, book_image, title, author }) => `
  <li class="book-card" data-book-id='${_id}'>
  <a class="book-card__link" href="#">
  <div class="book-card__thumb">
    <img class="book-card__image" src="${book_image}" alt="${author} ${title}" loading="lazy">
  <p class="book-card__notification">quick view</p>
    </div>
  <div>
    <div>
      <p class="book-card__title">"${title}"</p>
    </div>
    <div>
      <p>"${author}"</p>
    </div>
  </div>
  </a>
</li>`
    )
    .join('');
  return markup;
}

export function renderBsBookCardsMarkup(bestBooksList) {
  const markup = bestBooksList
    .map(
      ({ list_name, books }) => `
      <li class="bs-books__categories-item">
        <h2 class="bs-books__category-title">${list_name}</h2>
        <ul class="bs-books__list">
          ${books
            .map(
              ({ _id, list_name, author, book_image, title }) => `
              <li class="bs-books__item book-card" data-id="${_id}">
              <p class="bs-books__category">${list_name}</p>
              <a class="bs-books__link" href="#">
                  <div class="bs-books__thumb">
                      <img src="${book_image || noImg}" alt="book cover: ${
                title || 'No title'
              }"class="bs-books__picture" width="335" height="485">
                      <p class="bs-books__view">quick view</p>
                  </div>
                  <div class="bs-books__box">
                  <h3 class="bs-books__title">${title || 'No title'}</h3>
                  <p class="bs-books__author">${author || 'No author'}</p>
                  </div>
                  </a>
                  <div class="bs-books__button-box">
                    <button class="bs-books__see-more-btn" type="button" data-role="see-more-btn" data-list="${list_name}">see more</button>
                  </div>
              </li>`
            )
            .join('')}
        </ul>
      </li>`
    )
    .join('');
  return markup;
}

export const bestSellersInitMarkup = `<h1 class="bs-books__headline">Best Sellers <span class="bs-books__accent">Books</span></h1>
        <ul class="bs-books__categories-list" data-action="booksContainer">
        </ul>`;
