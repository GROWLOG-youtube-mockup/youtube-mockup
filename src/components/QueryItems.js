import VideoGrid from './VideoGrid.js'; // VideoGrid 클래스 import
import { API_KEY } from './const.js';
import { formatDuration } from '../utils/util.js';

class QueryItems {
  initializeApp() {
    // YouTube API 로드
    this.loadYouTubeAPI(); // 클래스 메서드로 호출

    // 초기 인기 비디오 로드
    this.fetchPopularVideos();
  }

  // YouTube API 로드 메서드 정의
  loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    console.log("YouTube API loaded");
  }

  // 사이드바 이벤트 설정 (임시 메서드)
  setupSidebarEvents() {
    console.log("Sidebar events setup");
  }

  // 검색 기능 구현 (임시 메서드)
  setupSearchFunctionality() {
    console.log("Search functionality setup");
  }

  // 인기 비디오 로드 
  async fetchPopularVideos() {
    //const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&key=${API_KEY}`;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=16&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  // 카테고리별 비디오 로드
  getCategoryVideos(item) {
    if (!item) {
      return;
    }

    const category = item;
    console.log("Category clicked:", category);

    // 카테고리에 따라 비디오 로드
    switch (category) {
      case "전체":
        this.fetchPopularVideos();
        break;
      case "게임":
        this.fetchGamingVideos();
        break;
      case "음악":
        this.fetchMusicVideos();
        break;
      case "영화/애니메이션":
        this.fetchMovieVideos();
        break;
      case "동물":
        this.fetchAnimalVideos();
        break;
      case "스포츠":
        this.fetchSportsVideos();
        break;
      case "뉴스":
        this.fetchNewsVideos();
        break;
      case "교양":
        this.fetchCultureVideos();
        break;
      case "브이로그":
        this.fetchVlogideos();
        break;
      default:
        this.fetchPopularVideos();
        break;
    }
    console.log("Category videos fetched:", category);
  }

  // 추가적인 카테고리별 비디오 로드 메서드
  async fetchGamingVideos() {
    console.log("Fetching gaming videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=20&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchMusicVideos() {
    console.log("Fetching music videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=10&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchMovieVideos() {
    console.log("Fetching movie videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoDuration=long&videoCategoryId=1&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchAnimalVideos() {
    console.log("Fetching anime videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoDuration=long&videoCategoryId=15&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchSportsVideos() {
    console.log("Fetching sports videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&videoDuration=long&maxResults=16&videoCategoryId=17&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchNewsVideos() {
    console.log("Fetching news videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=25&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchCultureVideos() {
    console.log("Fetching culture videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=27&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchVlogideos() {
    console.log("Fetching vlog videos");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=16&videoCategoryId=22&key=${API_KEY}`;
    const data = await this.fetchFromAPI(url);

    this.displayVideos(data.items); // 클래스 메서드로 호출
  }

  async fetchFromAPI(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      return null;
    }
  }

  async displayVideos(videos) {
    if (!videos || !videos.length) {
      console.error("No videos to display");
      return;
    }

    const contentContainer = document.querySelector(".video-grid");
    if (!contentContainer) {
      console.error("Content container not found");
      return;
    }

    contentContainer.innerHTML = ""; // 기존 콘텐츠 비우기

    const videoCardDataList = await Promise.all(
      videos.map(video => this.createVideoCard(video))
    );

    // VideoGrid 인스턴스 생성 및 업데이트
    const videoGrid = new VideoGrid();
    videoGrid.updateVideos(videoCardDataList);
  }

  // 비디오 카드 생성
  createVideoCard(video) {
    return new Promise((resolve, reject) => {
      if (!video || !video.snippet) {
        return reject("Invalid video data");
      }

      const videoId = video.id.videoId || video.id;
      const title = video.snippet.title;
      const channelId = video.snippet.channelTitle;
      const channel = video.snippet.channelId;
      const rawDuration = video.contentDetails?.duration || "PT0M0S";
      const formattedDuration = formatDuration(rawDuration);

      const viewCount = video.statistics?.viewCount
        ? this.formatViewCount(video.statistics.viewCount)
        : "N/A";
      const publishedAt = this.formatPublishedDate(video.snippet.publishedAt);

      const videoThumbnail = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
      const avatarlink = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channel}&key=${API_KEY}`;

      // Fetch avatar image
      fetch(avatarlink)
        .then(response => response.json())
        .then(data => {
          const avatar = data.items?.[0]?.snippet?.thumbnails?.default?.url || '../../assets/images/avatars/default-avatar.png';
          console.log('Avatar Image URL:', avatar);

          // 비디오 카드 데이터를 객체로 생성
          const videoCardData = {
            videoThumbnail,
            avatar,
            title,
            channelId,
            channel,
            videoState: `조회수 ${viewCount} ${publishedAt}`,
            duration: formattedDuration,
          };

          console.log('Generated Video Card Data:', videoCardData);
          resolve(videoCardData); // 비디오 카드 데이터 반환
        })
        .catch(error => {
          console.error('Error fetching avatar:', error);
          reject(error);
        });
    });
  }

  formatViewCount(viewCount) {
    if (!viewCount) return "0회";

    const count = Number.parseInt(viewCount);

    if (count >= 10000000) {
      return `${Math.floor(count / 10000000)}천만회`;
    }

    if (count >= 1000000) {
      return `${Math.floor(count / 1000000)}백만회`;
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
    if (!publishedAt) return "알 수 없음";

    const published = new Date(publishedAt);
    const now = new Date();
    const diffMs = now - published;

    if (Number.isNaN(diffMs)) {
      return "알 수 없음";
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

    return "방금 전";
  }


}

export default QueryItems;
