import { createElement } from '../utils/util.js';
import VideoThumbnail from './VideoThumbnail.js';
import Shorts from './Shorts.js';
import VideoThumbnail from './VideoThumbnail.js';

class VideoGrid {
  constructor() {
    this.videoGrid = document.querySelector('.video-grid');
    this.videos = [
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
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-3.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 3',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-4.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 4',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-5.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 5',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-6.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 6',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-7.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 7',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-8.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 8',
        videoState: '조회수 14만회  6일 전'
      },
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
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-3.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 3',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-4.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 4',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-5.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 5',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-6.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 6',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-7.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 7',
        videoState: '조회수 14만회  6일 전'
      },
      {
        videoThumbnail: '../../assets/images/thumbnails/thumbnail-8.jpeg',
        avatar: '../../assets/images/avatars/avatar-1.png',
        title: 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧',
        channelId: 'Channel 8',
        videoState: '조회수 14만회  6일 전'
      }
    ];

    this.cards = [];
    this.init();
  }

  init() {
    console.log('Initializing VideoGrid...');

    // 비디오 카드 개수를 16개로 맞추기 위해 더미 데이터 추가
    while (this.videos.length < 16) {
      this.videos.push({
        videoThumbnail: '../../assets/images/thumbnails/default-thumbnail.jpg',
        avatar: '../../assets/images/avatars/default-avatar.png',
        title: '',
        channelId: '',
        videoState: '',
        isDummy: true // 더미 데이터 표시
      });
    }

    // 일반 비디오 렌더링
    this.videos.forEach((item) => {
      this.createVideoCard(item);
    });

    // Shorts 데이터 렌더링
    const shortsRow = createElement('div', this.videoGrid, { className: 'shorts-container' });
    if (this.cards.length > 0) {
      shortsRow.innerHTML = Shorts({ headerTitle: 'Shorts', cards: this.cards });
      console.log('Shorts rendered:', this.cards);
    }
  }

  createVideoCard(item) {
    const thumbnail = new VideoThumbnail(item);
    if (item.isDummy) {
      thumbnail.getElement().classList.add('dummy-video'); // 더미 클래스 추가
    }
    this.videoGrid.appendChild(thumbnail.getElement());
  }

  setVideoInfo(item) {
    this.videoInfo = createElement('div', this.videoCard, { className: 'video-info' });
    this.avatar = createElement('img', this.videoInfo, {
      className: 'avatar',
      src: item.avatar
    });
    this.details = createElement('div', this.videoInfo, { className: 'details' });
    this.title = createElement('h3', this.details, {
      className: 'title',
      innerText: item.title
    });
    this.channelId = createElement('p', this.details, {
      className: 'channelId',
      innerText: item.channelId
    });
    this.videoState = createElement('p', this.details, {
      className: 'videoState',
      innerText: item.videoState
    });
    this.BtnMore = createElement('button', this.videoInfo, {
      className: 'btn-more',
      innerText: '...'
    });
  }

  updateVideos(newVideos, newShorts = []) {
    if (!newVideos || !newVideos.length) {
      console.error('No videos to update');
      return;
    }

    this.videos = newVideos; // 새로운 비디오 데이터로 업데이트
    this.cards = newShorts; // 새로운 Shorts 데이터로 업데이트

    // 기존 콘텐츠 비우기
    this.videoGrid.innerHTML = '';

    // 비디오 카드 및 Shorts 데이터 렌더링
    this.init();
  }

  // videoCard, shorts UI 높이 계산하기
  calHeight() {
    const shortsContainer = document.querySelector('.shorts-container');
    const shortsHeader = document.querySelector('.shorts-header');
    const shortsCard = document.querySelector('.shorts-cards-container');

    if (shortsContainer && shortsHeader && shortsCard) {
      const cardHeight = shortsCard.clientHeight + shortsHeader.clientHeight;
      shortsContainer.style.height = `${cardHeight * 1.1}px`;
    }
  }
}
export default VideoGrid;
