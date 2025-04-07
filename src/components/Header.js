export default function Header() {
  // 헤더 요소 생성
  const header = document.createElement('header');
  header.className = 'header';

  // 왼쪽 섹션(햄버거 버튼 + 로고)
  const leftSections = document.createElement('div');
  leftSections.className = 'header-left';

  const hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'hamburger-button';
  hamburgerButton.innerHTML = `<img src="/assets/icons/hamburger-menu.svg">`;

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'youtube-logo';
  logoLink.innerHTML = `<img src="/assets/icons/youtube-logo.svg">`;

  leftSections.append(hamburgerButton);
  leftSections.append(logoLink);

  // 중앙 섹션(검색 영역)
  const middleSection = document.createElement('div');
  middleSection.className = 'header-center';

  const searchForm = document.createElement('form');
  searchForm.className = 'search-form';
  searchForm.innerHTML = `
        <div>
            <input type="text" placeholder="검색" class="search-input">
            <button type="submit" class="search-button">
                <img src="/assets/icons/search-icon.svg">
            </button>
        </div>
        <button type="button" class="voice-search-button">
            <img src="/assets/icons/voice-search-icon.svg">
        </button>
    `;

  middleSection.append(searchForm);

  // 오른쪽 섹션 (만들기, 알림, 프로필)
  const rightSections = document.createElement('div');
  rightSections.className = 'header-right';

  const createButton = document.createElement('button');
  createButton.className = 'create-button';
  createButton.innerHTML = `
        <img src="/assets/icons/upload_plus.png">
        <span>만들기</span>
    `;

  const notificationButton = document.createElement('button');
  notificationButton.className = 'notification-button';
  notificationButton.innerHTML = `<img src="/assets/icons/notifications.svg">`;

  const profileButton = document.createElement('button');
  profileButton.className = 'profile-button';
  profileButton.innerHTML = `<img src="/assets/images/avatars/avatar-1.png">`;

  rightSections.append(createButton);
  rightSections.append(notificationButton);
  rightSections.append(profileButton);

  // 헤더 요소에 추가
  header.append(leftSections);
  header.append(middleSection);
  header.append(rightSections);

  return header;
}
