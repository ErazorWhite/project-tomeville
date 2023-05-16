import { BookAPI } from './BookAPI';

export async function displayBooksByCategory(category) {
  const bookAPI = new BookAPI();
  const booksContainer = document.querySelector('.js-books-container');
  const categoryTitle = booksContainer.querySelector('.js-category-title');
  const bookList = booksContainer.querySelector('.js-book-list');
  const titleLastWord = document.querySelector('.bs-books__accent');


  try {
    const books = await bookAPI.getBooksByCategory(category);

    // Обмежуємо кількість книг до 20
    const limitedBooks = books.slice(0, 20);

    // Створюємо розмітку для кожної книги
    const markup = limitedBooks.map(book => {
      return `
      <li class="book-card bs-books__item" data-book-id='${book._id}'>
      <a class="bs-books__link" href="#">
      <div class="bs-books__thumb">
        <img class="bs-books__picture" src="${book.book_image}" alt="${book.author} ${book.title}" loading="lazy">
      <p class="bs-books__view">quick view</p>
        </div>
      <div class="bs-books__box">
      <h3 class="bs-books__title">${book.title || 'No title'}</h3>
      <p class="bs-books__author">${book.author || 'No author'}</p>
        </div>
        </a>
    </li>`;
    }).join('');

    // Оновлення заголовка з обраною категорією

    categoryTitle.textContent = category;
//     // console.log(categoryTitle.textContent);
//     const array = categoryTitle.textContent.split(' ');
//     const lastElement = array[array.length-1];
//     // console.log(lastElement);

//     array.pop();
//     const updatedTitle = array.join(' ');
//     // console.log(updatedTitle);
//     categoryTitle.textContent = updatedTitle;

//     titleLastWord.textContent = lastElement;
//     console.dir(categoryTitle);
//     console.dir(titleLastWord);
// console.log(titleLastWord.textContent);


    // Додаємо розмітку до контейнера з книгами
    bookList.innerHTML = markup;
  } catch (error) {
    console.error(error);
  }
}

// // Приклад виклику функції для виведення книг з категорії 
// displayBooksByCategory('Paperback Nonfiction');
