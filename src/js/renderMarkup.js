
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

