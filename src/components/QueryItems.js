import { formatDuration } from '../utils/util.js';
import { API_KEY } from './const.js';
import VideoGrid from './VideoGrid.js';

class QueryItems {
  constructor() {
    this.videoGrid = null;
    this.seenVideoIds = new Set();
    this.viewCountCache = new Map();
    this.channelAvatarCache = new Map();
    this.currentCategory = '전체';
  }

  initializeApp() {
    this.videoGrid = new VideoGrid();
    this.videoGrid.init();
    this.loadYouTubeAPI();
    this.fetchPopularVideos();

    // 검색 이벤트 리스너 추가
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => {
        this.searchVideos(searchInput.value);
      });

      searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.searchVideos(searchInput.value);
        }
      });
      console.log('Search event listeners added');
    } else {
      console.error('Search elements not found in DOM');
    }
  }

  loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    console.log('YouTube API loaded');
  }

  async searchVideos(query) {
    if (!query?.trim()) return;
    console.log('Searching for:', query);

    // 검색 시 이전에 본 비디오 ID 초기화
    this.seenVideoIds = new Set();

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=${query}&type=video&key=${API_KEY}`;

    try {
      const { items } = await this.fetchFromAPI(url, 0); // maxShorts 값을 0으로 설정

      if (!items || items.length === 0) {
        console.log('No search results found');
        this.displayVideos([], []);
        return;
      }

      // 검색 결과에서 비디오 ID 추출
      const videoIds = items.map((item) => item.id.videoId).join(',');

      // 추가 비디오 정보 가져오기 (통계, 길이 등)
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      // 상세 정보 맵 생성
      const detailsMap = new Map();
      detailsData.items?.forEach((detail) => {
        detailsMap.set(detail.id, detail);
        // 조회수 캐싱
        this.viewCountCache.set(detail.id, detail.statistics?.viewCount || 'N/A');
      });

      // 검색 결과와 상세 정보 결합
      const formattedItems = items.map((item) => {
        const details = detailsMap.get(item.id.videoId) || {};
        return {
          id: item.id.videoId,
          snippet: item.snippet,
          statistics: details.statistics || { viewCount: 'N/A' },
          contentDetails: details.contentDetails || {}
        };
      });

      console.log(`Found ${formattedItems.length} videos`);
      this.displayVideos(formattedItems);
    } catch (error) {
      console.error('Search error:', error);
      this.displayVideos([], []);
    }
  }

  async fetchPopularVideos() {
    console.log('Fetching popular videos');
    // 전체 카테고리 로드시 이전에 본 비디오 ID 초기화
    this.seenVideoIds = new Set();
    this.currentCategory = '전체';

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=16&key=${API_KEY}`;

    try {
      const data = await this.fetchFromAPI(url, 0);
      console.log(`Fetched ${data.items.length} popular videos`);
      await this.displayVideos(data.items);
    } catch (error) {
      console.error('Error fetching popular videos:', error);
      this.displayVideos([], []);
    }
  }

  getCategoryVideos(category) {
    if (!category) return;
    console.log('Category selected:', category);

    // 카테고리가 변경되었을 때만 seenVideoIds를 초기화
    if (this.currentCategory !== category) {
      this.seenVideoIds = new Set();
      this.currentCategory = category;
    }

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
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=${categoryId}&key=${API_KEY}`;

    try {
      const maxShorts = options.maxShorts !== undefined ? options.maxShorts : 7;
      console.log(`Fetching category ${categoryId} with maxShorts: ${maxShorts}`);

      // 로딩 표시 추가
      this.showLoadingIndicator();

      const { items, shorts } = await this.fetchFromAPI(url, maxShorts);

      // 로딩 표시 제거
      this.hideLoadingIndicator();

      await this.displayVideos(items, shorts);
    } catch (error) {
      this.hideLoadingIndicator();
      console.error(`Error fetching ${logMessage}:`, error);
    }
  }

  // 로딩 표시 함수
  showLoadingIndicator() {
    const contentContainer = document.querySelector('.video-grid');
    if (!contentContainer) return;

    contentContainer.innerHTML = '<div class="loading-indicator">로딩 중...</div>';
  }

  hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  buildApiUrl(endpoint, params) {
    const baseUrl = 'https://www.googleapis.com/youtube/v3';
    const queryParams = new URLSearchParams({
      ...params,
      key: API_KEY
    }).toString();

    return `${baseUrl}/${endpoint}?${queryParams}`;
  }

  async fetchPaginatedData(url, maxLongForm = 16, maxShorts = 7) {
    const items = [];
    const shorts = [];
    let nextPageToken = null;
    const channelIds = new Set();

    // Maximum 2 page fetches to avoid too many API calls
    const maxPages = 2;
    let currentPage = 0;

    while (currentPage < maxPages) {
      const paginatedUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;

      try {
        const response = await fetch(paginatedUrl);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        nextPageToken = data.nextPageToken;

        if (!data.items?.length) break;

        // Collect channel IDs for batch fetching
        data.items.forEach((item) => {
          const channelId = item.snippet?.channelId;
          if (channelId) channelIds.add(channelId);

          // Cache view counts directly from the response
          const videoId = item.id?.videoId || item.id;
          if (videoId && item.statistics?.viewCount) {
            this.viewCountCache.set(videoId, item.statistics.viewCount);
          }
        });

        const categorizedVideos = this.categorizeVideos(data.items, maxShorts);
        items.push(...categorizedVideos.items);
        shorts.push(...categorizedVideos.shorts);

        // Break if we have enough videos
        if (items.length >= maxLongForm && (maxShorts === 0 || shorts.length >= maxShorts)) break;

        // Break if no more pages
        if (!nextPageToken) break;

        currentPage++;
      } catch (error) {
        console.error('API error:', error);
        break;
      }
    }

    // Prefetch channel avatars in batch
    if (channelIds.size > 0) {
      await this.prefetchChannelAvatars(Array.from(channelIds));
    }

    return {
      items: items.slice(0, maxLongForm),
      shorts: shorts.slice(0, maxShorts)
    };
  }

  categorizeVideos(videos, maxShorts) {
    const categorized = { items: [], shorts: [] };
    const currentVideoIds = new Set(); // 현재 요청에서 발견된 비디오 ID 추적

    for (const video of videos) {
      const videoId = video.id?.videoId || video.id;
      if (!videoId || currentVideoIds.has(videoId)) continue;

      // 중복 방지를 위해 현재 요청 내에서 비디오 ID 추적
      currentVideoIds.add(videoId);

      // 같은 카테고리 내에서 중복 방지를 위해 이전에 본 ID 확인
      if (this.seenVideoIds.has(videoId)) continue;

      // 이 비디오 ID를 본 것으로 기록
      this.seenVideoIds.add(videoId);

      // 쇼츠 여부 확인
      const isShort = maxShorts > 0 && this.isShortBasedOnDuration(video.contentDetails?.duration);

      if (isShort) {
        categorized.shorts.push(video);
      } else {
        categorized.items.push(video);
      }
    }

    return categorized;
  }

  isShortBasedOnDuration(duration) {
    if (!duration) return false;

    // Parse ISO 8601 duration
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    // Calculate total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Shorts are typically under 60 seconds
    return totalSeconds <= 60;
  }

  async prefetchChannelAvatars(channelIds) {
    if (!channelIds.length) return;

    // Filter out already cached channel IDs
    const uncachedChannelIds = channelIds.filter((id) => !this.channelAvatarCache.has(id));
    if (!uncachedChannelIds.length) return;

    // Batch fetch in groups of 50 (API limit)
    for (let i = 0; i < uncachedChannelIds.length; i += 50) {
      const batch = uncachedChannelIds.slice(i, i + 50);
      const url = this.buildApiUrl('channels', {
        part: 'snippet',
        id: batch.join(',')
      });

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          data.items.forEach((channel) => {
            const avatarUrl =
              channel.snippet?.thumbnails?.default?.url ||
              '../../assets/images/avatars/default-avatar.png';
            this.channelAvatarCache.set(channel.id, avatarUrl);
          });
        }
      } catch (error) {
        console.error('Error batch fetching channel avatars:', error);
      }
    }
  }

  async fetchFromAPI(url, maxShorts = 7) {
    try {
      return await this.fetchPaginatedData(url, 16, maxShorts);
    } catch (error) {
      console.error('API request error:', error);
      return { shorts: [], items: [] };
    }
  }

  async displayVideos(videos, shortFormVideos = []) {
    if (!this.videoGrid) {
      console.error('VideoGrid is not initialized!');
      return;
    }

    const contentContainer = document.querySelector('.video-grid');
    if (!contentContainer) return;

    // 비디오가 없을 경우 사용자에게 알림
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

    // 레이아웃 최적화를 위한 데이터 조정: 일반 비디오 개수에 따라 쇼츠 위치 결정
    const minRegularVideosForNormalLayout = 8; // 정상 레이아웃을 위한 최소 일반 비디오 개수
    const shouldArrangeForSmallSet =
      videos &&
      videos.length < minRegularVideosForNormalLayout &&
      shortFormVideos &&
      shortFormVideos.length > 0;

    // Generate all card data in parallel
    const videoCardDataList = await Promise.all(
      (videos || []).map((video) => this.generateCardData(video))
    );

    const shortCardDataList = await Promise.all(
      (shortFormVideos || []).map((video) => this.generateCardData(video))
    );

    console.log(
      `Displaying ${videoCardDataList.length} videos and ${shortCardDataList.length} shorts`
    );

    // VideoGrid.js에 레이아웃 최적화 정보 함께 전달
    this.videoGrid.updateVideos(videoCardDataList, shortCardDataList, shouldArrangeForSmallSet);
  }

  async generateCardData(video) {
    const videoId = video.id.videoId || video.id;
    const { channelId } = video.snippet;

    // Use cached data when available
    const viewCount = this.viewCountCache.has(videoId)
      ? this.viewCountCache.get(videoId)
      : await this.fetchVideoViewCount(videoId);

    const avatar = this.channelAvatarCache.has(channelId)
      ? this.channelAvatarCache.get(channelId)
      : await this.fetchChannelAvatar(channelId);

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

  async fetchVideoViewCount(videoId) {
    try {
      if (this.viewCountCache.has(videoId)) {
        return this.viewCountCache.get(videoId);
      }

      const url = this.buildApiUrl('videos', {
        part: 'statistics',
        id: videoId
      });

      const response = await fetch(url);
      const data = await response.json();
      const viewCount = data.items?.[0]?.statistics?.viewCount || 'N/A';

      // Cache the result
      this.viewCountCache.set(videoId, viewCount);
      return viewCount;
    } catch (error) {
      console.error('Error fetching viewCount:', error);
      return 'N/A';
    }
  }

  async fetchChannelAvatar(channelId) {
    try {
      if (this.channelAvatarCache.has(channelId)) {
        return this.channelAvatarCache.get(channelId);
      }

      const url = this.buildApiUrl('channels', {
        part: 'snippet',
        id: channelId
      });

      const response = await fetch(url);
      const data = await response.json();
      const avatarUrl =
        data.items?.[0]?.snippet?.thumbnails?.default?.url ||
        '../../assets/images/avatars/default-avatar.png';

      // Cache the result
      this.channelAvatarCache.set(channelId, avatarUrl);
      return avatarUrl;
    } catch (error) {
      console.error('Error fetching avatar:', error);
      return '../../assets/images/avatars/default-avatar.png';
    }
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
      if (count >= value) {
        return `${Math.floor(count / value)}${suffix}회`;
      }
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
      if (diff > 0) {
        return `${diff}${unit} 전`;
      }
    }

    return '방금 전';
  }
}

export default QueryItems;
