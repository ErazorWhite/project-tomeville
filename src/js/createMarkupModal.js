import noImg from '../images/noImage/noImage-desk@1x.png';

export function createBookMarkup(
  bookImg,
  title,
  author,
  description,
  urlAmaz,
  urlApBooks,
  urlBookShop
) {
  return `<div class="popup-box-img"><img src="${
    bookImg || noImg
  }" alt="book cover: ${title || 'No title'}" class="popup-img"></div>
<div class="popup-text">
  <h2 class="popup-title">${title || 'No title'}</h2>
  <p class="popup-author">${author || 'No author'}</p>
  <p class="popup-description">${description || 'No description'}</p>
  <ul class="popup-img-links">
    <li class="popup-img-links__item">
      <a href="${urlAmaz}" target="_blank" rel="noreferrer noopener">
        <div class="thumbAmazon popup-amazon-store"></div>
      </a>
    </li>
    <li class="popup-img-links__item">
      <a href="${urlApBooks}" target="_blank" rel="noreferrer noopener">
        <div class="thumbAppleBook popup-app-book-store"></div>
      </a>
    </li>
    <li class="popup-img-links__item">
      <a href="${urlBookShop}" target="_blank" rel="noreferrer noopener">
        <div class="thumbBookshop popup-book-store"></div>
      </a>
    </li>
  </ul>
</div>`;
}
