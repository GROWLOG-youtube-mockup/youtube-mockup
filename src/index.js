import Category from './components/Category';

class YouTube {
  constructor() {
    this.category = new Category();
  }
}

document.addEventListener('DOMContentLoaded', new YouTube());
