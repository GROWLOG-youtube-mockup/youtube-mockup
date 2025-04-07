import Category from './components/Category.js';
import Header from './components/Header.js';

class YouTube {
  constructor() {
    this.category = new Category();
  }
}

document.addEventListener('DOMContentLoaded', new YouTube());
