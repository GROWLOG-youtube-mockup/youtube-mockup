import CacheManager from './CacheManager.js';
import VideoGrid from './VideoGrid.js';
import YouTubeApiService from './YouTubeApiService.js';
import { formatDuration } from '../utils/util.js';

class QueryItems {
  constructor() {
    this.videoGrid = null;
    this.apiService = new YouTubeApiService();
    this.cacheManager = new CacheManager();
  }

  initializeApp() {
    this.videoGrid = new VideoGrid();
    this.videoGrid.init();
    this.fetchPopularVideos();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // 검색 이벤트 리스너 추가
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => this.searchVideos(searchInput.value));
      searchInput.addEventListener(
        'keypress',
        (e) => e.key === 'Enter' && this.searchVideos(searchInput.value)
      );
      console.log('Search event listeners added');
    } else {
      console.error('Search elements not found in DOM');
    }
  }

  async searchVideos(query) {
    if (!query?.trim()) return;
    console.log('Searching for:', query);

    // 검색 시 이전에 본 비디오 ID 초기화
    this.cacheManager.resetVideoIdCache();

    try {
      this.showLoadingIndicator();
      const { items } = await this.apiService.searchVideos(query);
      console.log(`Found ${items.length} videos`);

      // 조회수 캐싱
      this.cacheManager.cacheMultipleViewCounts(items);

      // 채널 아바타 사전 로딩
      await this.prefetchChannelAvatars(items);

      this.displayVideos(items);
    } catch (error) {
      console.error('Search error:', error);
      this.displayVideos([]);
    } finally {
      this.hideLoadingIndicator();
    }
  }

  async fetchPopularVideos() {
    console.log('Fetching popular videos');

    this.cacheManager.resetVideoIdCache();
    this.cacheManager.currentCategory = '전체';

    try {
      this.showLoadingIndicator();
      const { items, shorts, channelIds } = await this.apiService.getPopularVideos();
      console.log(`Fetched ${items.length} popular videos`);

      // 조회수 캐싱
      this.cacheManager.cacheMultipleViewCounts([...items, ...shorts]);

      // 채널 아바타 사전 로딩
      await this.prefetchChannelAvatars([...items, ...shorts]);

      await this.displayVideos(items, shorts);
    } catch (error) {
      console.error('Error fetching popular videos:', error);
      this.displayVideos([], []);
    } finally {
      this.hideLoadingIndicator();
    }
  }

  async getCategoryVideos(category) {
    if (!category) return;
    console.log('Category selected:', category);

    // 카테고리가 변경되었을 때만 seenVideoIds를 초기화
    this.cacheManager.resetCategoryCache(category);

    const categoryMap = {
      전체: () => this.fetchPopularVideos(),
      게임: () => this.fetchCategoryVideos(20, 'Fetching gaming videos', { maxShorts: 0 }),
      음악: () => this.fetchCategoryVideos(10, 'Fetching music videos', { maxShorts: 0 }),
      '영화/애니메이션': () => this.fetchCategoryVideos(1, 'Fetching movie videos'),
      동물: () => this.fetchCategoryVideos(15, 'Fetching animal videos'),
      스포츠: () => this.fetchCategoryVideos(17, 'Fetching sports videos'),
      뉴스: () => this.fetchCategoryVideos(25, 'Fetching news videos'),
      기술: () => this.fetchCategoryVideos(28, 'Fetching tech videos'),
      브이로그: () => this.fetchCategoryVideos(22, 'Fetching vlog videos')
    };

    const fetchFunction = categoryMap[category] || (() => this.fetchPopularVideos());
    fetchFunction();
  }

  async fetchCategoryVideos(categoryId, logMessage, options = {}) {
    console.log(logMessage);

    try {
      this.showLoadingIndicator();
      const maxShorts = options.maxShorts !== undefined ? options.maxShorts : 7;
      console.log(`Fetching category ${categoryId} with maxShorts: ${maxShorts}`);

      const { items, shorts } = await this.apiService.getCategoryVideos(
        categoryId,
        'KR',
        16,
        maxShorts
      );

      // 조회수 캐싱
      this.cacheManager.cacheMultipleViewCounts([...items, ...shorts]);

      // 채널 아바타 사전 로딩
      await this.prefetchChannelAvatars([...items, ...shorts]);

      await this.displayVideos(items, shorts);
    } catch (error) {
      console.error(`Error fetching ${logMessage}:`, error);
      this.displayVideos([], []);
    } finally {
      this.hideLoadingIndicator();
    }
  }

  // 채널 아바타 사전 로딩
  async prefetchChannelAvatars(videos) {
    if (!videos || videos.length === 0) return;

    // 채널 ID 추출
    const channelIds = videos.map((video) => video.snippet?.channelId).filter(Boolean);
    if (channelIds.length === 0) return;

    // 중복 제거 및 캐시되지 않은 ID만 필터링
    const uniqueIds = [...new Set(channelIds)];
    const uncachedIds = uniqueIds.filter((id) => !this.cacheManager.hasChannelAvatar(id));
    if (uncachedIds.length === 0) return;

    // 배치 처리 (API 제한: 50개씩)
    for (let i = 0; i < uncachedIds.length; i += 50) {
      const batch = uncachedIds.slice(i, i + 50);
      const { items } = await this.apiService.getChannelsInfo(batch);

      // 채널 아바타 캐싱
      this.cacheManager.cacheMultipleChannelAvatars(items || []);
    }
  }

  // UI 관련 헬퍼 함수
  showLoadingIndicator() {
    const contentContainer = document.querySelector('.video-grid');
    if (contentContainer) {
      contentContainer.innerHTML = '<div class="loading-indicator">로딩 중...</div>';
    }
  }

  hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) loadingIndicator.remove();
  }

  async displayVideos(videos, shortFormVideos = []) {
    if (!this.videoGrid) {
      console.error('VideoGrid is not initialized!');
      return;
    }

    const contentContainer = document.querySelector('.video-grid');
    if (!contentContainer) return;

    // 비디오가 없을 경우 메시지 표시
    if ((!videos || videos.length === 0) && (!shortFormVideos || shortFormVideos.length === 0)) {
      contentContainer.innerHTML = '<div class="no-videos-message">표시할 콘텐츠가 없습니다.</div>';
      console.warn('No videos to display.');
      return;
    }

    // 쇼츠 존재 여부에 따라 클래스 토글
    contentContainer.classList.toggle(
      'no-shorts',
      !shortFormVideos || shortFormVideos.length === 0
    );

    // 레이아웃 최적화 결정
    const shouldArrangeForSmallSet = videos?.length < 8 && shortFormVideos?.length > 0;

    // 모든 카드 데이터 병렬 처리
    const videoCardDataList = await Promise.all(
      (videos || []).map((video) => this.generateCardData(video))
    );
    const shortCardDataList = await Promise.all(
      (shortFormVideos || []).map((video) => this.generateCardData(video))
    );

    console.log(
      `Displaying ${videoCardDataList.length} videos and ${shortCardDataList.length} shorts`
    );
    this.videoGrid.updateVideos(videoCardDataList, shortCardDataList, shouldArrangeForSmallSet);
  }

  async generateCardData(video) {
    const videoId = video.id.videoId || video.id;
    const { channelId } = video.snippet;

    // 조회수 가져오기 (캐시 우선)
    let viewCount = 'N/A';
    if (this.cacheManager.hasViewCount(videoId)) {
      viewCount = this.cacheManager.getViewCount(videoId);
    } else if (video.statistics?.viewCount) {
      viewCount = video.statistics.viewCount;
      this.cacheManager.cacheViewCount(videoId, viewCount);
    }

    // 채널 아바타 가져오기 (캐시 우선)
    let avatar = '../../assets/images/avatars/default-avatar.png';
    if (this.cacheManager.hasChannelAvatar(channelId)) {
      avatar = this.cacheManager.getChannelAvatar(channelId);
    }

    return {
      videoThumbnail: `https://i.ytimg.com/vi_webp/${videoId}/mqdefault.webp`,
      avatar,
      title: video.snippet.title,
      channelId: video.snippet.channelTitle,
      channel: video.snippet.channelId,
      duration: formatDuration(video.contentDetails?.duration || 'PT0M0S'),
      videoState: `조회수 ${this.formatViewCount(viewCount)} ${this.formatPublishedDate(video.snippet.publishedAt)}`
    };
  }

  formatViewCount(viewCount) {
    if (!viewCount || viewCount === 'N/A') return '0회';

    const count = parseInt(viewCount, 10);
    const units = [
      { value: 100000000, suffix: '억' },
      { value: 10000, suffix: '만' },
      { value: 1000, suffix: '천' }
    ];

    for (const { value, suffix } of units) {
      if (count >= value) return `${Math.floor(count / value)}${suffix}회`;
    }

    return `${count}회`;
  }

  formatPublishedDate(publishedAt) {
    if (!publishedAt) return '알 수 없음';

    const published = new Date(publishedAt);
    const now = new Date();
    const diffMs = now - published;

    if (isNaN(diffMs)) return '알 수 없음';

    const timeUnits = [
      { value: 31536000000, unit: '년' },
      { value: 2592000000, unit: '개월' },
      { value: 86400000, unit: '일' },
      { value: 3600000, unit: '시간' },
      { value: 60000, unit: '분' }
    ];

    for (const { value, unit } of timeUnits) {
      const diff = Math.floor(diffMs / value);
      if (diff > 0) return `${diff}${unit} 전`;
    }

    return '방금 전';
  }
}

export default QueryItems;
