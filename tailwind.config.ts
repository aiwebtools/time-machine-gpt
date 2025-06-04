
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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				mono: ['Space Mono', 'monospace'],
			},
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
				time: {
					dark: '#0f172a',    // Deep navy blue
					medium: '#1e3a8a',  // Medium blue
					light: '#3b82f6',   // Light blue
					accent: '#c2a06e',  // Gold accent
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				'slide-up': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					from: { transform: 'translateY(-20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'clock-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(194, 160, 110, 0.6)',
						borderColor: 'rgba(194, 160, 110, 0.8)'
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(194, 160, 110, 0.9)',
						borderColor: 'rgba(194, 160, 110, 1)'
					},
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'text-shimmer': {
					'0%': { backgroundPosition: '200% center' },
					'100%': { backgroundPosition: '-200% center' },
				},
				'sparkle': {
					'0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' },
				},
				'rotate-3d': {
					'0%': { transform: 'perspective(1000px) rotateY(0deg)' },
					'100%': { transform: 'perspective(1000px) rotateY(360deg)' },
				},
				'expand-circle': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(1.5)', opacity: '0' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'ripple': {
					'0%': { transform: 'scale(0.8)', opacity: '1' },
					'100%': { transform: 'scale(2.5)', opacity: '0' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-out': 'fade-out 0.6s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'slide-down': 'slide-down 0.6s ease-out',
				'clock-spin': 'clock-spin 10s linear infinite',
				'clock-spin-slow': 'clock-spin 30s linear infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 5s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'rotate-3d': 'rotate-3d 15s linear infinite',
				'expand-circle': 'expand-circle 2s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'ripple': 'ripple 3s ease-out infinite',
				'shimmer': 'shimmer 5s infinite linear'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
