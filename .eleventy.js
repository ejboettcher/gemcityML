const fs = require("fs");
const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItEmoji = require("markdown-it-emoji");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const faviconPlugin = require("eleventy-favicon");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon");

const removeTrailingSlash = (url) => {
  if (typeof url !== 'string') {
    throw new Error(`${removeTrailingSlash.name}: expected argument of type string but instead got ${url} (${typeof url})`);
  }
  return url.replace(/\/$/, '');
}

async function imageShortcode(src, cls, alt, sizes) {
  let metadata = await Image(src, {
    widths: [600, 900, 1500],
    formats: ["webp"],
    outputDir: "./public/img/"
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin, { destination: './public' });
  eleventyConfig.addPlugin(EleventyRenderPlugin);
eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
});
  eleventyConfig.addFilter('removeTrailingSlash', removeTrailingSlash);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addWatchTarget('./src/_includes/css/');

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true
    }).use(markdownItAttrs).use(markdownItEmoji)
  )

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ './src/static/': '/' });
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': '/js/alpine.js',
  })

  eleventyConfig.setBrowserSyncConfig({
    middleware: [
      function (req, res, next) {
        if (/^[^.]+$/.test(req.url)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
        next();
      }
    ],
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('public/404.html');
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addFilter("truncatewords", function (str = "", limit = 30) {
    return str.toString()
      .trim()
      .split(/\s+/g, limit)
      .join(" ") + "&hellip;";
  });


  return {
    dir: {
      input: 'src',
      output: 'public',
      data: './_data',
      includes: './_includes',
      layouts: './_layouts'
    },
    templateFormats: [
      'md',
      'njk',
      '11ty.js'
    ],
    htmlTemplateEngine: ['njk'],
  };
  module.exports = function(eleventyConfig) {
    eleventyConfig.setNunjucksEnvironmentOptions({
      throwOnUndefined: true,
      autoescape: false, // warning: don’t do this!
    });
  };
};