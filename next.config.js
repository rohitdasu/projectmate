/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'avatars.dicebear.com',
      'api.producthunt.com',
    ],
  },
};
