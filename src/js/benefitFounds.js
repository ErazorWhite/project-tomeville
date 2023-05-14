let menuElem = document.getElementById('button');
    let titleElem = menuElem.querySelector('.title');

    titleElem.onclick = function() {
      menuElem.classList.toggle('open');
    };