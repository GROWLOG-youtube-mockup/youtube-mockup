import Category from './components/Category.js';
import VideoGrid from './components/VideoGrid.js';

class YouTube {
  constructor() {
    this.category = new Category();
    this.videogrid = new VideoGrid();
  }
}

document.addEventListener('DOMContentLoaded', new YouTube());
