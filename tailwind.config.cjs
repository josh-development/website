/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}'],
	plugins: [require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				josh: {
					100: '#ddf7f5',
					200: '#b2decd',
					300: '#86d3a9',
					400: '#5bc781',
					500: '#45975a',
					600: '#288843',
					700: '#0b6f2c',
					800: '#009b67',
					900: '#00c99f'
				}
			}
		}
	},
	darkMode: 'class'
};
