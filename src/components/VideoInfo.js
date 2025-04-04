class VideoInfo extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    // video-info 태그 스타일
    this.style.width = '100%';
    this.style.marginTop = '8px';
    this.style.display = 'grid';
    this.style.gridTemplateColumns = '50px 1fr 24px';

    // 채널 아이콘
    const avatar = document.createElement('img');
    avatar.setAttribute('src', 'assets/images/avatars/avatar-1.png');
    this.append(avatar);
    avatar.style.width = '36px';
    avatar.style.borderRadius = '50%';
    avatar.style.objectFit = 'contain';
    avatar.style.backgroundColor = 'rgb(23, 23, 23)';

    // 영상 및 채널 정보
    const details = document.createElement('div');
    const title = document.createElement('h3');
    title.innerText = 'Playlist 요즘 가장 인기 있는 음악  🎶  지금 듣기 좋은 플레이리스트 🎧 ';
    const channelId = document.createElement('p');
    channelId.innerText = 'Jayu';
    const videoState = document.createElement('p');
    videoState.innerText = '조회수 14만회  6일 전';
    details.append(title);
    details.append(channelId);
    details.append(videoState);
    this.append(details);

    title.style.fontWeight = 'bold';
    title.style.fontSize = '14px';
    title.style.lineHeight = '20px';
    title.style.paddingBottom = '5px';

    channelId.style.fontSize = '12px';
    channelId.style.fontWeight = '600';
    channelId.style.color = 'gray';
    channelId.style.opacity = '0.8';

    videoState.style.fontSize = '12px';
    videoState.style.fontWeight = '600';
    videoState.style.color = 'gray';
    videoState.style.opacity = '0.8';

    // 더보기(...) 버튼
    const more = document.createElement('button');
    more.innerText = '...';
    this.append(more);
    more.style.border = 'none';
    more.style.borderRadius = '50px';
    more.style.display = 'flex';
    more.style.alignItems = 'start';
    more.style.cursor = 'pointer';
  }
}
customElements.define('video-info', VideoInfo);
