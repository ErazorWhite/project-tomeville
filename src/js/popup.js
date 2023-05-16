import { BookAPI } from './bookAPI';
import storage from './localStorage';
import { createBookMarkup } from './createMarkupModal';

let BOOK_ID;
const KEY_LS = 'booksInShopingList';
let BOOKS_IDS = {
  id: [],
};
const api = new BookAPI();
const { save, load } = storage;

const booksContainerEl = document.querySelector(
  '[data-action="booksContainer"]'
);
const backdropEl = document.querySelector('.js-backdrop');
const markDataContainerEl = document.querySelector(
  '[data-action="popup-data-markup"]'
);
const closePopupBtnEl = document.querySelector('.close-popup');
const addBookBtnEl = document.querySelector('.add-book-button');
const removeBookBtnEl = document.querySelector('.remove-book-button');
const removeBookTextEl = document.querySelector('.remove-book-text');

booksContainerEl.addEventListener('click', onBooksContainerClick);
backdropEl.addEventListener('click', onBackdropClick);
closePopupBtnEl.addEventListener('click', onCloseBtnClick);
addBookBtnEl.addEventListener('click', onAddBookBtnClick);
removeBookBtnEl.addEventListener('click', onRemoveBookBtnClick);

async function onBooksContainerClick(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }
  if (e.target.dataset.role === 'see-more-btn') {
    return;
  }
  try {
    // Тут робимо запит і передаємо данні на відмальовку у функцію
    BOOK_ID = e.target.closest('.book-card').dataset.id;
    api.id = BOOK_ID;
    const { book_image, title, author, description, buy_links } =
      await api.getBooksById();
    markDataContainerEl.innerHTML = createBookMarkup(
      book_image,
      title,
      author,
      description,
      buy_links[0].url,
      buy_links[1].url,
      buy_links[2].url
    );

    // Звертаємося до локалки і перевіряємо наявність книжки, в залеж. від відповіді виводим кнопку
    // додати або видалити
    BOOKS_IDS = load(KEY_LS) || {
      id: [],
    };
    if (BOOKS_IDS.id.includes(BOOK_ID)) {
      showAddOrRemoveBtn(true);
    } else {
      showAddOrRemoveBtn(false);
    }

    window.addEventListener('keydown', onEscPress);
    document.body.classList.add('show-popup');
  } catch {
    err => console.log(err.message);
  }
}

// Показуємо кнопку в залежності від значення флажка true or false.
function showAddOrRemoveBtn(bookInLs) {
  if (bookInLs) {
    removeBookBtnEl.removeAttribute('hidden');
    removeBookTextEl.removeAttribute('hidden');
  } else {
    addBookBtnEl.removeAttribute('hidden');
  }
}

function onAddBookBtnClick() {
  // Записуємо данні в локал сторейдж
  // Замінюємо кнопку на ремув
  BOOKS_IDS.id.push(BOOK_ID);
  save(KEY_LS, BOOKS_IDS);

  addBookBtnEl.setAttribute('hidden', true);
  removeBookBtnEl.removeAttribute('hidden');
  removeBookTextEl.removeAttribute('hidden');
}

function onRemoveBookBtnClick() {
  // Видаляємо дані з локалки
  // Замінюємо кнопку на едд
  const newArrr = BOOKS_IDS.id.filter(item => item !== BOOK_ID);
  BOOKS_IDS.id = newArrr;
  save(KEY_LS, BOOKS_IDS);
  removeBookBtnEl.setAttribute('hidden', true);
  removeBookTextEl.setAttribute('hidden', true);
  addBookBtnEl.removeAttribute('hidden');
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-popup');

  addBookBtnEl.setAttribute('hidden', true);
  removeBookBtnEl.setAttribute('hidden', true);
  removeBookTextEl.setAttribute('hidden', true);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseBtnClick();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseBtnClick();
  }
}

export { BOOKS_IDS };
