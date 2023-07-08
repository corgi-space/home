module.exports = {
	darkMode: "class",
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--theme-color)",
				"primary-hover": "var(--theme-hover-color)",
				"danger-color": "var(--danger-color)"
			}
		}
	},
	plugins: [],
	corePlugins: {
		preflight: false
	}
}
