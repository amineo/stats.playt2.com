const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: false,
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {},
	important: '#root',
	plugins: [require('@tailwindcss/ui')],
};
