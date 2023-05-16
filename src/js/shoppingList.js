import { BookAPI } from './bookAPI';
const shoppingList = document.querySelector(".basketList");
const emptyShoppingList = document.querySelector(".emptyBasket");
import svgTrash from '../images/icons.svg';

const LOCALSTORAGE_KEY = "booksInShopingList";
let booksId = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
console.log(booksId);
const api = new BookAPI();

booksId.id.map(async (id) => {
  try {

    console.log(id);
    api.id = id
    const response = await api.getBooksById();
     console.log(response);
    
         
    shoppingList.insertAdjacentHTML('beforeend',createShoppingCardMarkup(response));
      
  } catch (error) {
    console.log(error.message);
  }
})
// console.log(booking);
// booking.id = '643282b1e85766588626a0ba'
//  BOOK_ID = e.target.closest('.book-card').dataset.id;
//     api.id = BOOK_ID;
//     const { book_image, title, author, description, buy_links } =
//       await api.getBooksById();

//  const fetchBooksById = async () => {
//    try {
   
//     const response = await booking.getBooksById();
//      console.log(response);
//     // booksArr = response[0].books;
         
//     // shoppingList.innerHTML = createShoppingCardMarkup(booksArr);
      
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchBooksById();

  
// LOCALSTORAGE_KEY="";
// let booksArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

function createShoppingCardMarkup({author, book_image, description, list_name, title, _id,buy_links}) {
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
  
    return `<div class = "emptyShoppingList"><p class = "emptyText">This page is empty, add some books and proceed to order.</p>
    <div class="thumbEmptyShoppingList"></div></div>
            `
  }
  
  
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
                    ${description}
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
  //   input.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email || "";
  //   textArea.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message || "";
  // }
 
// }
  // createShoppingCardMarkup();