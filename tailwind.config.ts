
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
				'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				'display': ['Inter', 'sans-serif'],
				'heading': ['Inter', 'sans-serif'],
				'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				// Legacy aliases
				'myriad': ['Inter', 'sans-serif'],
				'serif': ['Inter', 'sans-serif'],
				'subtitle': ['Inter', 'sans-serif']
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
