import QueryItems from './QueryItems.js';

class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.queryItems = new QueryItems();
    this.init();
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const headerContent = `
      <div class="header-left">
        ${this.getMenuAndLogoHTML()}
      </div>
      
      <div class="header-center">
        ${this.getSearchFormHTML()}
        ${this.getMobileSearchButtonsHTML()}
      </div>
      
      <div class="header-right">
        ${this.getRightSectionHTML()}
      </div>
    `;

    this.header.innerHTML = headerContent;
  }

  getMenuAndLogoHTML() {
    return `
      <button class="menu-button">
        <img src="/assets/icons/Hamburger_icon.png" alt="메뉴">
      </button>
      <a href="/" class="youtube-logo">
        <img src="/assets/icons/youtube-logo-b.png" alt="YouTube">
      </a>
    `;
  }

  getSearchFormHTML() {
    return `
      <form class="search-form">
        <div class="search-container">
          <input type="text" placeholder="검색" class="search-input">
          <button type="submit" class="search-button">
            <img src="/assets/icons/search-icon.svg" alt="검색">
          </button>
        </div>
        <button type="button" class="voice-search-button">
          <img src="/assets/icons/voice-search.png" alt="음성으로 검색">
        </button>
      </form>
    `;
  }

  getMobileSearchButtonsHTML() {
    return `
      <div class="mobile-search-buttons">
        <button type="button" class="search-icon-button">
          <img src="/assets/icons/search-icon.svg" alt="검색">
        </button>
        <button type="button" class="mobile-voice-search-button">
          <img src="/assets/icons/voice-search.png" alt="음성으로 검색">
        </button>
      </div>
    `;
  }

  getRightSectionHTML() {
    return `
      <button class="create-button">
        <img src="/assets/icons/upload_plus.png" alt="만들기">
        <span>만들기</span>
      </button>
      <button class="notifications-button">
        <img src="/assets/icons/notification.png" alt="알림">
      </button>
      <button class="profile-button">
        <img src="/assets/images/avatars/avatar-1.png" alt="프로필" class="profile-img">
      </button>
    `;
  }

  addEventListeners() {
    const searchForm = this.header.querySelector('.search-form');
    const searchInput = this.header.querySelector('.search-input');

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        console.log(`검색어: ${query}`);
        this.queryItems.searchVideos(query);
      }
    });
  }
}

export default Header;
