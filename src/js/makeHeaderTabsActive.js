document.addEventListener('DOMContentLoaded', function () {
  // Получаем текущий путь страницы
  const path = window.location.pathname;

  // Находим кнопки вкладок
  const navTabsEl = document.querySelectorAll('.header__btn');

  // Проходимся по всем кнопкам и проверяем, соответствует ли их текст кнопки текущему пути
  navTabsEl.forEach(function (navTab) {
    if (
      navTab.textContent.trim() === 'Home' &&
      (path === '/project-tomeville/' ||
        path === '/project-tomeville/index.html' ||
        path === '/index.html' ||
        path === '/')
    ) {
      // Добавляем класс "active" для подсветки активной вкладки
      navTab.classList.add('active');
    } else if (
      navTab.textContent.trim() === 'Shopping list' &&
      (path === '/shopping_list.html' || path === '/project-tomeville/shopping_list.html')
    ) {
      // Добавляем класс "active" для подсветки активной вкладки
      navTab.classList.add('active');
    } else {
      // Удаляем класс "active" для всех остальных вкладок
      navTab.classList.remove('active');
    }
  });
});
