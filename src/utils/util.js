export const createElement = (type, parent = null, option = null) => {
  const element = document.createElement(type);

  if (option) {
    Object.entries(option).forEach(([key, value]) => {
      if (key === 'classList' && typeof value === 'object') {
        const { method, className } = value;
        element.classList[method](...className);
      } else {
        element[key] = value;
      }
    });
  }

  if (parent) {
    parent.appendChild(element);
  }

  return element;
};

export function formatDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const [, h, m, s] = match.map((v) => (v ? parseInt(v) : 0));

  if (h) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}
