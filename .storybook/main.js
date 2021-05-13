module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules[0].use[0].options.presets = config.module.rules[0].use[0].options.presets.map((preset) => {
      if (preset[0].indexOf("@babel/preset-react") === -1) {
        return preset;
      }
      return [preset[0], {
        runtime: 'classic',
      }];
    });
    return config;
  },
};
