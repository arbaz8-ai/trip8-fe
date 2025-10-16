/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  images: { unoptimized: true },
  // async redirects() {
  //   return [
  //     {
  //       source: "/authentication/otp",
  //       destination: "/authentication/login",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
