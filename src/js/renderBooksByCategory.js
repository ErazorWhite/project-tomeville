import { BookAPI } from './bookAPI';
import { spinerStart, spinerStop } from './spinner';

export async function displayBooksByCategory(category) {
  spinerStart();
  const bookAPI = new BookAPI();
  const booksContainer = document.querySelector('.js-books-container');
  const categoryTitle = booksContainer.querySelector('.js-category-title');
  const bookList = booksContainer.querySelector('.js-book-list');

  try {
    const books = await bookAPI.getBooksByCategory(category);

    // Обмежуємо кількість книг до 20
    const limitedBooks = books.slice(0, 20);

    // Створюємо розмітку для кожної книги
    const markup = limitedBooks
      .map(book => {
        return `
      <li class="book-card bs-books__item" data-id='${book._id}'>
      <a class="bs-books__link" href="#">
      <div class="bs-books__thumb">
        <img class="bs-books__picture" src="${book.book_image}" alt="${
          book.author
        } ${book.title}" loading="lazy">
      <p class="bs-books__view">quick view</p>
        </div>
      <div class="bs-books__box">
      <h3 class="bs-books__title">${book.title || 'No title'}</h3>
      <p class="bs-books__author">${book.author || 'No author'}</p>
        </div>
        </a>
    </li>`;
      })
      .join('');

    // Оновлення заголовка з обраною категорією

    categoryTitle.textContent = category;

    const array = categoryTitle.textContent.split(' ');
    const lastElement = array[array.length - 1];

    array.pop();

    const updatedTitle = array.join(' ');

    categoryTitle.textContent = updatedTitle;

    // titleLastWord.textContent = lastElement;

    const span = document.createElement('span');
    span.textContent = ` ${lastElement}`;
    // console.log(span.textContent);

    const accentLastWord = categoryTitle.appendChild(span);
    accentLastWord.classList.add('bs-books__accent');
    // console.log(titleLastWord.textContent);

    // Додаємо розмітку до контейнера з книгами
    bookList.innerHTML = markup;
  } catch (error) {
    console.error(error);
  }
  spinerStop();
}

export const booksByCategoryInitMarkup = `<h1 class="js-category-title bs-books__headline"></h1>
  <ul class="js-book-list books__list" data-action="booksContainer"></ul>`;