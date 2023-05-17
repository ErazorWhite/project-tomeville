import { BookAPI } from './bookAPI';
import {
  displayBooksByCategory,
  booksByCategoryInitMarkup,
} from './renderBooksByCategory';
import { renderBestSellerBooks } from './bestSellerBooks';
import { bestSellersInitMarkup } from './renderMarkup';
import { refreshPopupDOM } from './popup';

let currentCategory = null; // Змінна для зберігання посилання на поточний елемент категорії
let allCategoriesEl = null;
const booksByCategoriesSectionEl = document.querySelector(
  '.js-books-container'
);
const bestSellerBooksSectionEl = document.querySelector('.bs-books__section');

// Функція для отримання та відображення категорій книг
async function displayBookCategories() {
  const bookAPI = new BookAPI();
  const categoriesList = document.querySelector('.categories-list');

  try {
    // Отримання списку об'єктів категорій книг з BookAPI
    const response = await bookAPI.getCategoryList();
    const categories = response.map(item => item.list_name);

    // Сортування категорій в алфавітному порядку
    categories.sort();

    // Створення розмітки категорій
    const markup = categories
      .map(
        category =>
          `<li class="categories-item" data-category="${category}">${category}</li>`
      )
      .join('');

    // Додавання розмітки до <ul> з початковим елементом
    categoriesList.innerHTML = `<li class="categories-item current_category" data-category="All categories">All categories</li>${markup}`;
    allCategoriesEl = document.querySelector(
      'li.categories-item[data-category="All categories"]'
    );
    currentCategory = allCategoriesEl;

    // Додаємо обробник подій кліку до кожного елемента категорії
    const categoryItems = document.querySelectorAll('.categories-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', handleCategoryClick);
    });
  } catch (error) {
    console.error(error);
  }
}

// Виклик функції для відображення категорій книг
displayBookCategories();

// Функція, яка буде викликатися при кліку на елемент категорії
function handleCategoryClick(event) {
  // Перевіряємо, чи був клік на іншому елементі категорії
  if (currentCategory !== event.target) {
    // Видаляємо клас "current_category" з попереднього поточного елемента
    if (currentCategory) {
      currentCategory.classList.remove('current_category');
    }

    // Додаємо клас "current_category" до нового поточного елемента
    event.target.classList.add('current_category');

    // Зберігаємо посилання на новий поточний елемент
    currentCategory = event.target;

    const category = event.target.dataset.category;

    // Викликаємо функцію для відображення книг за обраною категорією

    document.querySelector('.js-bs-books__section').innerHTML = '';
    if (event.target == allCategoriesEl) {
      hideSection(booksByCategoriesSectionEl);
      bestSellerBooksSectionEl.style.display = '';
      bestSellerBooksSectionEl.innerHTML = bestSellersInitMarkup;

      renderBestSellerBooks();
      refreshPopupDOM();
    } else {
      hideSection(bestSellerBooksSectionEl);
      booksByCategoriesSectionEl.style.display = '';
      booksByCategoriesSectionEl.innerHTML = booksByCategoryInitMarkup;

      displayBooksByCategory(category);
      refreshPopupDOM();
    }
  }
}

export function hideSection(sectionEl) {
  sectionEl.innerHTML = '';
  sectionEl.style.display = 'none';
}
