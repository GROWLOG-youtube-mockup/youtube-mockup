class Sidebar {
    constructor() {
      this.render();
      this.addEventListeners();
    }
  
    render() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.innerHTML = `
        <nav class="sidebar__nav">
          <ul class="sidebar__menu">
            <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                <img src="./assets/icons/home.svg" alt="Home" class="sidebar__icon" />
                <span>홈</span>
              </a>
            </li>
            <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                <img src="./assets/icons/subscriptions.svg" alt="subscriptions" class="sidebar__icon" />
                <span>구독</span>
              </a>
            </li>
            <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                <img src="./assets/icons/youtube-music.svg" alt="youtube-music" class="sidebar__icon" />
                <span>YouTube Music</span>
              </a>
            </li>
            
            <li><hr class="sidebar__divider" /></li>

            <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                <img src="./assets/icons/history.svg" alt="history" class="sidebar__icon" />
                <span>시청 기록</span>
              </a>
            </li>
            <li class="sidebar__item">
              <a href="#" class="sidebar__link">
                <img src="./assets/icons/playlist.svg" alt="playlist" class="sidebar__icon" />
                <span>재생목록</span>
              </a>
            </li>
            <li class ="sidebar__item">
                <a href="#" class="sidebar__link">
                    <img src="./assets/icons/smart-display.svg" alt="smart-display" class="sidebar__icon" />
                    <span> 내 동영상 </span>
                </a>
            </li>
            <li class ="sidebar__item">
                <a href="#" class="sidebar__link">
                    <img src="./assets/icons/schedule.svg" alt="schedule" class="sidebar__icon" />
                    <span> 나중에 볼 동영상 </span>
                </a>
            </li>
            <li class ="sidebar__item">
                <a href="#" class="sidebar__link">
                    <img src="./assets/icons/thumb-up.svg" alt="thumb-up" class="sidebar__icon" />
                    <span> 좋아요 표시한 동영상  </span>
                </a>
            </li>

            <li><hr class="sidebar__divider" /></li>

            <li class ="sidebar__item">
                <a href="#" class="sidebar__link">
                    <img src="./assets/icons/popularity.svg" alt="popularity" class="sidebar__icon" />
                    <span> 인기 급상승 </span>
                </a>
            </li>
            <li class ="sidebar__item">
                <a href="#" class="sidebar__link">
                    <img src="./assets/icons/music-note.svg" alt="music-note" class="sidebar__icon" />
                    <span> 음악 </span>
                </a>
            </li>
          </ul>
        </nav>
      `;
    }

    addEventListeners() {
        const items = document.querySelectorAll('.sidebar__item');
    
        items.forEach((item) => {
          item.addEventListener('click', () => {
            items.forEach((el) => el.classList.remove('sidebar__item--active'));
    
            item.classList.add('sidebar__item--active');
          });
        });
      }
  }
  
  export default Sidebar;