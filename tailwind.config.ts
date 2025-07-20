import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			// Paleta de colores personalizada SessAI
  			slate: {
  				50: '#f8fafc',
  				100: '#f1f5f9',
  				200: '#e2e8f0',
  				300: '#cbd5e1',
  				400: '#94a3b8',
  				500: '#64748b',
  				600: '#475569',
  				700: '#334155',
  				800: '#1e293b',
  				900: '#0f172a'
  			},
  			// Colores principales de SessAI (basados en el logo)
  			teal: {
  				300: '#5eead4',
  				400: '#2dd4bf',
  				500: '#14b8a6',
  				600: '#0d9488',
  				700: '#0f766e'
  			},
  			blue: {
  				300: '#93c5fd',
  				400: '#60a5fa',
  				500: '#3b82f6',
  				600: '#2563eb',
  				700: '#1d4ed8'
  			},
  			purple: {
  				400: '#a78bfa',
  				500: '#8b5cf6',
  				600: '#7c3aed'
  			},
  			green: {
  				400: '#4ade80',
  				500: '#22c55e',
  				600: '#16a34a'
  			},
  			red: {
  				400: '#f87171',
  				500: '#ef4444',
  				600: '#dc2626'
  			},
  			orange: {
  				400: '#fb923c',
  				500: '#f97316',
  				600: '#ea580c'
  			},
  			// Colores del sistema personalizado
  			'bg-primary': 'rgb(var(--bg-primary))',
  			'bg-secondary': 'rgb(var(--bg-secondary))',
  			'bg-tertiary': 'rgb(var(--bg-tertiary))',
  			'surface-primary': 'rgb(var(--surface-primary))',
  			'surface-secondary': 'rgb(var(--surface-secondary))',
  			'surface-hover': 'rgb(var(--surface-hover))',
  			'border-primary': 'rgb(var(--border-primary))',
  			'border-secondary': 'rgb(var(--border-secondary))',
  			'blue-primary': 'rgb(var(--blue-primary))',
  			'blue-hover': 'rgb(var(--blue-hover))',
  			'blue-light': 'rgb(var(--blue-light))',
  			'text-primary': 'rgb(var(--text-primary))',
  			'text-secondary': 'rgb(var(--text-secondary))',
  			'text-muted': 'rgb(var(--text-muted))',
  			// Compatibilidad shadcn/ui
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		fontFamily: {
  			sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
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
  				'0%': { opacity: '0', transform: 'translateY(4px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			'slide-in': {
  				'0%': { opacity: '0', transform: 'translateX(-8px)' },
  				'100%': { opacity: '1', transform: 'translateX(0)' }
  			},
  			'pulse-soft': {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.8' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.3s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out',
  			'pulse-soft': 'pulse-soft 2s infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
