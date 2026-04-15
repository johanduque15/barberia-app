/** @type {import('tailwindcss').Config} */
export default{
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                barber: {
                    black: "#0f0f0f",
                    gold: "#c59d5f",
                    gray: "#888888",
                    testcolor: "#00ff00"
                }
            }
        },
    },
    plugins: [],
}