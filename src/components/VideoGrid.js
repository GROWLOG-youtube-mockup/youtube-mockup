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
    this.videoGrid.innerHTML = '';
    this.videos.forEach((video) => this.createVideoCard(video));
  }

  renderShorts() {
    if (!this.cards.length) return;

    const shortsContainer = createElement('div', this.videoGrid, {
      className: 'shorts-container'
    });

    shortsContainer.innerHTML = Shorts({
      headerTitle: 'Shorts',
      cards: this.cards
    });

    console.log('Shorts rendered:', this.cards);
  }

  createVideoCard(video) {
    const thumbnail = new VideoThumbnail(video);
    const element = thumbnail.getElement();

    if (video.isDummy) {
      element.classList.add('dummy-video');
    }

    this.videoGrid.appendChild(element);
  }

  updateVideos(newVideos = [], newShorts = []) {
    if (!newVideos.length) {
      console.error('No videos to update');
      return;
    }

    this.videos = newVideos;
    this.cards = newShorts;
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
