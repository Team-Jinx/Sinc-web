/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: { removeViewBox: false } },
          },
        },
        "url-loader",
      ],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
        CLIENT_KEY: JSON.stringify(process.env.CLIENT_KEY),
        DOMAIN:JSON.stringify(process.env.DOMAIN),
      }),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
    );

    return config;
  },

  env: {
    API_URL: process.env.API_URL,
    CLIENT_KEY: process.env.CLIENT_KEY,
    DOMAIN: process.env.DOMAIN
  },
};
