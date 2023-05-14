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
  bestBooksList.map(({ books }) => console.log(books));
  const markup = bestBooksList
    .map(
      ({ list_name, books }) => `
      <li class="bs-books__categories-item">
        <h2 class="bs-books__category-title">${list_name}</h2>
        <ul class="bs-books__list">
          ${books
            .map(
              ({ _id, list_name, author, book_image, title }) => `
              <li class="bs-books__item data-id="${_id}">
                <p class="bs-books__category">${list_name}</p>
                <div class="bs-books__thumb">
                    <img src="${book_image}" alt="book cover: ${title}" class="bs-books__picture" width="335" height="485">
                </div>
                <div class="bs-books__box">
                  <h3 class="bs-books__title">${title}</h3>
                  <p class="bs-books__author">${author}</p>
                </div>
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
