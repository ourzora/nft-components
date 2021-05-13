module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    console.log(config.module.rules[0].use[0])
    config.module.rules[0].use[0].options.presets = config.module.rules[0].use[0].options.presets.map((preset) => {
      if (preset[0].indexOf("@babel/preset-react") === -1) {
        return preset;
      }
      return [preset[0], {
        runtime: 'classic',
      }];
    });
    console.log(JSON.stringify(config.module.rules[0].use[0]));
    // config.module.rules[0].use[0].options.presets = [
    //   require.resolve("@babel/preset-react"),
    //   require.resolve("@babel/preset-env"),
    //   // require.resolve("@emotion/babel-preset-css-prop"),
    // ];

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   loader: require.resolve("babel-loader"),
    //   options: {
    //     presets: [
    //       ["react-app", { flow: false, typescript: true }],
    //       // require.resolve("@emotion/babel-preset-css-prop"),
    //     ],
    //   },
    // });

    // Return the altered config
    return config;
  },
};
