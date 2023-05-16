import { BookAPI } from './bookAPI';
import svgTrash from '../images/icons.svg';

const shoppingList = document.querySelector(".basketList");
const emptyShoppingList = document.querySelector(".emptyBasket");



const LOCALSTORAGE_KEY = "booksInShopingList";
let booksId = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
console.log(booksId.id.length);
const api = new BookAPI();

booksId.id.map(async (id) => {
  try {

    console.log(id);
    api.id = id
    const response = await api.getBooksById();
     console.log(response);
    emptyShoppingList.innerHTML = "";
         
    shoppingList.insertAdjacentHTML('beforeend',createShoppingCardMarkup(response));
      
  } catch (error) {
    console.log(error.message);
  }
})


function createShoppingCardMarkup({author, book_image, description, list_name, title, _id,buy_links}) {
  
  
  return  ` <li>
              <article class="basketCard">
                <button class="trashButton" type="button">
                  <svg width="20px" height="20px">
                    <use href=${svgTrash}#icon-trash></use>
                  </svg>
                </button>
                <div class="imgThumb">
                  <img
                    class="basketCard_Image"
                    src=${book_image}
                    alt=${title}
                  />
                </div>
                <div>
                  <h2 class="title">${title}</h2>
                  <p class="dump">Hardcover fiction</p>
                  <p class="description">
                    ${description || 'No description'}
                  </p>
                  
                    <p class="author underscription">${author}</p>
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
  