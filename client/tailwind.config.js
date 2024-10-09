/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '0px 2px 8px rgba(99, 99, 99, 0.2)'
            },
            colors: {
                'charcoal': '#333333',
                'light-charcoal': '#5e5d5d',
            },
            fontFamily: {
                Montserrat: ['Montserrat', 'sans-serif'],
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"'
                ]
            }
        }
    },
    plugins: []
};
