import { createElement } from '../utils/util.js';

class Category {
  constructor(onCategoryChange) {
    this.categoryDiv = document.getElementById('chip-categories');
    this.categories = [
      '전체',
      '게임',
      '음악',
      '영화/애니메이션',
      '동물',
      '스포츠',
      '뉴스',
      '기술',
      '브이로그'
    ];
    this.selectedCategory = null;
    this.chipScroll = null;
    this.arrow = { right: null, left: null };
    this.onCategoryChange = onCategoryChange;

    this.init();
    this.addDragging();
    this.addResizeHandler();
    this.addScrollHandler();
  }

  init() {
    this.createArrows();
    this.createChipScroll();
    this.updateArrowVisibility();
  }

  createArrows() {
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
  }

  createChipScroll() {
    this.chipScroll = createElement('div', this.categoryDiv, { className: 'chip-scroll' });

    this.categories.forEach((category, index) => {
      const isActive = !this.selectedCategory && index === 0;
      const chip = createElement('div', this.chipScroll, {
        className: `chip${isActive ? ' chip_active' : ''}`,
        innerText: category
      });

      if (isActive) {
        this.selectedCategory = category;
      }

      chip.addEventListener('click', () => this.handleChipClick(chip, category));
    });
  }

  handleChipClick(chip, category) {
    const currentActive = this.chipScroll.querySelector('.chip_active');
    if (currentActive !== chip) {
      currentActive?.classList.remove('chip_active');
      chip.classList.add('chip_active');
      this.selectedCategory = category;
      this.onCategoryChange?.(category);
    }
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

    const startDragging = (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = this.chipScroll.scrollLeft;
      this.chipScroll.classList.add('dragging');
    };

    const stopDragging = () => {
      isDragging = false;
      this.chipScroll.classList.remove('dragging');
    };

    const drag = (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      this.chipScroll.scrollLeft = scrollStart - dx;
    };

    this.chipScroll.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    this.chipScroll.addEventListener('mouseleave', stopDragging);
  }
}

export default Category;
