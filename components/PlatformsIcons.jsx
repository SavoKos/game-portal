import Icon from '@components/UI/Icon';

// takes one platform e.g. playstation5 and converts it into icon sutable name like icon-playstation

function PlatformsIcons({ platformsArray = null, limited = false }) {
  if (!platformsArray) return '';

  const platforms = platformsArray.map(platform => {
    if (platform === 'playstation') return 'icon-playstation';
    if (platform === 'xbox') return 'icon-xbox';
    if (platform === 'nintendo') return 'icon-nintendo-switch';
    if (platform === 'pc') return 'icon-socialwindows';
    if (platform === 'linux') return 'icon-linux';
    if (platform === 'android') return 'icon-android';
    if (platform === 'mac' || platform === 'apple') return 'icon-mac';
    if (platform === 'ios') return 'icon-IOS';
    if (platform === 'web') return 'icon-web';
    if (platform === 'sega') return 'icon-sega';
    if (platform === 'atari') return 'icon-atari';
  });

  const uniquePlatforms = [...new Set(platforms)].filter(platform => platform);

  if (limited && uniquePlatforms.length > 4) {
    return (
      <>
        {uniquePlatforms.slice(0, 4).map(platform => (
          <Icon type={platform} key={platform} />
        ))}
        <span>{`+${uniquePlatforms.length - 4}`}</span>
      </>
    );
  }

  return uniquePlatforms.map(platform => (
    <Icon type={platform} key={platform} />
  ));
}

export default PlatformsIcons;
