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

    
}