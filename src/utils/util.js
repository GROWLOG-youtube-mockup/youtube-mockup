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
