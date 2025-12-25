/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6fff5',
                    100: '#b3ffe6',
                    200: '#80ffd4',
                    300: '#4dffc3',
                    400: '#1affb2',
                    500: '#00ff88',
                    600: '#00cc6a',
                    700: '#00994f',
                    800: '#006635',
                    900: '#00331a'
                },
                dark: {
                    50: '#f5f5f5',
                    100: '#e5e5e5',
                    200: '#cccccc',
                    300: '#999999',
                    400: '#666666',
                    500: '#333333',
                    600: '#1a1a2e',
                    700: '#16162a',
                    800: '#0f0f1a',
                    900: '#0a0a0f'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 255, 136, 0.3)',
                'glow-lg': '0 0 40px rgba(0, 255, 136, 0.4)'
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'gradient': 'gradient 8s linear infinite'
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.5)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                'gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                }
            }
        },
    },
    plugins: [],
}
