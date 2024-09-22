/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            backgroundImage: {
                "playlistCard-gradient":
                    "linear-gradient(75deg, rgb(40, 58, 88) 0%, rgba(54, 69, 98, 0) 100%)",
                "playlistFade-gradient":
                    "linear-gradient(180deg, rgba(54,69,98,0) 10%, rgba(54,69,98,1) 100%)",
            },
            backgroundColor: (theme) => theme("colors"),
            colors: {
                "deep-blue": "#1e2a3e",
            },
            scale: {
                102: "1.02",
            },
            padding: {
                "custom-y": "54px",
                "custom-x": "10px",
            },
        },
        fontFamily: {
            Merienda: ['"Merienda"', "cursive"],
        },
        blur: {
            xs: "2px",
        },
        plugins: [require("flowbite/plugin")],
    },
    plugins: [],
};