// openPopupBtnEl - карточка однієї книги, скоріше всього потрібно буде вибирати всі картки, весь блок і вішати на нього слухач,
// а вже по таргету чи айді куди ми попали вибирати данй елемент. Освіжити память як вішати слухач на весь блок і які там перевірки
// на місс клік, поле блоку і на саму картку.
//добавити кнопку при якій відкривається шопінг ліст Add to shopping list дані якого зберігаються в локал сторедж,
// не забути попередньо додати перевірку на вже наявність такої книги в шопінг літсі і при наявності змінювати кнопку на remove from the shopping list
// + Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.
// то саме маємо виводити після успішного додавання книги до локалки.
import storage from './localStorage';
storage.save('qwe', 'test');
storage.save('more', 'more than more');
const findIncludes = storage.load('qwe');
console.log(findIncludes);

const openPopupEl = document.querySelector('[data-action="open-popup"]');
const backdropEl = document.querySelector('.js-backdrop');
const popupEl = document.querySelector('.popup');

openPopupEl.addEventListener('click', onCardBookClick);
backdropEl.addEventListener('click', onBackdropClick);

const BOOK_IS_IN_LOCAL_STORAGE = true;

function onCardBookClick() {
  popupEl.innerHTML = createBookMarckup();
  // При кліку по книзі ми відкриваємо модалку і в ній малюємо розмітку, можна добавити лоадер, поки розмітка лаюється,
  // або спочатку малюємо розмітку і вже потім відкриваємо модалку, скоріше всього так, щоб при відкритій модалці під час малювання
  // все не пригало і скакало, а так розмітка готова хлоп і відкрилась модалка намальована вже.
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-popup');

  const closePopupBtnEl = document.querySelector('[data-action="close-popup"]');
  closePopupBtnEl.addEventListener('click', onCloseBtnClick);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-popup');
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

function createBookMarckup() {
  return BOOK_IS_IN_LOCAL_STORAGE
    ? `<button type="button" data-action="close-popup">Close popup</button><img src="" alt="">
<title>Book name</title>
<p>Category</p>
<p>Short description</p>
<p>Author</p>
<a href="">Link Amazon</a>
<a href="">Link More</a>
<a href="">Link else</a>
<button type="button" class="remove-book-button">Remove from the shopping list</button>
<p class="remove-book-button-show">Congratulations! You have added the book to the shopping list. To delete,
            press the button “Remove from the shopping
            list”.</p>`
    : `<button type="button" data-action="close-popup">Close popup</button><img src="" alt="">
    <title>Book name</title>
<p>Category</p>
<p>Short description</p>
<p>Author</p>
<a href="">Link Amazon</a>
<a href="">Link More</a>
<a href="">Link else</a>
<button type="button" class="add-book-button">Add to shopping list</button>`;
}
