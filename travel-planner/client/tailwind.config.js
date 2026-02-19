/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2563EB', // Blue (trust)
                secondary: '#10B981', // Green (discount/action)
                danger: '#EF4444', // Red (urgency)
                background: '#F3F4F6', // Light gray
                surface: '#FFFFFF', // White
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
