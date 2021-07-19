function link(url) {
  if (window) return window.open(url, '_blank', 'noopener,noreferrer');
  return '';
}

export default link;
