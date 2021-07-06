import Icon from '@components/UI/Icon';

// convert platform names to icon suitable names e.g. playstation5 => icon-playstation
function GamePlatforms({ platformsArray = null }) {
  if (!platformsArray) return '';

  const platforms = platformsArray
    .map(platform => platform.platform.slug)
    .map(platform => {
      if (platform === 'playstation5' || platform === 'playstation4')
        return 'icon-playstation';
      if (
        platform === 'xbox-series-x' ||
        platform === 'xbox-series-s' ||
        platform === 'xbox-one'
      )
        return 'icon-xbox';
      if (platform === 'nintendo-switch') return 'icon-nintendo-switch';
      if (platform === 'pc') return 'icon-socialwindows';
      if (platform === 'android') return 'icon-socialandroid';
      if (platform === 'ios' || platform === 'apple') return 'icon-socialapple';
    });

  const uniquePlatforms = [...new Set(platforms)].filter(platform => platform);

  return uniquePlatforms.map(platform => (
    <Icon type={platform} key={platform} />
  ));
}

export default GamePlatforms;
