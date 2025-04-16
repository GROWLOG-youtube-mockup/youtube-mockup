import QueryItems from './QueryItems.js';

class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.queryItems = new QueryItems(); // QueryItems 인스턴스 생성
    this.init();
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.header.innerHTML = `
        <div class="header-left">
          <button class="menu-button">
            <img src="/assets/icons/Hamburger_icon.png" alt="메뉴">
          </button>
          <a href="/" class="youtube-logo">
            <img src="/assets/icons/youtube-logo-b.png" alt="YouTube">
          </a>
        </div>
        
        <div class="header-center">
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
          <div class="mobile-search-buttons">
            <button type="button" class="search-icon-button">
              <img src="/assets/icons/search-icon.svg" alt="검색">
            </button>
            <button type="button" class="mobile-voice-search-button">
              <img src="/assets/icons/voice-search.png" alt="음성으로 검색">
            </button>
          </div>
        </div>
        
        <div class="header-right">
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
        </div>
      `;
  }

  addEventListeners() {
    const searchForm = this.header.querySelector('.search-form');
    const searchInput = this.header.querySelector('.search-input');

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim(); // 검색어 가져오기

      console.log(`검색어: ${query}`);
      this.queryItems.searchVideos(query); // this가 올바른 컨텍스트를 참조
    });
  }
}

export default Header;
