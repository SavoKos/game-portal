function link(url) {
  console.log(url);
  if (window) return window.open(url, '_blank', 'noopener,noreferrer');
  return '';
}

export default link;
