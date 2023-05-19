import { Notify } from 'notiflix';

import {
  createWishList,
  updateLocalStorageFromFirestore,
  getBookIdFromLocalStorage,
} from './authWithList';
// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

// -------------------відкриття вікна модалки----------------------
const openModalBtn = document.querySelector('.header__btn-signUp');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.backdrop-mob');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-hidden');
}
// -------------------База----------------------
import { firebaseConfig } from './authConfig';

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

//---------------Зареєстрований вхід на сайт

const authUserEmail = document.getElementById('user-email-auth');
const authUserPassword = document.getElementById('user-password-auth');

const authSingUpBtn = document.querySelector('.submitSingUpBtn');

authSingUpBtn.addEventListener('click', onSubmitSingUpBtn);

function onSubmitSingUpBtn(e) {
  e.preventDefault();

  const email = authUserEmail.value;
  const password = authUserPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notify.success('Вхід на сайт успішний');
    })
    .catch(error => {
      Notify.failure(`${error.message}`);
    });
  restoreSession();
  updateLocalStorageFromFirestore();
}
// updateLocalStorageFromFirestore();
//------------------- вхід та реєстрація нового користувача

const createNewUserAuth = document.querySelector('.createNewUserAuth');
const authUserName = document.getElementById('user-name-auth');

createNewUserAuth.addEventListener('click', onClickBtnToCreateNewUser);

function onClickBtnToCreateNewUser(e) {
  e.preventDefault();

  const email = authUserEmail.value;
  const password = authUserPassword.value;
  const name = authUserName.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: `${name}`,
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      })
        .then(() => {
          Notify.success('Реєстрація успішна');
        })
        .catch(error => {
          // An error occurred
          // ...
        });
      createWishList();
      //   seeDetailInfoUser(user);
      //   console.log(seeDetailInfoUser(user));
      // ...
    })
    .catch(error => {
      Notify.failure(`${error.message}`);
    });
}

//-----------------постійна вириф на сайті

const localStorageKey = 'authToken';

// Функція для збереження токена в localStorage
function saveAuthToken(token) {
  localStorage.setItem(localStorageKey, token);
}

// Функція для отримання токена з localStorage
function getAuthToken() {
  return localStorage.getItem(localStorageKey);
}

// Функція для відновлення сесії аутентифікації
function restoreSession() {
  const authToken = getAuthToken();
  if (authToken) {
    // Відновлюємо сесію з використанням токена
    // Наприклад, використовуючи authToken для входу користувача
    auth
      .signInWithCustomToken(authToken)
      .then(() => {
        console.log('Сесія відновлена!');
      })
      .catch(error => {
        console.error('Помилка відновлення сесії:', error);
      });
  }
}

// Слухач змін стану авторизації
onAuthStateChanged(auth, user => {
  if (user) {
    // Авторизований користувач
    const { uid } = user;
    console.log('Користувач авторизований:', uid);

    // Отримуємо токен після успішної авторизації
    user
      .getIdToken()
      .then(token => {
        // Зберігаємо токен в localStorage
        saveAuthToken(token);
      })
      .catch(error => {
        console.error('Помилка отримання токена:', error);
      });
  } else {
    // Неавторизований користувач
    console.log('Користувач не авторизований.');

    // Видаляємо токен з localStorage
    localStorage.removeItem(localStorageKey);
  }
});

// Відновлюємо сесію після перезавантаження сторінки
// restoreSession();

//-----------------ВИХІД із сайту
import { getAuth, signOut } from 'firebase/auth';

const singOut = document.querySelector('.singOut');
// booksInShoppingList;
singOut.addEventListener('click', onsignOutUser);

// Функція для виходу користувача
function onsignOutUser() {
  signOut(auth)
    .then(() => {
      console.log('Користувач вийшов з облікового запису');
      // Додаткові дії після виходу користувача
      removeItemFromLocalStorage('booksInShopingList');
    })
    .catch(error => {
      console.error('Помилка виходу користувача:', error);
    });
}
// Функція для очищення певного ключа і значення в localStorage
function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// Виклик функції для виходу користувача
// onsignOutUser();

//-----------------отримання інфи про користувача

// import { getAuth } from 'firebase/auth';

// const auth = getAuth();
// function seeDetailInfoUser(userInfo) {
//   const user = auth.currentUser;
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user.displayName;
//     console.log('Name:', displayName);
//     const email = user.email;
//     console.log('email:', email);
//     const photoURL = user.photoURL;
//     console.log('foto:', photoURL);
//     // const emailVerified = user.emailVerified;
//     // console.log(emailVerified);

//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//     const uid = user.uid;
// console.log(user.uid);
//   }
// }
// console.log(user);
//==========================додавання інформації про користувача============

// import { getAuth, updateProfile } from 'firebase/auth';
// const auth = getAuth();
// updateProfile(auth.currentUser, {
//   displayName: 'Jane Q. User',
//   photoURL: 'https://example.com/jane-q-user/profile.jpg',
// })
//   .then(() => {
//     // Profile updated!
//     // ...
//   })
//   .catch(error => {
//     // An error occurred
//     // ...
//   });
