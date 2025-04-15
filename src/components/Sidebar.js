class Sidebar {
  constructor() {
    this.sidebarItems = [
      { icon: 'home', text: '홈' },
      { icon: 'subscriptions', text: '구독' },
      { icon: 'youtube-music', text: 'YouTube Music' },
      { divider: true },
      { icon: 'history', text: '시청 기록' },
      { icon: 'playlist', text: '재생목록' },
      { icon: 'smart-display', text: '내 동영상' },
      { icon: 'schedule', text: '나중에 볼 동영상' },
      { icon: 'thumb-up', text: '좋아요 표시한 동영상' },
      { divider: true },
      { icon: 'popularity', text: '인기 급상승' },
      { icon: 'music-note', text: '음악' }
    ];

    this.render();
    this.addEventListeners();
  }

  createMenuItem(item) {
    if (item.divider) {
      return '<li><hr class="sidebar__divider" /></li>';
    }

    return `
          <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                  <img 
                      src="./assets/icons/${item.icon}.svg" 
                      alt="${item.text}" 
                      class="sidebar__icon" 
                  />
                  <span>${item.text}</span>
              </a>
          </li>
      `;
  }

  render() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
          <nav class="sidebar__nav" aria-label="Main navigation">
              <ul class="sidebar__menu">
                  ${this.sidebarItems.map((item) => this.createMenuItem(item)).join('')}
              </ul>
          </nav>
      `;
  }

  addEventListeners() {
    const items = document.querySelectorAll('.sidebar__item');

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActiveItem(item);
      });
    });
  }

  setActiveItem(activeItem) {
    document
      .querySelectorAll('.sidebar__item')
      .forEach((item) => item.classList.remove('sidebar__item--active'));
    activeItem.classList.add('sidebar__item--active');
  }
}

export default Sidebar;
