// -------------------вище відкриття вікна----------------------
const openModalBtn = document.querySelector('.header__btn-signUp');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.backdrop-mob');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-hidden');
}
// -------------------База----------------------

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCJAOTWdW4YFDXLw33dbcJbIhZSWyOgCtw',
  authDomain: 'projectbookteam12.firebaseapp.com',
  projectId: 'projectbookteam12',
  storageBucket: 'projectbookteam12.appspot.com',
  messagingSenderId: '819774726263',
  appId: '1:819774726263:web:3fc239386c7202c760e672',
  measurementId: 'G-8YH8CY6V4P',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const authUserEmail = document.getElementById('user-email-auth');
const authUserPassword = document.getElementById('user-password-auth');

const authSingUpBtn = document.querySelector('.submitSingUpBtn');

authSingUpBtn.addEventListener('click', onSubmitSingUpBtn);

function onSubmitSingUpBtn(e) {
  e.preventDefault();

  const email = authUserEmail.value;
  //   console.log(email);
  const password = authUserPassword.value;
  //   console.log(password);
  // const name = authUserName.value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      //   seeDetailInfoUser(user);
      //   console.log(seeDetailInfoUser(user));
      // ...
    })
    .catch(error => {
      alert(error.message);
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
    });
}
//------------------- новий користувач
const createNewUserAuth = document.querySelector('.createNewUserAuth');
const authUserName = document.getElementById('user-name-auth');

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

createNewUserAuth.addEventListener('click', onClickBtnToCreateNewUser);

function onClickBtnToCreateNewUser(e) {
  e.preventDefault();

  const email = authUserEmail.value;
  //   console.log(email);
  const password = authUserPassword.value;
  //   console.log(password);
  const name = authUserName.value;
  const auth = getAuth();

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
          // testInitBox.classList.toggle('is-hidden');
          // Profile updated!
          // ...
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
      alert(error.message);
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
    });
}
//-----------------отримання інфи про користувача

// import { getAuth } from 'firebase/auth';

// const auth = getAuth();
function seeDetailInfoUser(userInfo) {
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    console.log('Name:', displayName);
    const email = user.email;
    console.log('email:', email);
    const photoURL = user.photoURL;
    console.log('foto:', photoURL);
    // const emailVerified = user.emailVerified;
    // console.log(emailVerified);

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
    // console.log(user.uid);
  }
}
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

//--------------------Льох
// import * as firestore from 'firebase/firestore';
// import { collection, addDoc } from 'firebase/firestore';
// const db = firestore.getFirestore(app);

// const addnewBook = document.querySelector('.newbook');

// // addnewBook.addEventListener('click', addBookToWishList);

// async function addBookToWishList(e) {
//   const email = authUserEmail.value;
//   //   console.log(email);
//   const password = authUserPassword.value;

//   await addDoc(collection(db, 'users'), {
//     first: `${email}`,
//     last: `${password}`,
//     //   born: 'born',
//   })
//     // console.log('Document written with ID: ', docRef.id);
//     .catch(e => console.error('Error adding document: ', e));
// }
// import * as firestore from 'firebase/firestore';
// import { collection, addDoc } from 'firebase/firestore';
// const db = firestore.getFirestore(app);

// const createNewUserAuth = document.querySelector('.createNewUserAuth');
// const authUserName = document.getElementById('user-name-auth');

// createNewUserAuth.addEventListener('click', onClickBtnToCreateNewUser);
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// function onClickBtnToCreateNewUser(e) {
//     e.preventDefault();

//     const colectRef = collection()
// }
//--------------------------------
//--------створення кошика користувача
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import storage from './localStorage';
const { save, load } = storage;

const database = getFirestore(app);

const collectionRef = collection(database, 'shopping-list');

// const addnewBook = document.querySelector('.newbook');
let userID = 0;
// addnewBook.addEventListener('click', addBookToWishList);

function createWishList() {
  if (localStorage.getItem('createWishList') !== '') {
    addDoc(collectionRef, {
      KEY_LS: 'booksInShopingList',
    })
      .then(resp => resp.json)
      // .then(collectionRef => collectionRef.id)

      .catch(e => {
        alert('not');
      });
  } else {
    error => console.log(error);
  }
  const documentId = collectionRef.id;
  console.log('ID нового документа:', documentId);
}

// const newDocRef = await addDoc(collectionRef, {
//   /* дані вашого документа */
// });
// const documentId = newDocRef.id;
// console.log('ID нового документа:', documentId);

// import {
//   getFirestore,
//   collection,
//   doc,
//   addDoc,
//   setDoc,
// } from 'firebase/firestore';
// import storage from './localStorage';
// const { save, load } = storage;
// // const app = initializeApp(firebaseConfig);
// const database = getFirestore(app);

// const collectionRef = doc(collection(database, 'basket'));

// const addnewBook = document.querySelector('.newbook');

// addnewBook.addEventListener('click', addBookToWishList);

// const collectionRef = collection(database, 'basket');

