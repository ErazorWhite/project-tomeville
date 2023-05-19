import { Notify } from 'notiflix';
// // Notiflix.Notify.success('Sol lucet omnibus');

// // Notiflix.Notify.failure('Qui timide rogat docet negare');

// // Notiflix.Notify.warning('Memento te hominem esse');

// // Notiflix.Notify.info('Cogito ergo sum');

import { firebaseConfig } from './authConfig';

import { initializeApp } from 'firebase/app';

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

//--------створення кошика користувача
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

// import { getFirestore, doc, getDoc } from 'firebase/firestore';

const database = getFirestore(app);

const collectionRef = collection(database, 'shopping-list');

//------------------------Локалка доступ до кошика на бек

const localStorageKey = 'userWishList';

function getBookIdFromLocalStorage() {
  return localStorage.getItem(localStorageKey);
}
//--------------------------

export function createWishList() {
  if (localStorage.getItem('createWishList') !== '') {
    const collectionRef = collection(database, 'shopping-list');
    addDoc(collectionRef, {
      KEY_LS: 'booksInShopingList',
      BOOKS_IDS: '',
    })
      .then(newDocRef => {
        documentId = newDocRef.id;
        localStorage.setItem(localStorageKey, documentId);
        updateLocalStorageFromFirestore();
        // console.log('ID нового документа:', documentId);
      })
      .catch(error => {
        // alert('Помилка при створенні документа:', error);
      });
  } else {
    // console.log('Не вдалося створити список бажань. Локальне сховище порожнє.');
  }
}

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

//------------------отримати значення сховища

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
//-------------------------додавання

// const addnewBook = document.querySelector('.addbook');
export function getBookIdFromLocalStorage() {
  return localStorage.getItem(localStorageKey);
  //   console.log(localStorage.getItem(localStorageKey));
}
// addnewBook.addEventListener('click', updateList);

export function updateList(value) {
  const toUpdate = doc(database, 'shopping-list', getBookIdFromLocalStorage());
  updateDoc(toUpdate, {
    KEY_LS: 'booksInShopingList',
    BOOKS_IDS: `${value}`,
  })
    .then(() => Notify.success('Book added'))
    .catch(e => Notify.failure(`${e.message}`));
}

//--------------------видалення

export function deleteList(value) {
  const toDel = doc(database, 'shopping-list', getBookIdFromLocalStorage());
  setDoc(toDel, {
    KEY_LS: 'booksInShopingList',
    BOOKS_IDS: `${value}`,
  })
    .then(() => Notify.warning('Book remove'))
    .catch(e => Notify.failure(`${e.message}`));
}

//---------------прописання кошика користувача при повторному вході

// if (localStorage.getItem('booksInShopingList')) {
//   localStorage.setItem('booksInShopingList');
//   // Значення 'bookId' є в localStorage, продовжуйте оновлення
//   // Виконайте далі кроки оновлення значення
// } else {
//   // Значення 'bookId' відсутнє в localStorage
//   // Виконайте дії за замовчуванням або попередньо встановлені значення
// }

// import { getFirestore, doc, getDoc } from 'firebase/firestore';

// const database = getFirestore();

// export function updateLocalStorageFromFirestore() {
//   try {
//     const docRef = doc(database, 'shopping-list', getBookIdFromLocalStorage());
//     const docSnap = getDoc(docRef);

//     if (docSnap.exists()) {
//       const data = docSnap.data();

//       // Оновлення значення 'bookId' в localStorage
//       localStorage.setItem('booksInShopingList', data.bookId);

//       //   console.log('Значення з Firestore оновлено в localStorage:', data.bookId);
//     } else {
//       localStorage.setItem('booksInShopingList', '');
//       //   console.log('Документ не знайдено у Firestore');
//     }
//   } catch (error) {
//     // console.error('Помилка отримання значення з Firestore:', error);
//   }
// }
export async function updateLocalStorageFromFirestore() {
  try {
    const docRef = doc(database, 'shopping-list', getBookIdFromLocalStorage());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);

      //   Оновлення значення 'booksInShoppingList' в localStorage
      localStorage.setItem(
        'booksInShopingList',
        JSON.stringify(data['BOOKS_IDS'].replace('\\', ''))
      );

      console.log(
        'Значення з Firestore оновлено в localStorage:',
        JSON.stringify(data['BOOKS_IDS'].replace('\\', ''))
      );
    } else {
      //   localStorage.setItem('booksInShopingList', 0);
      //   localStorage.setItem('booksInShoppingList', '');
      console.log('Документ не знайдено у Firestore');
    }
  } catch (error) {
    console.error('Помилка отримання значення з Firestore:', error);
  }
}
// Виклик функції для оновлення значення в localStorage з Firestore
// updateLocalStorageFromFirestore();

// export async function updateLocalStorageFromFirestore() {
//   try {
//     const docRef = doc(database, 'shopping-list', getBookIdFromLocalStorage());
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//        const data = docSnap.data();

//     //   Оновлення значення 'booksInShoppingList' в localStorage
//         localStorage.setItem('booksInShopingList', data.bookId);

//         console.log('Значення з Firestore оновлено в localStorage:', data.bookId)
//       } else {
//         localStorage.setItem('booksInShopingList', '');
//         console.log('Властивість bookId не знайдена у Firestore документі');
//       }
//     } else {
//       localStorage.setItem('booksInShoppingList', '');
//       console.log('Документ не знайдено у Firestore');
//     }
//   } catch (error) {
//     console.error('Помилка отримання значення з Firestore:', error);
//   }
// }
