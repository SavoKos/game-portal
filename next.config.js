const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  target: 'serverless',
  assetPrefix: isProd ? 'https://media.rawg.io' : '',
  images: {
    domains: ['media.rawg.io'],
  },
};
