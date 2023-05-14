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
              <li class="bs-books__item data-id="${_id}">
              <p class="bs-books__category">${list_name}</p>
              <a class="bs-books__link" href="#">
                  <div class="bs-books__thumb">
                      <img src="${
                        book_image || 'src/images/noimage/noImage-desk@2x.png'
                      }" alt="book cover: ${
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
