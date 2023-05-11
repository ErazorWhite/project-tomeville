export default function renderBookCardsMarkup(books) {
  const markup = books
    .map(
      ({ _id, book_image, title, author }) => `
  <li data-book-id='${_id}'>
  <a href="#">
  <div>
    <img src="${book_image}" alt="book" loading="lazy">
  </div>
  <div>
    <div>
      <p>"${title}"</p>
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


