const purgecss = require("@fullhuman/postcss-purgecss")({
	content: [
		"./src/**/*.pug",
		"./src/**/*.js",
	],
	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const autoprefixer = require("autoprefixer");

const cssnano = require("cssnano")({ preset: "default" });

module.exports = {
	plugins: [
		require("postcss-import"),
		require("tailwindcss"),
		require("postcss-nested"),
		...(process.env.NODE_ENV === "production"
			? [purgecss, autoprefixer, cssnano]
			: []),
	],
};
