module.exports = {
  stories: [
    "../src/stories/Introduction.stories.mdx",
    "../src/stories/*.stories.mdx",
    "../src/stories/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y"],
};
