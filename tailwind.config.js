module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				login: "url('@/assets/images/login_left.png')"
			}
		},
		backgroundSize: {
			'80%': '80% 80%'
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
