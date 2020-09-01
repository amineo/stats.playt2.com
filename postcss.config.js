const tailwindcss = require('tailwindcss');

const purgecss = require('@fullhuman/postcss-purgecss')({
	content: [ './src/**/*.js', './public/**/*.html' ],
	whitelistPatterns: [
		/-active$/,
		/-enter$/,
		/-leave-to$/,
		/bg-(blue|green|yellow|red)-50$/,
		/text-(blue|green|yellow|red)-(400|700|800)$/
	],
	defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = {
	plugins: [
		tailwindcss('./tailwind.config.js'),
		require('autoprefixer'),
		...(process.env.NODE_ENV === 'production' ? [ purgecss ] : [])
	]
};
