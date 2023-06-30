/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				josh: '#45975a'
			}
		}
	},
	darkMode: "class"
}
