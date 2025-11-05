import type { Config } from 'tailwindcss'

import flowbite from "flowbite/plugin";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/app/components/**/*.{js,ts,jsx,tsx}",
        "./src/app/pages/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
        "./node_modules/ta/**/*.j"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        flowbite,
    ],
}
export default config