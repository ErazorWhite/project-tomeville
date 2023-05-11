// Файлик для работы с локальным хранилищем

// Использовать вот так
// import storage from './storage';
// const { save, load } = storage;
// save(CONST_ID, data); // Запись в local storage
// const playerNewTime = load(CONST_ID); // Чтение

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export default {
  save,
  load,
  remove,
  clear,
};
