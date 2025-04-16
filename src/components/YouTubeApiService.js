import { API_KEY } from './const.js';

class YouTubeApiService {
  constructor() {
    this.loadYouTubeAPI();
  }

  loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    document
      .getElementsByTagName('script')[0]
      .parentNode.insertBefore(tag, document.getElementsByTagName('script')[0]);
    console.log('YouTube API loaded');
  }

  // API URL 생성 유틸리티
  buildApiUrl(endpoint, params) {
    const baseUrl = 'https://www.googleapis.com/youtube/v3';
    return `${baseUrl}/${endpoint}?${new URLSearchParams({ ...params, key: API_KEY })}`;
  }

  // 검색 API 호출
  async searchVideos(query, maxResults = 16) {
    const url = this.buildApiUrl('search', {
      part: 'snippet',
      maxResults: maxResults.toString(),
      q: query,
      type: 'video'
    });

    try {
      const { items } = await this.fetchFromAPI(url, 0);
      if (!items || items.length === 0) return { items: [] };

      // 비디오 ID 추출
      const videoIds = items.map((item) => item.id.videoId).join(',');

      // 비디오 상세 정보 가져오기
      const detailsData = await this.getVideoDetails(videoIds);

      // 상세 정보 맵 생성
      const detailsMap = new Map();
      detailsData.items?.forEach((detail) => {
        detailsMap.set(detail.id, detail);
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

      return { items: formattedItems };
    } catch (error) {
      console.error('Search error:', error);
      return { items: [] };
    }
  }

  // 인기 비디오 가져오기
  async getPopularVideos(regionCode = 'KR', maxResults = 16) {
    const url = this.buildApiUrl('videos', {
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      regionCode,
      maxResults: maxResults.toString()
    });

    try {
      return await this.fetchFromAPI(url, 0);
    } catch (error) {
      console.error('Error fetching popular videos:', error);
      return { items: [], shorts: [] };
    }
  }

  // 카테고리별 비디오 가져오기
  async getCategoryVideos(categoryId, regionCode = 'KR', maxResults = 16, maxShorts = 7) {
    const url = this.buildApiUrl('videos', {
      part: 'snippet,statistics,contentDetails',
      chart: 'mostPopular',
      regionCode,
      maxResults: maxResults.toString(),
      videoCategoryId: categoryId.toString()
    });

    try {
      return await this.fetchFromAPI(url, maxShorts);
    } catch (error) {
      console.error(`Error fetching category ${categoryId} videos:`, error);
      return { items: [], shorts: [] };
    }
  }

  // 비디오 상세 정보 가져오기
  async getVideoDetails(videoIds) {
    if (!videoIds) return { items: [] };

    const url = this.buildApiUrl('videos', {
      part: 'snippet,statistics,contentDetails',
      id: videoIds
    });

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching video details:', error);
      return { items: [] };
    }
  }

  // 채널 정보 가져오기 (배치 처리)
  async getChannelsInfo(channelIds) {
    if (!channelIds || channelIds.length === 0) return { items: [] };

    const url = this.buildApiUrl('channels', {
      part: 'snippet',
      id: channelIds.join(',')
    });

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching channels info:', error);
      return { items: [] };
    }
  }

  // 페이지네이션 처리 함수
  async fetchPaginatedData(url, maxLongForm = 16, maxShorts = 7) {
    const items = [];
    const shorts = [];
    let nextPageToken = null;
    const channelIds = new Set();
    const videoIdsSet = new Set();
    const maxPages = 2;

    for (let currentPage = 0; currentPage < maxPages; currentPage++) {
      const paginatedUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;

      try {
        const response = await fetch(paginatedUrl);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const data = await response.json();
        nextPageToken = data.nextPageToken;

        if (!data.items?.length) break;

        // 채널 ID 수집
        data.items.forEach((item) => {
          const channelId = item.snippet?.channelId;
          if (channelId) channelIds.add(channelId);

          // 비디오 ID 추적
          const videoId = item.id?.videoId || item.id;
          if (videoId) videoIdsSet.add(videoId);
        });

        // 비디오 분류 (쇼츠/일반)
        data.items.forEach((video) => {
          const isShort =
            maxShorts > 0 && this.isShortBasedOnDuration(video.contentDetails?.duration);
          if (isShort) {
            shorts.push(video);
          } else {
            items.push(video);
          }
        });

        // 충분한 비디오를 얻었거나 더 이상 페이지가 없으면 중단
        if (
          (items.length >= maxLongForm && (maxShorts === 0 || shorts.length >= maxShorts)) ||
          !nextPageToken
        )
          break;
      } catch (error) {
        console.error('API error:', error);
        break;
      }
    }

    return {
      items: items.slice(0, maxLongForm),
      shorts: shorts.slice(0, maxShorts),
      channelIds: Array.from(channelIds),
      videoIds: Array.from(videoIdsSet)
    };
  }

  // API 호출 래퍼 함수
  async fetchFromAPI(url, maxShorts = 7) {
    try {
      return await this.fetchPaginatedData(url, 16, maxShorts);
    } catch (error) {
      console.error('API request error:', error);
      return { shorts: [], items: [], channelIds: [], videoIds: [] };
    }
  }

  // 쇼츠 여부 판단 (60초 이하)
  isShortBasedOnDuration(duration) {
    if (!duration) return false;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    return hours * 3600 + minutes * 60 + seconds <= 60;
  }
}

export default YouTubeApiService;
