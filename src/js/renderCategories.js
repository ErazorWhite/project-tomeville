import { BookAPI } from './bookAPI';
import { displayBooksByCategory } from './renderBooksByCategory';
import { spinerStart, spinerStop } from './spinner';

let currentCategory = null; // Змінна для зберігання посилання на поточний елемент категорії

// Функція для отримання та відображення категорій книг
async function displayBookCategories() {
  spinerStart();
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
    categoriesList.innerHTML = `<li class="categories-item">All categories</li>${markup}`;

    // Додаємо обробник подій кліку до кожного елемента категорії
    const categoryItems = document.querySelectorAll('.categories-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', handleCategoryClick);
    });
  } catch (error) {
    console.error(error);
  }
  spinerStop();
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
    displayBooksByCategory(category);
  }
}
