
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
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '2.5rem',
				xl: '3rem',
				'2xl': '4rem',
			},
			screens: {
				sm: '540px',
				md: '720px',
				lg: '960px',
				xl: '1140px',
				'2xl': '1320px',
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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Premium Dark palette
				dark: {
					'base': 'hsl(var(--dark-base))',
					'elevated': 'hsl(var(--dark-elevated))',
					'surface': 'hsl(var(--dark-surface))',
					'border': 'hsl(var(--dark-border))',
					'subtle': 'hsl(var(--dark-subtle))'
				},
				light: {
					'primary': 'hsl(var(--light-primary))',
					'secondary': 'hsl(var(--light-secondary))',
					'muted': 'hsl(var(--light-muted))'
				},
				glow: {
					'primary': 'hsl(var(--glow-primary))',
					'secondary': 'hsl(var(--glow-secondary))',
					'accent': 'hsl(var(--glow-accent))'
				},
				// LEAN Transportes brand palette
				lean: {
					'green-900': '#1e3d28',
					'green-800': '#2a5235',
					'green-700': '#3a6b4a',
					'green-600': '#4a8460',
					'green-500': '#5c9e74',
					'green-400': '#7dba93',
					'green-300': '#a5d1b4',
					'green-200': '#cce8d4',
					'green-100': '#eaf5ed',
					'charcoal-900': '#0d0d0d',
					'charcoal-800': '#1a1a1a',
					'charcoal-700': '#2d2d2d',
					'charcoal-600': '#3f3f3f',
					'charcoal-500': '#555555',
					'charcoal-400': '#777777',
					'charcoal-300': '#999999',
					'charcoal-200': '#cccccc',
					'charcoal-100': '#f0f0f0',
					'off-white': '#f7f6f3',
				},
				// Legacy aliases for compatibility
				luxury: {
					'deep-black': 'hsl(var(--dark-base))',
					'charcoal': 'hsl(var(--dark-elevated))',
					'dark-gray': 'hsl(var(--dark-surface))',
					'medium-gray': 'hsl(var(--dark-border))',
					'light-gray': 'hsl(var(--dark-subtle))',
					'warm-gray': 'hsl(var(--light-muted))',
					'bronze': 'hsl(var(--light-secondary))',
					'gold': 'hsl(var(--light-primary))',
					'light-gold': 'hsl(var(--light-secondary))',
					'cream': 'hsl(var(--dark-surface))',
					'white': 'hsl(var(--light-primary))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 4px)',
				sm: 'calc(var(--radius) - 8px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate))' },
					'50%': { transform: 'translateY(-20px) rotate(var(--tw-rotate))' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'shimmer': 'shimmer 2s infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite'
			},
			fontFamily: {
				'sans': ['Barlow', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				'display': ['Playfair Display', 'serif'],
				'heading': ['Barlow Condensed', 'Barlow', 'sans-serif'],
				'body': ['Barlow', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'condensed': ['Barlow Condensed', 'sans-serif'],
				// Legacy aliases
				'myriad': ['Barlow', 'sans-serif'],
				'serif': ['Playfair Display', 'serif'],
				'subtitle': ['Barlow Condensed', 'sans-serif']
			},
			boxShadow: {
				'glow-sm': '0 0 20px -5px hsla(var(--glow-primary), 0.2)',
				'glow': '0 0 40px -10px hsla(var(--glow-primary), 0.3)',
				'glow-lg': '0 0 60px -15px hsla(var(--glow-primary), 0.4)',
				'dark-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
				'dark-xl': '0 35px 60px -15px rgba(0, 0, 0, 0.6)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
