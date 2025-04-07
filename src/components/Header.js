class Header {
  constructor() {
    this.header = document.querySelector('.header');
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
            <img src="./assets/icons/menu.svg" alt="메뉴">
          </button>
          <a href="/" class="youtube-logo">
            <img src="/assets/icons/youtube-logo.svg" alt="YouTube">
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
              <img src="/assets/icons/voice-search-icon.svg" alt="음성으로 검색">
            </button>
          </form>
        </div>
        
        <div class="header-right">
          <button class="create-button">
            <img src="/assets/icons/upload_plus.png" alt="만들기">
            <span>만들기</span>
          </button>
          <button class="notifications-button">
            <img src="/assets/icons/notifications.svg" alt="알림">
          </button>
          <button class="profile-button">
            <img src="/assets/images/avatars/avatar-1.png" alt="프로필" class="profile-img">
          </button>
        </div>
      `;
  }

  addEventListeners() {
    // const menuButton = this.header.querySelector('.sidebar-toggle-btn');
    const searchForm = this.header.querySelector('.search-form');

    /* menuButton.addEventListener('click', () => {
      this.toggleSidebar();
    }); */

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // 검색 기능 구현 자리
    });
  }

  /* 햄버거 버튼 눌러서 사이드바 오픈 함수
  toggleSidebar() {
    this.header.classList.toggle('sidebar-open');
  } */
}

export default Header;
