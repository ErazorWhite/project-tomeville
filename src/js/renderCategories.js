import { BookAPI } from './BookAPI';

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
    .map(category => `<li class="categories-item" data-category="${category}">${category}</li>`)
    .join('');

    // Додавання розмітки до <ul> з початковим елементом
    categoriesList.innerHTML = `<li class="categories-item">Усі категорії</li>${markup}`;
  } catch (error) {
    console.error(error);
  }
}

// Виклик функції для відображення категорій книг
displayBookCategories();
