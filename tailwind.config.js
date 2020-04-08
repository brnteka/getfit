const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		fontFamily: {
			"arimo": ["'Arimo'", "sans-serif"]
		},
		fontSize: {
			sm: "14px",
			base: '16px',
			md: "18px",
			lg: "24px",
			xl: "36px"

		},
		spacing: {
			"0": "0",
			"05": "5px",
			"1": "10px",
			"15": "15px",
			"2": "20px",
			"25": "25px",
			"3": "30px",
			"35": "35px",
			"4": "40px",
			"45": "45px",
			"5": "50px",
			"55": "55px",
			"6": "60px",
			"65": "65px",
			"7": "70px",
			"75": "75px",
		},
		colors: {
			black: colors.black,
			white: colors.white,
			gray: {
				100: "#F6F6F6",
				200: "#ECECEC"
			},
			red: {
				default: '#FF0029'
			},
			blue: {
				light: "#EFFBFF",
				dark: "#01AFF2"
			}
		},
		extend: {
		}
	},
	variants: {},
	plugins: [],
};
