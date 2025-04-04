import Category from './components/Category.js';

class YouTube {
  constructor() {
    this.category = new Category();
  }
}

document.addEventListener('DOMContentLoaded', new YouTube());
