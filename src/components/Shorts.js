export default function Shorts({ headerTitle = 'Shorts', cards = [] } = {}) {
  console.log('Rendering Shorts with cards:', cards);

  if (!cards || cards.length === 0) {
    console.warn('No cards provided for Shorts rendering');
    return `
      <div class="shorts-header">
        <span class="shorts-title">${headerTitle}</span>
      </div>
      <div class="shorts-cards-container">
      </div>
    `;
  }

  return `
    <div class="shorts-header" aria-label="Shorts Header">
      <div class="shorts-header-container" aria-label="Shorts Logo and Title">
        <div class="shorts-container-icon-box">
          <img
            class="shorts-icon"
            src="./assets/icons/shorts-icon.svg"
            alt="Youtube Shorts Logo"
          />
        </div>
        <span class="shorts-title">${headerTitle}</span>
      </div>
      <div class="shorts-three-dots" aria-label="More options">
        <img
          class="shorts-three-dots-icon"
          src="./assets/icons/three-dots.svg"
          alt="Shorts Three Dots"
        />
      </div>
    </div>
    <div class="shorts-cards-container">
      ${cards
        .map(
          (card) => `
        <div class="shorts-cards">
          <div class="shorts-cards-thumbnails">
            <img
              class="shorts-cards-thumbnails-img"
              src="${card.videoThumbnail.replace('mqdefault', 'oar2')}"
              alt="${card.title || 'Shorts Thumbnail'}"
            />
          </div>
          <div class="shorts-cards-thumbnails-under">
            <div class="shorts-cards-text" aria-label="Shorts Text">
              <div class="shorts-cards-text-title">
                ${card.title || 'Untitled'}
              </div>
              <div class="shorts-cards-text-viewed">${card.videoState || '0 views'}</div>
            </div>
            <div class="shorts-cards-three-dots">
              <img class="shorts-cards-three-dots-icon" src="./assets/icons/three-dots.svg" />
            </div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}
