import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  // 順序很重要，由上到下跑
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
}
