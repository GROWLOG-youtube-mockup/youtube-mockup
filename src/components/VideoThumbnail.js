class VideoThumbnail {
    constructor({ videoThumbnail, avatar, title, channelId, videoState, duration = '12:34' }) {
      this.data = { videoThumbnail, avatar, title, channelId, videoState, duration };
      this.element = this.createElement();
    }
  
    createElement() {
      const wrapper = document.createElement('div');
      wrapper.className = 'video-card';
  
      wrapper.innerHTML = `
        <div class="thumbnail-wrapper">
          <img class="video-thumbnail" src="${this.data.videoThumbnail}" alt="영상 썸네일">
          <div class="video-duration">${this.data.duration}</div>
        </div>
        <div class="video-info">
          <img class="avatar" src="${this.data.avatar}" alt="채널 아바타">
          <div class="details">
            <h3 class="title">${this.data.title}</h3>
            <p class="channelId">${this.data.channelId}</p>
            <p class="videoState">${this.data.videoState}</p>
          </div>
          <button class="btn-more">...</button>
        </div>
      `;
  
      return wrapper;
    }
  
    getElement() {
      return this.element;
    }
  }
  
  export default VideoThumbnail;
  