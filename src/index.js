import Category from './components/Category.js';
import Header from './components/Header.js';
import VideoGrid from './components/VideoGrid.js';
import QueryItems from './components/QueryItems.js';
import Sidebar from './components/Sidebar.js';

class YouTube {
  constructor() {
    this.category = new Category((selectedCategory) => {
      console.log('Selected category:', selectedCategory);
      const filteredVideos = this.queryItems.getCategoryVideos(selectedCategory);
      console.log('Filtered Videos:', filteredVideos);
      this.queryItems.displayVideos(filteredVideos);
    });
    this.header = new Header();
    this.videoGrid = new VideoGrid();
    this.queryItems = new QueryItems();
    this.sidebar = new Sidebar();
  }

  initialize() {
    this.queryItems.initializeApp();
    this.videoGrid.updateVideos(mockVideos);
    applyTheme();
    this.watchSystemTheme();
  }

  watchSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', applyTheme);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new YouTube();
  app.initialize();
});

// 💡 테마 적용 함수
function applyTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const icons = document.querySelectorAll('.sidebar__icon');

  icons.forEach((icon) => {
    icon.style.filter = isDarkMode ? 'invert(0)' : 'invert(1)';
  });
}

// 📦 Mock 데이터
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
