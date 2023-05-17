import { BookAPI } from './bookAPI';
import svgTrash from '../images/icons.svg';
import noImg from '../images/noImage/noImage-desk@1x.png';
import { spinerStart, spinerStop } from './spinner';

const shoppingList = document.querySelector('.basketList');
const emptyShoppingList = document.querySelector('.emptyBasket');
shoppingList.addEventListener('click', onClick);
let data;
const LOCALSTORAGE_KEY = 'booksInShopingList';

spinerStart();

let booksId = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || { id: [] };

function onClick(evt) {
  if (
    evt.target.nodeName !== 'BUTTON' &&
    evt.target.nodeName !== 'svg' &&
    evt.target.nodeName !== 'use'
  ) {
    return;
  }
  const li = evt.target.closest('li');
  const dataId = li.dataset.id;

  const idToRemove = booksId.id.indexOf(dataId);
  if (idToRemove !== -1) {
    booksId.id.splice(idToRemove, 1);

    const updatedbBoksIdToString = JSON.stringify({
      id: booksId.id,
    });

    localStorage.setItem(LOCALSTORAGE_KEY, updatedbBoksIdToString);

    if (!booksId.id.length) {
      emptyShoppingList.innerHTML = `<div class="emptyShoppingList">
        <p class="emptyText">
          This page is empty, add some books and proceed to order.
        </p>
        <div class="thumbEmptyShoppingList"></div>
      </div>`;
      emptyShoppingList.style.display = '';
    }
    shoppingList.innerHTML = '';
    rendering();
  }
}

function rendering() {
  const api = new BookAPI();
  booksId.id.map(async id => {
    try {
      api.id = id;
      const response = await api.getBooksById();
      data = response;
      emptyShoppingList.innerHTML = '';
      emptyShoppingList.style.display = 'none';

      shoppingList.insertAdjacentHTML(
        'beforeend',
        createShoppingCardMarkup(response)
      );
    } catch (error) {
      console.log(error.message);
    }
  });
}
rendering();
spinerStop();

function createShoppingCardMarkup({
  author,
  book_image,
  description,
  title,
  _id,
  buy_links,
}) {
  return ` <li data-id="${_id}">
              <article class="basketCard">
                <button class="trashButton" type="button">
                  <svg width="20px" height="20px">
                    <use href=${svgTrash}#icon-trash></use>
                  </svg>
                </button>
                <div class="imgThumb">
                  <img
                    class="basketCard_Image"
                    src=${book_image || noImg}
                    alt=${title || 'No title'}
                  loading="lazy"/>
                </div>
                <div>
                  <h2 class="title">${title || 'No title'}</h2>
                  <p class="dump">Hardcover fiction</p>
                  <p class="description">
                    ${description || 'No description'}
                  </p>
                  
                    <p class="author underscription">${
                      author || 'No author'
                    }</p>
                    <ul class="basketBuyLink">
                      <li>
                        <a
                          href="${buy_links[0].url}" target="_blank">
                        <div class="thumbAmazon"></div>
                        </a>
                      </li>
                      <li>
                        <a                          
                          href="${buy_links[1].url}" target="_blank"
                          ><div class="thumbAppleBook"></div>
                        </a>
                      </li>
                      <li>
                        <a                         
                          href="${buy_links[4].url}" target="_blank"
                          >
                          <div class="thumbBookshop"></div>
                        </a>
                      </li>
                    </ul>
                  
                </div>
              </article>
            </li>`;
}