export function addBookToWishList(value) {
  // e.preventDefault();
  // const email = authUserEmail.value;
  // console.log(email);
  // const password = authUserPassword.value;
  // console.log(password);

  // const newbook = authUserName.value;
  if (localStorage.getItem('booksInShopingList') !== '') {
    addDoc(collectionRef, {
      KEY_LS: 'booksInShopingList',
      BOOKS_IDS: `${value}`,
    })
      // .then(() => {
      //   alert('OK');
      // })
      .catch(e => {
        alert('not');
      });
  } else {
    console.log(error);
  }
}
//-------------------------Додавання книжки в бібліотеку
// Add a second document with a generated ID.
// import { addDoc, collection } from 'firebase/firestore';

// const addnewBook = document.querySelector('.addbook');

// addnewBook.addEventListener('click', addBookToWishList);

// // // try {
// // //     const docRef = await
// function addBookToWishList() {
//   const newBook = authUserName.value;
//   addDoc(
//     (collectionRef,
//     {
//       booksInShopingList: `${newBook}`,
//     })
//   );
//     //   console.log('Document written with ID: ', docRef.id);
//     .catch(e => {
//       console.error('Error adding document: ', e);
//     });
// }
//_------------------отримати значення сховища
// const addnewBook = document.querySelector('.addbook');

// addnewBook.addEventListener('click', getData);
// import { getDocs } from 'firebase/firestore';

function getData() {
  return getDocs(collectionRef).then(resp => {
    console.log(
      resp.docs.map(item => {
        return { id: item.id };
        // return { ...item.data(), id: item.id };
      })
    );
  });
}
//-------------------------оновленння
// doc,update
const addnewBook = document.querySelector('.addbook');

addnewBook.addEventListener('click', updateList);

// const idList=

function updateList(bookId) {
  const toUpdate = doc(database, 'basket', idList);
  updateDoc(toUpdate, {
    BOOKS_IDS: `${bookId}`,
  })
    .then(() => alert('list updated'))
    .catch(e => alert(e.message));
}

//--------------------видалення
deleteDoc;

function deleteList(bookId) {
  const toDel = doc(database, 'basket', idList);
  deleteDoc(toUpdate, {
    BOOKS_IDS: `${bookId}`,
  })
    .then(() => alert('list updated'))
    .catch(e => alert(e.message));
}
// const auth = getAuth();

// function createUserWithEmailAndPassword(auth, email, password)
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//   createNewUser(email, password, name);
//-------------------------------------------
// function authOnWebSite(email, password) {
//   const SERCH_PARAMS = new URLSearchParams({
//     key: API_KEY,
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       password,
//       returnSecureToken: true,
//     }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   const URL = `${BASE_URL}?${SERCH_PARAMS}`;

//   return fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         email,
//         password,
//         returnSecureToken: true,
//       }),
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then(resp => resp.json())
//     .then(data => console.log(data));
// }

// // ----------------------------Автоизація---------
// const authUserEmail = document.getElementById('user-email-auth');
// const authUserPassword = document.getElementById('user-password-auth');

// const authSingUpBtn = document.querySelector('.submitSingUpBtn');

// authSingUpBtn.addEventListener('click', onSubmitSingUpBtn);

// function onSubmitSingUpBtn(e) {
//   e.preventDefault();

//   const email = authUserEmail.value;
//   const password = authUserPassword.value;

//   authOnWebSite(email, password);
// }

// //----------------------створення новго користувача-----------

// const createNewUserAuth = document.querySelector('.createNewUserAuth');

// createNewUserAuth.addEventListener('click', onClickBtnToCreateNewUser);

// function onClickBtnToCreateNewUser(e) {
//   e.preventDefault();

//   const email = authUserEmail.value;
//   const password = authUserPassword.value;
//   const name = authUserName.value;

//   createNewUser(email, password, name);
// }

// function createNewUser(email, password, name) {
//   return fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         email,
//         password,
//         returnSecureToken: true,
//       }),
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then(resp => resp.json())
//     .then(data => {
//       addNameToNewUser(data.idToken, name);
//     });
// }

// //-----------------Додавання імя користувача------------
// const authUserName = document.getElementById('user-name-auth');

// function addNameToNewUser(id, name) {
//   return fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         idToken: `${id}`,
//         displayName: `${name}`,

//         returnSecureToken: true,
//       }),
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then(resp => resp.json())
//     .then(data => console.log(data));
// }

// // ------------------------------------------------------

// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from 'firebase/analytics';
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: 'AIzaSyCJAOTWdW4YFDXLw33dbcJbIhZSWyOgCtw',
// //   authDomain: 'projectbookteam12.firebaseapp.com',
// //   projectId: 'projectbookteam12',
// //   storageBucket: 'projectbookteam12.appspot.com',
// //   messagingSenderId: '819774726263',
// //   appId: '1:819774726263:web:3fc239386c7202c760e672',
// //   measurementId: 'G-8YH8CY6V4P',
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// // const auth = getAuth();
// // createUserWithEmailAndPassword(auth, email, password)
// //   .then(userCredential => {
// //     // Signed in
// //     const user = userCredential.user;
// //     // ...
// //   })
// //   .catch(error => {
// //     const errorCode = error.code;
// //     const errorMessage = error.message;
// //     // ..
// //   });

// // console.log(auth)
