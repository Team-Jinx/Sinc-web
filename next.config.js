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
        API_URL: JSON.stringify(process.env.API_URL)
      }),
      new webpack.EnvironmentPlugin(["NODE_ENV"]),
    );

    return config;
  },

  env: {
    API_URL: process.env.API_URL
  },
};
