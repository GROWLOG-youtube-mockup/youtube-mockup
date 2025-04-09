import Category from './components/Category.js';
import Header from './components/Header.js';

class YouTube {
  constructor() {
    this.category = new Category();
    this.header = new Header();
    
import VideoGrid from './components/VideoGrid.js';
import QueryItems from './components/QueryItems.js';
import Sidebar from './components/Sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  // QueryItems와 VideoGrid 초기화
  const videoGrid = new VideoGrid();
  const queryItems = new QueryItems();
  queryItems.initializeApp(); // QueryItems 초기화

  // Category 생성 및 선택시 QueryItems에서 필터링 수행
  const category = new Category((selectedCategory) => {
    console.log('Selected category:', selectedCategory);
    const filteredVideos = queryItems.getCategoryVideos(selectedCategory);

    console.log('Filtered Videos:', filteredVideos);
    queryItems.displayVideos(filteredVideos);
  });

  // 초기 데이터 로드
  videoGrid.updateVideos(mockVideos);

  // Sidebar 초기화 및 테마 적용
  const sidebar = new Sidebar();
  applyTheme(); // 초기 테마 적용

  // 시스템 테마 변경 감지 시 테마 재적용
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', applyTheme);

  function applyTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icons = document.querySelectorAll('.sidebar__icon');

    icons.forEach((icon) => {
      if (isDarkMode) {
        icon.style.filter = 'invert(0)'; // 다크 모드: 아이콘을 그대로 유지
      } else {
        icon.style.filter = 'invert(1)'; // 라이트 모드: 아이콘 반전
      }
    });
  }
});

// Mock 데이터
const mockVideos = [
  {
    videoThumbnail: '../../assets/images/thumbnails/thumbnail-1.jpeg',
    avatar: '../../assets/images/avatars/avatar-1.png',
    title: 'Playlist 요즘 가장 인기 있는 음악 🎶 지금 듣기 좋은 플레이리스트 🎧',
    channelId: 'Channel 1',
    videoState: '조회수 14만회 6일 전'
  },
  {
    videoThumbnail: '../../assets/images/thumbnails/thumbnail-2.jpeg',
    avatar: '../../assets/images/avatars/avatar-1.png',
    title: 'Playlist 요즘 가장 인기 있는 음악 🎶 지금 듣기 좋은 플레이리스트 🎧',
    channelId: 'Channel 2',
    videoState: '조회수 14만회 6일 전'
  }
  // ... 추가 데이터
];