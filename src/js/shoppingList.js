import { BookAPI } from './bookAPI';
import svgTrash from '../images/icons.svg';
import noImg from '../images/noImage/noImage-desk@1x.png';
import storage from './localStorage';
// import {BOOKS_IDS} from "./popup"

const shoppingList = document.querySelector(".basketList");
const emptyShoppingList = document.querySelector(".emptyBasket");
shoppingList.addEventListener("click", onClick);
let data;
const LOCALSTORAGE_KEY = "booksInShopingList";


let booksId = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
console.log(booksId.id);

function onClick(evt) {
  console.log(evt.target);
  if (evt.target.nodeName !== "BUTTON" && evt.target.nodeName !== "svg" && evt.target.nodeName !== "use" ) {
    return;
  }
  const li = evt.target.closest('li');
  const dataId = li.dataset.id;
  // console.log(dataId);
  
  const idToRemove = booksId.id.indexOf(dataId);
  console.log(idToRemove);
  if (idToRemove !== -1) {
    booksId.id.splice(idToRemove, 1)
    console.log(booksId.id);
    
const updatedbBoksIdToString = JSON.stringify({
  id: booksId.id,
});

    localStorage.setItem(LOCALSTORAGE_KEY, updatedbBoksIdToString);
    
    console.log(booksId.id.length);
   if (!booksId.id.length) {
    emptyShoppingList.innerHTML = `<div class="emptyShoppingList">
        <p class="emptyText">
          This page is empty, add some books and proceed to order.
        </p>
        <div class="thumbEmptyShoppingList"></div>
      </div>`
   }
    // emptyShoppingList.innerHTML = "";
    shoppingList.innerHTML = "";
      rendering();
    
  }
}


function rendering() {
  const api = new BookAPI();
booksId.id.map(async (id) => {
  try {

    // console.log(id);
    api.id = id
    const response = await api.getBooksById();
    data = response
    //  console.log(response);
    emptyShoppingList.innerHTML = "";
         
    shoppingList.insertAdjacentHTML('beforeend', createShoppingCardMarkup(response));
    // /
  
    // onClick()
  } catch (error) {
    console.log(error.message);
  }
})
}
rendering();

function createShoppingCardMarkup({author, book_image, description,title, _id,buy_links}) {
  
  
  return  ` <li data-id="${_id}">
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
                  />
                </div>
                <div>
                  <h2 class="title">${title || 'No title'}</h2>
                  <p class="dump">Hardcover fiction</p>
                  <p class="description">
                    ${description || 'No description'}
                  </p>
                  
                    <p class="author underscription">${author || 'No author'}</p>
                    <ul class="basketBuyLink">
                      <li>
                        <a
                          href="${buy_links[0].url}">
                        <div class="thumbAmazon"></div>
                        </a>
                      </li>
                      <li>
                        <a                          
                          href="${buy_links[1].url}"
                          ><div class="thumbAppleBook"></div>
                        </a>
                      </li>
                      <li>
                        <a                         
                          href="${buy_links[4].url}"
                          >
                          <div class="thumbBookshop"></div>
                        </a>
                      </li>
                    </ul>
                  
                </div>
              </article>
            </li>`
    
  
}
  