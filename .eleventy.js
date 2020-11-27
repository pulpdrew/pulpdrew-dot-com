const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("njk, md");
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addWatchTarget("src/styles");

  eleventyConfig.addPassthroughCopy("src/_public");
  eleventyConfig.addWatchTarget("src/_public");

  return {
    dir: {
      input: 'src'
    }
  }
};