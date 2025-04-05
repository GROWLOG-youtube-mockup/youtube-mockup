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
    // this.chips = [];
    this.chipScroll = null;
    this.selectedCategory = null;
    this.arrow = { right: null, left: null };

    this.init();
    this.addDragging();
  }

  init() {
    this.arrow.right = createElement('div', this.categoryDiv, {
      className: 'right_arrow'
      // display: 'none'
    });

    this.arrow.left = createElement('div', this.categoryDiv, {
      className: 'left_arrow'
      // display: 'none'
    });

    this.chipScroll = createElement('div', this.categoryDiv, {
      className: 'chip-scroll'
    });

    this.categories.forEach((category, index) => {
      const div = createElement('div', this.chipScroll, {
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

      div.addEventListener('click', (e) => {
        this.categoryDiv.querySelector('.chip_active').classList.remove('chip_active');

        this.selectedCategory = e.target.innerText;
        e.target.classList.add('chip_active');
      });
    });

    Object.entries(this.arrow).forEach(([key, value]) => {
      const button = createElement('div', value, {
        className: 'button-shape',
        innerText: key === 'right' ? '>' : '<'
      });
    });
  }

  addDragging() {
    let isDragging = false;
    let startX;
    let scrollLeft;

    this.chipScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - this.chipScroll.offsetLeft;
      scrollLeft = this.chipScroll.scrollLeft;
    });

    this.chipScroll.addEventListener('mouseup', () => {
      isDragging = false;
    });

    this.chipScroll.addEventListener('mousemove', (e) => {
      if (!isDragging) {
        return;
      }

      e.preventDefault();

      const x = e.pageX - this.chipScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      this.chipScroll.scrollLeft = scrollLeft - walk;
    });

    this.chipScroll.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }
}

export default Category;
