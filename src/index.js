import Category from './components/Category.js';
import VideoGrid from './components/VideoGrid.js';
import QueryItems from './components/QueryItems.js';

document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = new VideoGrid();
  const queryItems = new QueryItems();

  queryItems.initializeApp(); // QueryItems 초기화

  const category = new Category((selectedCategory) => {
    console.log('Selected category:', selectedCategory);

    const filteredVideos = queryItems.getCatrgoryVideos(selectedCategory);

    // filteredVideos 값 확인
    console.log('Filtered Videos:', filteredVideos);

    // QueryItems의 displayVideos 메서드 호출
    queryItems.displayVideos(filteredVideos);
  });
  
  // 초기 데이터 로드
  videoGrid.updateVideos(mockVideos);
});

// Mock 데이터
const mockVideos = [
  {
    videoThumbnail: '../../assets/images/thumbnails/thumbnail-1.jpeg',
    avatar: '../../assets/images/avatars/avatar-1.png',
    title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
    channelId: 'Channel 1',
    videoState: '조회수 14만회  6일 전'
  },
  {
    videoThumbnail: '../../assets/images/thumbnails/thumbnail-2.jpeg',
    avatar: '../../assets/images/avatars/avatar-1.png',
    title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
    channelId: 'Channel 2',
    videoState: '조회수 14만회  6일 전'
  }
  // ... 추가 데이터
];
