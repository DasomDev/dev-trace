/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 클래스 기반 다크모드 (더 유연함)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 다크모드용 커스텀 색상 추가 가능
      },
    },
  },
  plugins: [],
}

