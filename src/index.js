import Category from './components/Category.js';
import Sidebar from './components/Sidebar.js';

class YouTube {
  constructor() {
    this.category = new Category();
    this.sidebar = new Sidebar();
    
  }

  applyTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icons = document.querySelectorAll('.sidebar__icon');

    icons.forEach((icon) => {
      if (isDarkMode) {
        icon.style.filter = 'invert(0)'; // 다크 모드: 흰색 유지
      } else {
        icon.style.filter = 'invert(1)'; // 화이트 모드: 검은색으로 반전
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.applyTheme);
  }
}

document.addEventListener('DOMContentLoaded', new YouTube());
