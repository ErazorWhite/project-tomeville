export function createBookMarkup(
  bookImg,
  title,
  author,
  description,
  urlAmaz,
  urlApBooks,
  urlBarnAndNob
) {
  return `<img src="${
    bookImg || 'src/images/noimage/noImage-desk@2x.png'
  }" alt="book cover: ${title || 'No title'}"
  width="100" height="100">
  <h2>${title || 'No title'}</h2>
  <p>${author || 'No author'}</p>
  <p>${description || 'No description'}</p>
  <a href="${urlAmaz}" target="_blank" rel="noreferrer noopener">Amazon</a>
<a href="${urlApBooks}" target="_blank" rel="noreferrer noopener">Apple Books</a>
<a href="${urlBarnAndNob}" target="_blank" rel="noreferrer noopener">Barnes and Noble</a>`;
}
