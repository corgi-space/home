module.exports = {
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
	theme: {
		extend: {
			colors: {
				"theme-color": "var(--theme-color)"
			}
		}
	},
	plugins: [],
	corePlugins: {
		preflight: false
	}
}
