document.addEventListener('DOMContentLoaded', function () {
  // Получаем текущий путь страницы
  var path = window.location.pathname;

  // Находим кнопки вкладок
  var buttons = document.querySelectorAll('.header__btn');

  // Проходимся по всем кнопкам и проверяем, соответствует ли их текст кнопки текущему пути
  buttons.forEach(function (button) {
    if (button.textContent.trim() === 'Home' && path === '/') {
      // Добавляем класс "active" для подсветки активной вкладки
      button.classList.add('active');
    } else if (
      button.textContent.trim() === 'Shopping list' &&
      path === '/shopping_list.html'
    ) {
      // Добавляем класс "active" для подсветки активной вкладки
      button.classList.add('active');
    } else {
      // Удаляем класс "active" для всех остальных вкладок
      button.classList.remove('active');
    }
  });
});
