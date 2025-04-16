class CacheManager {
  constructor() {
    // 캐시 저장소 초기화
    this.viewCountCache = new Map();
    this.channelAvatarCache = new Map();
    this.seenVideoIds = new Set();
    this.currentCategory = '전체';
  }

  // 비디오 ID 캐싱 관련 메서드
  resetVideoIdCache() {
    this.seenVideoIds = new Set();
  }

  resetCategoryCache(newCategory) {
    if (this.currentCategory !== newCategory) {
      this.seenVideoIds = new Set();
      this.currentCategory = newCategory;
      return true;
    }
    return false;
  }

  hasSeenVideo(videoId) {
    return this.seenVideoIds.has(videoId);
  }

  markVideoAsSeen(videoId) {
    this.seenVideoIds.add(videoId);
  }

  // 조회수 캐싱 관련 메서드
  hasViewCount(videoId) {
    return this.viewCountCache.has(videoId);
  }

  getViewCount(videoId) {
    return this.viewCountCache.get(videoId);
  }

  cacheViewCount(videoId, viewCount) {
    this.viewCountCache.set(videoId, viewCount);
  }

  cacheMultipleViewCounts(videoData) {
    videoData.forEach((item) => {
      const videoId = item.id?.videoId || item.id;
      if (videoId && item.statistics?.viewCount) {
        this.viewCountCache.set(videoId, item.statistics.viewCount);
      }
    });
  }

  // 채널 아바타 캐싱 관련 메서드
  hasChannelAvatar(channelId) {
    return this.channelAvatarCache.has(channelId);
  }

  getChannelAvatar(channelId) {
    return this.channelAvatarCache.get(channelId);
  }

  cacheChannelAvatar(channelId, avatarUrl) {
    this.channelAvatarCache.set(channelId, avatarUrl);
  }

  cacheMultipleChannelAvatars(channelsData) {
    channelsData.forEach((channel) => {
      const avatarUrl =
        channel.snippet?.thumbnails?.default?.url ||
        '../../assets/images/avatars/default-avatar.png';
      this.channelAvatarCache.set(channel.id, avatarUrl);
    });
  }

  // 비디오 중복 제거 및 분류
  categorizeVideos(videos, maxShorts, excludeSeenVideos = true) {
    const categorized = { items: [], shorts: [] };
    const currentVideoIds = new Set(); // 현재 요청에서 발견된 비디오 ID 추적

    for (const video of videos) {
      const videoId = video.id?.videoId || video.id;
      if (!videoId || currentVideoIds.has(videoId)) continue;

      // 중복 방지를 위해 현재 요청 내에서 비디오 ID 추적
      currentVideoIds.add(videoId);

      // 이전에 본 비디오 제외 (옵션)
      if (excludeSeenVideos && this.hasSeenVideo(videoId)) continue;

      // 이 비디오 ID를 본 것으로 기록
      this.markVideoAsSeen(videoId);

      // 쇼츠 여부 확인 (외부 함수 호출)
      const isShort = maxShorts > 0 && this.isShortVideo(video.contentDetails?.duration);

      if (isShort) {
        categorized.shorts.push(video);
      } else {
        categorized.items.push(video);
      }
    }

    return categorized;
  }

  // 쇼츠 여부 판단
  isShortVideo(duration) {
    if (!duration) return false;
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    return hours * 3600 + minutes * 60 + seconds <= 60;
  }
}

export default CacheManager;
