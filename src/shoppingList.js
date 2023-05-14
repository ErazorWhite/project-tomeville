import { BookAPI } from "./js/bookAPI";
console.log("hello");
const booking = new BookAPI();
booking.getBooksByCategory();
console.log(booking.getBooksByCategory());
  
LOCALSTORAGE_KEY="";
let booksArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

function createShoppingCardMarkup(booksArr) {
  
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
     
    booksArr.map((book) => {
      
        `<p>This page is empty, add some books and proceed to order.</p>
            <picture>
              <source
                srcset="./images/emptyList@mobile.png 1x"
                media="(max-width: 767px)"
              />
              <source
                srcset="./images/emptyList@tab.png 1x"
                media="(max-width: 1199px)"
              />
              <source
                srcset="./images/emptyList@desk.png 1x"
                media="(min-width: 1200px)"
              />
              <img
                src="./images/noImage/noImage-mob-large@2x.png"
                alt="cover"
              />
            </picture>`
        ` <li>
              <article class="basketCard">
                <button class="trashButton" type="button">
                  <svg width="20px" height="20px">
                    <use href="./images/icons.svg#icon-trash"></use>
                  </svg>
                </button>
                <div class="imgThumb">
                  <img
                    class="basketCard_Image"
                    src="./images/noImage/noImage-mob@2x.png"
                    alt="#"
                  />
                </div>
                <div>
                  <h2 class="cardHeader">Hello Beautiful</h2>
                  <p class="dump">Hardcover fiction</p>
                  <p class="description">
                    In a homage to Louisa May Alcott’s “Little Women,” a young
                    man’s dark past resurfaces as he gets to the know the family
                    of his college sweetheart.
                  </p>
                  <div class="underscribe">
                    <p class="author">Ann Napolitano</p>
                    <ul class="basketBuyLink">
                      <li>
                        <a class="buyLink" href="https://www.amazon.com"
                          ><img
                            src="./images/modal/image-3@1x.png"
                            width="16px"
                            height="16px"
                            alt="#"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          class="buyLink basketBuyLink"
                          href="https://www.amazon.com"
                          ><img
                            src="./images/modal//image-2@1x.png"
                            width="16px"
                            height="16px"
                            alt="#"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          class="buyLink basketBuyLink"
                          href="https://www.amazon.com"
                          ><img
                            src="./images/modal/image-1@1x.png"
                            width="32px"
                            height="11px"
                            alt="#"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </li>`
    })
    
    input.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email || "";
    textArea.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message || "";
  }
 
}