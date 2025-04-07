import { createElement } from '../utils/util.js';

class VideoGrid {
  constructor() {
    this.vidioGrid = document.querySelector('.video-grid');
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
      }
    ];
    this.init();
  }

  init() {
    this.videos.forEach((item) => {
      this.createVideoCard(item);
    });
  }

  createVideoCard(item) {
    this.videoCard = createElement('div', this.vidioGrid, { className: 'video-card' });

    // 썸네일 정보 불러오기 // setVideoThumbnail();
    this.videoThumbnail = createElement('img', this.videoCard, {
      className: 'video-thumbnail',
      // src: this.videos.videoThumbnail
      src: item.videoThumbnail
    });

    // 비디오 정보 불러오기
    this.setVideoInfo(item);
  }

  setVideoInfo(item) {
    this.videoInfo = createElement('div', this.videoCard, { className: 'video-info' });
    this.avatar = createElement('img', this.videoInfo, {
      className: 'avatar',
      // src: this.videos.avatar
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
}
export default VideoGrid;
