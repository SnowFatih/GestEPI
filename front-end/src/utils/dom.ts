export const isVisible = function (element: Element | HTMLDivElement | null, container: HTMLDivElement) {
  if (!element) {
    return false;
  }

  const { bottom, height, top } = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height;
};

export const scrollTo = function (id: string) {
  const anchor = document.getElementById(id);
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth' });
  }
};
