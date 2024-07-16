module.exports = {
  target: 'serverless',
  env: {
    SERVER: process.env.SERVER,
  },
  images: {
    domains: ['media.rawg.io', 'res.cloudinary.com', 'links.savokos.com'],
  },
};
