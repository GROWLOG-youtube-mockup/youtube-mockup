import { formatDuration } from '../utils/util.js';
import { API_KEY } from './const.js';
import VideoGrid from './VideoGrid.js'; 

class QueryItems {
  initializeApp() {
    // VideoGrid 인스턴스 생성 및 초기화
    this.videoGrid = new VideoGrid();
    this.videoGrid.init();

    // YouTube API 로드
    this.loadYouTubeAPI();

    // 초기 인기 비디오 로드
    this.fetchPopularVideos();
  }

  // YouTube API 로드 메서드 정의
  loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    console.log('YouTube API loaded');
  }

  // 검색 기능
  async searchVideos(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=${query}&type=video&key=${API_KEY}`;
    const { items } = await this.fetchFromAPI(url, 0);

    // videoId 추출
    const videoIds = items.map((item) => item.id.videoId).join(',');

    // videos 엔드포인트 호출
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // contentDetails와 statistics를 items에 병합
    const detailedItems = items.map((item) => {
      const detail = detailsData.items.find((d) => d.id === item.id.videoId);
      return {
        ...item,
        snippet: detail?.snippet || item.snippet,
        contentDetails: detail?.contentDetails || {},
        statistics: detail?.statistics || {},
      };
    });

    this.displayVideos(detailedItems);
  }

  // 인기 비디오 로드
  async fetchPopularVideos() {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=16&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url, 0);
    console.log('Popular videos fetched:', data);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  // 카테고리별 비디오 로드
  getCategoryVideos(item) {
    if (!item) {
      return;
    }

    const category = item;
    console.log('Category clicked:', category);

    // 카테고리에 따라 비디오 로드
    switch (category) {
      case '전체':
        this.fetchPopularVideos();
        break;
      case '게임':
        this.fetchGamingVideos();
        break;
      case '음악':
        this.fetchMusicVideos();
        break;
      case '영화/애니메이션':
        this.fetchMovieVideos();
        break;
      case '동물':
        this.fetchAnimalVideos();
        break;
      case '스포츠':
        this.fetchSportsVideos();
        break;
      case '뉴스':
        this.fetchNewsVideos();
        break;
      case '기술':
        this.fetchCultureVideos();
        break;
      case '브이로그':
        this.fetchVlogideos();
        break;
      default:
        this.fetchPopularVideos();
        break;
    }
    console.log('Category videos fetched:', category);
  }

  // 카테고리별 비디오 로드 메서드
  async fetchCategoryVideos(categoryId, logMessage, options = {}) {
    console.log(logMessage);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;

    try {
      const maxShorts = options.maxShorts !== undefined ? options.maxShorts : 7;
      console.log(`maxShorts value: ${maxShorts}`); // 로그 추가
      const { items, shorts } = await this.fetchFromAPI(url, maxShorts);
      this.displayVideos(items, shorts);
    } catch (error) {
      console.error(`Error fetching videos for category ${categoryId}:`, error);
    }
  }

  async fetchGamingVideos() {
    await this.fetchCategoryVideos(20, 'Fetching gaming videos', { maxShorts: 0 });
  }

  async fetchMusicVideos() {
    await this.fetchCategoryVideos(10, 'Fetching music videos', { maxShorts: 0 });
  }

  async fetchMovieVideos() {
    await this.fetchCategoryVideos(1, 'Fetching movie videos');
  }

  async fetchAnimalVideos() {
    await this.fetchCategoryVideos(15, 'Fetching animal videos');
  }

  async fetchSportsVideos() {
    await this.fetchCategoryVideos(17, 'Fetching sports videos');
  }

  async fetchNewsVideos() {
    await this.fetchCategoryVideos(25, 'Fetching news videos');
  }

  async fetchCultureVideos() {
    await this.fetchCategoryVideos(28, 'Fetching culture videos');
  }

  async fetchVlogideos() {
    await this.fetchCategoryVideos(22, 'Fetching vlog videos');
  }

  preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  }

  // API 요청을 통해 비디오 데이터 가져오기
  // maxLongForm: 최대 일반 비디오 개수, maxShorts: 최대 숏츠 개수
  fetchPaginatedData = async (url, maxLongForm = 16, maxShorts = 7) => {
    let items = [];
    let shorts = [];
    let nextPageToken = null;
    const seenVideoIds = new Set();

    while (items.length < maxLongForm || shorts.length < maxShorts) {
      const paginatedUrl = nextPageToken ? `${url}&pageToken=${nextPageToken}` : url;

      const response = await fetch(paginatedUrl);
      if (!response.ok) {
        console.error(`API request failed with status ${response.status}`);
        break;
      }

      const data = await response.json();
      nextPageToken = data.nextPageToken;

      if (!data.items || data.items.length === 0) {
        break;
      }

      const categorizedVideos = await Promise.all(
        data.items.reduce((acc, video) => {
          const videoId = video.id?.videoId || video.id;
          if (!videoId || seenVideoIds.has(videoId)) return acc;

          seenVideoIds.add(videoId);
          acc.push(
            (async () => {
              const isShort = maxShorts > 0 ? await this.isShortVideo(videoId) : false;
              return { video, isShort };
            })()
          );
          return acc;
        }, [])
      );

      categorizedVideos.forEach((item) => {
        if (item?.isShort && shorts.length < maxShorts) {
          shorts.push(item.video);
        } else if (!item?.isShort && items.length < maxLongForm) {
          items.push(item.video);
        }
      });

      if (!nextPageToken) {
        console.warn('No more pages available. Stopping.');
        break;
      }
    }

    return {
      items,
      shorts
    };
  };

  // API 요청을 통해 비디오 데이터 가져오기
  fetchFromAPI = async (url, maxShorts = 7) => {
    try {
      const { items, shorts } = await this.fetchPaginatedData(url, 16, maxShorts);
      return { items, shorts };
    } catch (error) {
      console.error('API request error:', error);
      return { shorts: [], items: [] };
    }
  };

  // 숏츠 비디오 판별
  isShortVideo = (videoId) => {
    const expectedThumbnailUrl = `https://i.ytimg.com/vi_webp/${videoId}/oar2.webp`;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.naturalHeight >= img.naturalWidth);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = expectedThumbnailUrl;
    });
  };

  // 비디오 카드 생성 및 렌더링
  async displayVideos(videos, shortFormVideos = []) {
    const contentContainer = document.querySelector('.video-grid');
    contentContainer.innerHTML = '';

    if (shortFormVideos.length === 0) {
      contentContainer.classList.add('no-shorts');
    } else {
      contentContainer.classList.remove('no-shorts');
    }

    if (!videos || videos.length === 0) {
      console.warn('No videos to display.');
      return;
    }

    // generateCardData를 직접 호출
    const videoCardDataList = await Promise.all(videos.map((video) => this.generateCardData(video)));
    const shortCardDataList = await Promise.all(shortFormVideos.map((shortFormVideo) => this.generateCardData(shortFormVideo))
    );

    const videoGrid = new VideoGrid();
    videoGrid.updateVideos(videoCardDataList, shortCardDataList);
  }

  // 비디오 카드 데이터 생성
  async generateCardData(video) {
    const videoId = video.id.videoId || video.id;
    const { title } = video.snippet;
    const channelId = video.snippet.channelTitle;
    const channel = video.snippet.channelId;
    const rawDuration = video.contentDetails?.duration || 'PT0M0S';
    const formattedDuration = formatDuration(rawDuration);

    const viewCount = video.statistics?.viewCount || 'N/A';

    // 비동기 처리 병렬화
    const [avatar, videoThumbnail] = await Promise.all([
      fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channel}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) =>
          data.items?.[0]?.snippet?.thumbnails?.default?.url || '../../assets/images/avatars/default-avatar.png'
)
        .catch((error) => {
          console.error('Error fetching avatar:', error);
          return '../../assets/images/avatars/default-avatar.png';
        }),
      Promise.resolve(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` || '../../assets/images/thumbnails/default-thumbnail.jpg')
    ]);

    const publishedAt = this.formatPublishedDate(video.snippet.publishedAt);

    return {
      videoThumbnail,
      avatar,
      title,
      channelId,
      channel,
      duration: formattedDuration,
      videoState: `조회수 ${this.formatViewCount(viewCount)} ${publishedAt}`
    };
  }

  formatViewCount(viewCount) {
    if (!viewCount) return '0회';

    const count = Number.parseInt(viewCount);

    if (count >= 100000000) {
      return `${Math.floor(count / 100000000)}억회`;
    }

    if (count >= 10000) {
      return `${Math.floor(count / 10000)}만회`;
    }

    if (count >= 1000) {
      return `${Math.floor(count / 1000)}천회`;
    }

    return `${count}회`;
  }

  formatPublishedDate(publishedAt) {
    if (!publishedAt) return '알 수 없음';

    const published = new Date(publishedAt);
    const now = new Date();
    const diffMs = now - published;

    if (Number.isNaN(diffMs)) {
      return '알 수 없음';
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffMonth / 12);

    if (diffYear > 0) {
      return `${diffYear}년 전`;
    }

    if (diffMonth > 0) {
      return `${diffMonth}개월 전`;
    }

    if (diffDay > 0) {
      return `${diffDay}일 전`;
    }

    if (diffHour > 0) {
      return `${diffHour}시간 전`;
    }

    if (diffMin > 0) {
      return `${diffMin}분 전`;
    }

    return '방금 전';
  }
}

export default QueryItems;
