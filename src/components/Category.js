import { createElement } from '../utils/util.js';

class Category {
  constructor() {
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
    ];
    this.selectedCategory = null;
    this.chipScroll = null;
    this.arrow = { right: null, left: null };

    this.init();
    this.addDragging();
    this.addResizeHandler();
    this.addScrollHandler();
  }

  init() {
    this.arrow.left = createElement('div', this.categoryDiv, { className: 'left_arrow' });
    this.arrow.right = createElement('div', this.categoryDiv, { className: 'right_arrow' });

    createElement('div', this.arrow.left, {
      className: 'button-shape',
      innerText: '<',
      onclick: () => this.scrollBy(-150)
    });
    createElement('div', this.arrow.right, {
      className: 'button-shape',
      innerText: '>',
      onclick: () => this.scrollBy(150)
    });

    this.chipScroll = createElement('div', this.categoryDiv, { className: 'chip-scroll' });

    this.categories.forEach((category, index) => {
      const isActive =
        (!this.selectedCategory && index === 0) || this.selectedCategory === category;
      const chip = createElement('div', this.chipScroll, {
        className: 'chip',
        innerText: category
      });

      if (isActive) {
        chip.classList.add('chip_active');
        this.selectedCategory = category;
      }

      chip.addEventListener('click', () => {
        const currentActive = this.chipScroll.querySelector('.chip_active');

        if (currentActive !== chip) {
          currentActive?.classList.remove('chip_active');
          chip.classList.add('chip_active');
          this.selectedCategory = category;
        }
      });
    });

    this.updateArrowVisibility(); // 초기 상태에서 화살표 표시 결정
  }

  scrollBy(offset) {
    this.chipScroll.scrollBy({ left: offset, behavior: 'smooth' });
  }

  updateArrowVisibility() {
    const { scrollLeft, scrollWidth, clientWidth } = this.chipScroll;
    const atStart = scrollLeft === 0;
    const atEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

    this.arrow.left.style.display = atStart ? 'none' : 'flex';
    this.arrow.right.style.display = atEnd ? 'none' : 'flex';
  }

  addScrollHandler() {
    this.chipScroll.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.updateArrowVisibility());
    });
  }

  addResizeHandler() {
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => this.updateArrowVisibility());
    });
  }

  addDragging() {
    let isDragging = false;
    let startX;
    let scrollStart;

    this.chipScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = this.chipScroll.scrollLeft;
      this.chipScroll.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      this.chipScroll.scrollLeft = scrollStart - dx;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      this.chipScroll.classList.remove('dragging');
    });

    this.chipScroll.addEventListener('mouseleave', () => {
      isDragging = false;
      this.chipScroll.classList.remove('dragging');
    });
  }
}

export default Category;
