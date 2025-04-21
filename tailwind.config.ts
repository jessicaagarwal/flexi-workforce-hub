
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(172,100%,34%)',
					foreground: 'hsl(0,0%,98%)'
				},
				secondary: {
					DEFAULT: 'hsl(0,0%,96%)',
					foreground: 'hsl(220,20%,20%)'
				},
				destructive: {
					DEFAULT: 'hsl(4,90%,58%)',
					foreground: 'hsl(0,0%,98%)'
				},
				muted: {
					DEFAULT: 'hsl(0,0%,96%)',
					foreground: 'hsl(220,20%,20%)'
				},
				accent: {
					DEFAULT: 'hsl(0,0%,96%)',
					foreground: 'hsl(220,20%,20%)'
				},
				popover: {
					DEFAULT: 'hsl(0,0%,100%)',
					foreground: 'hsl(220,20%,20%)'
				},
				card: {
					DEFAULT: 'hsl(0,0%,100%)',
					foreground: 'hsl(220,20%,20%)'
				},
				sidebar: {
					DEFAULT: 'hsl(172,100%,16%)',
					foreground: 'hsl(0,0%,96%)',
					primary: 'hsl(172,100%,34%)',
					'primary-foreground': 'hsl(0,0%,98%)',
					accent: 'hsl(172,100%,28%)',
					'accent-foreground': 'hsl(0,0%,98%)',
					border: 'hsl(172,100%,26%)',
					ring: 'hsl(172,100%,34%)'
				},
				hrms: {
					blue: 'hsl(172,100%,34%)', // new primary for HRMS
					success: 'hsl(144,60%,40%)',
					warning: 'hsl(4,90%,58%)',
					light: 'hsl(0,0%,96%)',
					text: 'hsl(220,20%,20%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
					},
					to: {
						opacity: '1',
					},
				},
				'slide-in': {
					from: {
						transform: 'translateX(-100%)',
					},
					to: {
						transform: 'translateX(0)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

