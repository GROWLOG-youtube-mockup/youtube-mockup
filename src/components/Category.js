import { createElement } from '../utils/util.js';

class Category {
  constructor() {
    this.message = 'Category';
    this.categoryDiv = document.getElementById('chip-categories');
    this.categories = [
      '전체',
      '게임',
      '음악',
      '영화',
      '애니메이션',
      '스포츠',
      '뉴스',
      '교양',
      '브이로그',
      '쇼츠'
    ]; // 카테고리 목록
    this.chips = [];
    this.selectedCategory = null;

    this.init();
    this.addDragging();
  }

  init() {
    this.categories.forEach((category, index) => {
      const div = createElement('div', this.categoryDiv, {
        className: 'chip',
        innerText: category,
        classList: {
          method:
            this.selectedCategory === category || (!this.selectedCategory && index === 0)
              ? 'add'
              : 'remove',
          className: ['chip_active']
        }
      });
    });
  }

  addDragging() {
    let isDragging = false;
    let startX;
    let scrollLeft;

    this.categoryDiv.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - this.categoryDiv.offsetLeft;
      scrollLeft = this.categoryDiv.scrollLeft;
    });

    this.categoryDiv.addEventListener('mouseup', () => {
      isDragging = false;
    });

    this.categoryDiv.addEventListener('mousemove', (e) => {
      if (!isDragging) {
        return;
      }

      e.preventDefault();

      const x = e.pageX - this.categoryDiv.offsetLeft;
      const walk = (x - startX) * 1.5;
      this.categoryDiv.scrollLeft = scrollLeft - walk;
    });

    this.categoryDiv.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }
}

export default Category;
