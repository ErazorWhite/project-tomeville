import { BookAPI } from './BookAPI';

export async function displayBooksByCategory(category) {
  const bookAPI = new BookAPI();
  const booksContainer = document.querySelector('.books-container');
  const categoryTitle = booksContainer.querySelector('.category-title');
  const bookList = booksContainer.querySelector('.book-list');

  try {
    const books = await bookAPI.getBooksByCategory(category);

    // Обмежуємо кількість книг до 20
    const limitedBooks = books.slice(0, 20);

    // Створюємо розмітку для кожної книги
    const markup = limitedBooks.map(book => {
      return `
      <li class="book-card" data-book-id='${book._id}'>
      <a class="book-card__link" href="#">
      <div class="book-card__thumb">
        <img class="book-card__image" src="${book.book_image}" alt="${book.author} ${book.title}" loading="lazy">
      <p class="book-card__notification">quick view</p>
        </div>
      <div>
        <div>
          <p class="book-card__title">"${book.title}"</p>
        </div>
        <div>
          <p class="book-card__author">"${book.author}"</p>
        </div>
      </div>
      </a>
    </li>`;
    }).join('');

    // Оновлення заголовка з обраною категорією
    categoryTitle.textContent = category;

    // Додаємо розмітку до контейнера з книгами
    bookList.innerHTML = markup;
  } catch (error) {
    console.error(error);
  }
}

// // Приклад виклику функції для виведення книг з категорії 
// displayBooksByCategory('Paperback Nonfiction');
