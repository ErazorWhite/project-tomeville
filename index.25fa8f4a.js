function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},s=t.parcelRequire3c29;null==s&&((s=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var s={id:e,exports:{}};return o[e]=s,t.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequire3c29=s),s("kyEFX").register(JSON.parse('{"5ZPII":"index.25fa8f4a.js","9c1dv":"noImage-desk@1x.1332fa8f.png","8bHsX":"index.cc7708d3.js"}'));var r,a=s("hkoFk");function i(t){return t.map((({list_name:t,books:o})=>`\n      <li class="bs-books__categories-item">\n        <h2 class="bs-books__category-title">${t}</h2>\n        <ul class="bs-books__list">\n          ${o.map((({_id:t,list_name:o,author:n,book_image:s,title:a})=>`\n              <li class="bs-books__item book-card" data-id="${t}">\n              <p class="bs-books__category">${o}</p>\n              <a class="bs-books__link" href="#">\n                  <div class="bs-books__thumb">\n                      <img src="${s||e(r)}" alt="book cover: ${a||"No title"}"class="bs-books__picture" width="335" height="485" loading="lazy">\n                      <p class="bs-books__view">quick view</p>\n                  </div>\n                  <div class="bs-books__box">\n                  <h3 class="bs-books__title">${a||"No title"}</h3>\n                  <p class="bs-books__author">${n||"No author"}</p>\n                  </div>\n                  </a>\n                  <div class="bs-books__button-box">\n                    <button class="bs-books__see-more-btn" type="button" data-role="see-more-btn" data-list="${o}">see more</button>\n                  </div>\n              </li>`)).join("")}\n        </ul>\n      </li>`)).join("")}r=new URL(s("kyEFX").resolve("9c1dv"),import.meta.url).toString();var c=s("7Y9D8"),l=s("04jNI");async function d(){(0,l.spinerStart)();const e=new(0,a.BookAPI),t=document.querySelector(".bs-books__categories-list"),o=await e.getTopBooks();0!=o.length?(i(o),t.insertAdjacentHTML("beforeend",i(o)),(0,l.spinerStop)()):c.Notify.failure("There are no books, sorry.")}document.querySelector(".js-bs-books__section").addEventListener("click",(function(e){const t=e.target.getAttribute("data-role");if(!t||"see-more-btn"!==t)return;const o=e.target.getAttribute("data-list");document.querySelector(`[data-category="${o}"]`).dispatchEvent(new Event("click"))})),d();a=s("hkoFk");var u={save:(e,t)=>{try{const o=JSON.stringify(t);localStorage.setItem(e,o)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:e=>{try{localStorage.removeItem(e)}catch(e){console.error("Get state error: ",e.message)}},clear:()=>{try{localStorage.clear()}catch(e){console.error("Get state error: ",e.message)}}};function b(t,o,n,s,a,i,c){return`<div class="popup-box-img"><img src="${t||e(r)}" alt="book cover: ${o||"No title"}" class="popup-img"></div>\n<div class="popup-text">\n  <h2 class="popup-title">${o||"No title"}</h2>\n  <p class="popup-author">${n||"No author"}</p>\n  <p class="popup-description">${s||"No description"}</p>\n  <ul class="popup-img-links">\n    <li class="popup-img-links__item">\n      <a href="${a}" target="_blank" rel="noreferrer noopener">\n        <div class="thumbAmazon popup-amazon-store"></div>\n      </a>\n    </li>\n    <li class="popup-img-links__item">\n      <a href="${i}" target="_blank" rel="noreferrer noopener">\n        <div class="thumbAppleBook popup-app-book-store"></div>\n      </a>\n    </li>\n    <li class="popup-img-links__item">\n      <a href="${c}" target="_blank" rel="noreferrer noopener">\n        <div class="thumbBookshop popup-book-store"></div>\n      </a>\n    </li>\n  </ul>\n</div>`}var p=s("jQ7WT");let k;let m={id:[]};const _=new(0,a.BookAPI),{save:g,load:y}=u;let h,v=document.querySelector('[data-action="booksContainer"]'),f=document.querySelector(".js-backdrop"),S=document.querySelector('[data-action="popup-data-markup"]'),q=document.querySelector(".close-popup"),w=document.querySelector(".add-book-button"),A=document.querySelector(".remove-book-button"),L=document.querySelector(".remove-book-text");function $(){v=document.querySelector('[data-action="booksContainer"]'),f=document.querySelector(".js-backdrop"),S=document.querySelector('[data-action="popup-data-markup"]'),q=document.querySelector(".close-popup"),w=document.querySelector(".add-book-button"),A=document.querySelector(".remove-book-button"),L=document.querySelector(".remove-book-text"),j()}function j(){v.addEventListener("click",E),f.addEventListener("click",H),q.addEventListener("click",B),w.addEventListener("click",N),A.addEventListener("click",I)}async function E(e){if(e.preventDefault(),e.currentTarget!==e.target&&"see-more-btn"!==e.target.dataset.role)try{k=e.target.closest(".book-card").dataset.id,_.id=k;const{book_image:t,title:o,author:n,description:s,buy_links:r}=await _.getBooksById();S.innerHTML=b(t,o,n,s,r[0].url,r[1].url,r[4].url),m=y("booksInShopingList")||{id:[]},m.id.includes(k)?x(!0):x(!1),window.addEventListener("keydown",T),document.body.classList.add("show-popup");h=!1?"enableBodyScroll":"disableBodyScroll",p[h](document.body)}catch{}}function x(e){e?(A.removeAttribute("hidden"),L.removeAttribute("hidden")):w.removeAttribute("hidden")}function N(){m.id.push(k),g("booksInShopingList",m),w.setAttribute("hidden",!0),A.removeAttribute("hidden"),L.removeAttribute("hidden")}function I(){const e=m.id.filter((e=>e!==k));m.id=e,g("booksInShopingList",m),A.setAttribute("hidden",!0),L.setAttribute("hidden",!0),w.removeAttribute("hidden")}function B(){window.removeEventListener("keydown",T),document.body.classList.remove("show-popup"),p.enableBodyScroll(document.body),w.setAttribute("hidden",!0),A.setAttribute("hidden",!0),L.setAttribute("hidden",!0)}function H(e){e.currentTarget===e.target&&B()}function T(e){"Escape"===e.code&&B()}j(),s("74Aiq"),s("1wkNH"),s("3oIZ9");a=s("hkoFk"),a=s("hkoFk"),l=s("04jNI");async function C(e){(0,l.spinerStart)();const t=new(0,a.BookAPI),o=document.querySelector(".js-books-container"),n=o.querySelector(".js-category-title"),s=o.querySelector(".js-book-list");try{const o=await t.getBooksByCategory(e),r=o.slice(0,20).map((e=>`\n      <li class="book-card bs-books__item" data-id='${e._id}'>\n      <a class="bs-books__link" href="#">\n      <div class="bs-books__thumb">\n        <img class="bs-books__picture" src="${e.book_image}" alt="${e.author} ${e.title}" loading="lazy">\n      <p class="bs-books__view">quick view</p>\n        </div>\n      <div class="bs-books__box">\n      <h3 class="bs-books__title">${e.title||"No title"}</h3>\n      <p class="bs-books__author">${e.author||"No author"}</p>\n        </div>\n        </a>\n    </li>`)).join("");n.textContent=e;const a=n.textContent.split(" "),i=a[a.length-1];a.pop();const c=a.join(" ");n.textContent=c;const l=document.createElement("span");l.textContent=` ${i}`;n.appendChild(l).classList.add("bs-books__accent"),s.innerHTML=r}catch(e){console.error(e)}(0,l.spinerStop)()}let F=null,M=null;const O=document.querySelector(".js-books-container"),R=document.querySelector(".bs-books__section");function P(e){if(F!==e.target){F&&F.classList.remove("current_category"),e.target.classList.add("current_category"),F=e.target;const t=e.target.dataset.category;document.querySelector(".js-bs-books__section").innerHTML="",e.target==M?(z(O),R.style.display="",R.innerHTML='<h1 class="bs-books__headline">Best Sellers <span class="bs-books__accent">Books</span></h1>\n        <ul class="bs-books__categories-list" data-action="booksContainer">\n        </ul>',d(),$()):(z(R),O.style.display="",O.innerHTML='<h1 class="js-category-title bs-books__headline"></h1>\n  <ul class="js-book-list books__list" data-action="booksContainer"></ul>',C(t),$())}}function z(e){e.innerHTML="",e.style.display="none"}!async function(){const e=new(0,a.BookAPI),t=document.querySelector(".categories-list");try{const o=(await e.getCategoryList()).map((e=>e.list_name));o.sort();const n=o.map((e=>`<li class="categories-item" data-category="${e}">${e}</li>`)).join("");t.innerHTML=`<li class="categories-item current_category" data-category="All categories">All categories</li>${n}`,M=document.querySelector('li.categories-item[data-category="All categories"]'),F=M;document.querySelectorAll(".categories-item").forEach((e=>{e.addEventListener("click",P)}))}catch(e){console.error(e)}}(),s("hw4Fk"),s("ciMc1"),s("8Wl2i");
//# sourceMappingURL=index.25fa8f4a.js.map
