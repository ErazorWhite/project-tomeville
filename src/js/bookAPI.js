import axios from "axios";
import { Notify } from "notiflix";

export class BookAPI {
    #BASE_URL = 'https://books-backend.p.goit.global/books';
    #_id = '';

    async getCategoryList() {
        const url = `${this.#BASE_URL}/category-list`;
        try {
            const responce = await axios.get(url);
            return responce.data;
        } catch (e) {
            Notify.failure('error');
        }
    }

    async getTopBooks() {
        const url = `${this.#BASE_URL}/top-books`;
        try {
            const responce = await axios.get(url);
            return responce.data;
        } catch (e) {
            Notify.failure('error');
        }
    }

    async getBooksByCategory(category) {
        const url = `${this.#BASE_URL}/category?category=${category}`;
        try {
            const responce = await axios.get(url);
            return responce.data;
        } catch (e) {
            Notify.failure('error');
        }
    }

    async getBooksById() {
        const url = `${this.#BASE_URL}/${this.#_id}`;
        try {
            const responce = await axios.get(url);
            return responce.data;
        } catch (e) {
            Notify.failure('error');
            throw e;
        }
    }

  get id() {
    return this.#_id;
  }
  
  set id(id) {
    this.#_id = id;
  }
   
}

