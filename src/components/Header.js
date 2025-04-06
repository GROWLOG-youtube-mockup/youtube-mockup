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
    logoLink.innerHTML = `
        <img src="/assets/icons/youtube-logo.svg"> 
        <span class="country-code">KR</span>`;
    
    leftSections.append(hamburgerButton);
    leftSections.append(logoLink);

    // 중앙 섹션(검색 영역)
    const middleSection = document.createElement('div');
    middleSection.className = 'header-center';
    
    const searchForm = document.createElement('form');
    searchForm.className ='search-form';
    searchForm.innerHTML=`
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
}