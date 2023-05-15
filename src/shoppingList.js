import { BookAPI } from "./js/bookAPI";
const shoppingList = document.querySelector(".basketList");
const emptyShoppingList = document.querySelector(".emptyBasket");
import svgTrash from './images/icons.svg';

const booking = new BookAPI();
console.log(booking);
let booksArr = [];


 const fetchBooks = async () => {
  try {
    const response = await booking.getTopBooks();
     
    booksArr = response[0].books;
         
    shoppingList.innerHTML = createShoppingCardMarkup(booksArr);
      
  } catch (error) {
    console.log(error.message);
  }
};

fetchBooks();

  
// LOCALSTORAGE_KEY="";
// let booksArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
let localStorageArrOfId = "1";
function createShoppingCardMarkup(booksArr) {
  if (!localStorageArrOfId) {
  
    return `<div class = "emptyShoppingList"><p class = "emptyText">This page is empty, add some books and proceed to order.</p>
    <div class="thumbEmptyShoppingList"></div></div>
            `
  }
  
  
  return booksArr.map(({ author, book_image, description, list_name, title, _id,buy_links}) => 
    ` <li>
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
                    In a homage to Louisa May Alcott’s “Little Women,” a young
                    man’s dark past resurfaces as he gets to the know the family
                    of his college sweetheart.
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
    
  ).join("");
}
  //   input.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email || "";
  //   textArea.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message || "";
  // }
 
// }
  // createShoppingCardMarkup();