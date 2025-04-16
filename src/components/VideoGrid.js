import { createElement } from '../utils/util.js';
import Shorts from './Shorts.js';
import VideoThumbnail from './VideoThumbnail.js';

class VideoGrid {
  constructor() {
    this.videoGrid = document.querySelector('.video-grid');
    this.videos = [];
    this.cards = [];
    this.defaultThumbnail = '../../assets/images/thumbnails/default-thumbnail.jpg';
    this.defaultAvatar = '../../assets/images/avatars/default-avatar.png';
  }

  init() {
    console.log('Initializing VideoGrid...');
    this.ensureMinimumVideos();
    this.renderVideos();
    this.renderShorts();
    this.calHeight();
  }

  ensureMinimumVideos() {
    const minVideos = 16;
    while (this.videos.length < minVideos) {
      this.videos.push(this.createDummyVideo());
    }
  }

  createDummyVideo() {
    return {
      videoThumbnail: this.defaultThumbnail,
      avatar: this.defaultAvatar,
      title: '',
      channelId: '',
      videoState: '',
      isDummy: true
    };
  }

  renderVideos() {
    if (!this.videoGrid) {
      console.error('Video grid element not found');
      return;
    }

    this.videoGrid.innerHTML = '';
    this.videos.forEach((video) => this.createVideoCard(video));
  }

  renderShorts() {
    // 이전에 렌더링된 shorts-container가 있다면 제거
    const existingShorts = this.videoGrid?.querySelector('.shorts-container');
    if (existingShorts) {
      existingShorts.remove();
    }

    // shorts가 없으면 렌더링하지 않음
    if (!this.cards || this.cards.length === 0) {
      console.log('No shorts to render');
      return;
    }

    const shortsContainer = createElement('div', this.videoGrid, {
      className: 'shorts-container'
    });

    shortsContainer.innerHTML = Shorts({
      headerTitle: 'Shorts',
      cards: this.cards
    });

    console.log('Shorts rendered:', this.cards.length);
  }

  createVideoCard(video) {
    if (!this.videoGrid) {
      console.error('Video grid element not found');
      return;
    }

    const thumbnail = new VideoThumbnail(video);
    const element = thumbnail.getElement();

    if (video.isDummy) {
      element.classList.add('dummy-video');
    }

    this.videoGrid.appendChild(element);
  }

  updateVideos(newVideos = [], newShorts = [], shouldArrangeForSmallSet = false) {
    console.log(`Updating videos: ${newVideos.length} videos, ${newShorts.length} shorts`);

    if (!newVideos.length && !newShorts.length) {
      console.warn('No videos or shorts to display');
      if (this.videoGrid) {
        this.videoGrid.innerHTML = '<div class="no-videos-message">표시할 콘텐츠가 없습니다.</div>';
      }
      return;
    }

    this.videos = newVideos;
    this.cards = newShorts;

    // 최적화된 레이아웃을 위한 로직 추가
    if (shouldArrangeForSmallSet) {
      console.log('Optimizing layout for small video set');
      // 여기에 레이아웃 최적화 로직 추가
    }

    this.init();
  }

  calHeight() {
    const shortsContainer = document.querySelector('.shorts-container');
    if (!shortsContainer) return;

    const shortsHeader = document.querySelector('.shorts-header');
    const shortsCard = document.querySelector('.shorts-cards-container');

    if (shortsHeader && shortsCard) {
      const cardHeight = shortsCard.clientHeight + shortsHeader.clientHeight;
      shortsContainer.style.height = `${cardHeight * 1.1}px`;
    }
  }
}

export default VideoGrid;
