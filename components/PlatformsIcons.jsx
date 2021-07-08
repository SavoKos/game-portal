import Icon from '@components/UI/Icon';

// takes one platform e.g. playstation5 and converts it into icon sutable name like icon-playstation

function PlatformsIcons({ platformsArray = null }) {
  console.log(platformsArray);
  if (!platformsArray) return '';

  const platforms = platformsArray.map(platform => {
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

export default PlatformsIcons;
