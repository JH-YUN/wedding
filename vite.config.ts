import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import fs from 'fs'
import path from 'path'

// 웨딩 설정을 읽어서 메타 태그를 생성하는 플러그인
function generateMetaTagsPlugin() {
  return {
    name: 'generate-meta-tags',
    transformIndexHtml(html: string) {
      // wedding-config.json 읽기
      const configPath = path.resolve(__dirname, 'src/data/wedding-config.json')
      const weddingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      
      // 날짜 포맷팅
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}년 ${month}월 ${day}일`
      }

      const weddingDate = formatDate(weddingConfig.weddingInfo.date)
      const title = `${weddingConfig.weddingInfo.groomFullName} ♥ ${weddingConfig.weddingInfo.brideFullName} 결혼식에 초대합니다`
      const description = `${weddingDate}에 ${weddingConfig.weddingInfo.location}에서 열리는 결혼식에 초대합니다.`

      // 메타 태그 생성
      const metaTags = `
    <title>${title}</title>
    <meta property="og:title" content="${weddingConfig.weddingInfo.groomFullName} ♥ ${weddingConfig.weddingInfo.brideFullName} 결혼식" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jh-yun.github.io/wedding/" />
    <meta property="og:image" content="https://jh-yun.github.io/wedding/image/main.jpg" />
    <meta property="og:locale" content="ko_KR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${weddingConfig.weddingInfo.groomFullName} ♥ ${weddingConfig.weddingInfo.brideFullName} 결혼식" />
    <meta name="twitter:description" content="${description}" />
    <meta property="og:image" content="https://jh-yun.github.io/wedding/image/main.jpg" />
      `

      // 기존 메타 태그들을 새로 생성된 것으로 교체
      return html.replace(
        /<title>.*?<\/title>/,
        metaTags.trim()
      )
    }
  }
}

export default defineConfig({
  plugins: [solid(), generateMetaTagsPlugin()],
  base: process.env.NODE_ENV === 'production' ? '/wedding/' : './',
  server: {
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    manifest: true,
    emptyOutDir: true,
  },
  css: {
    devSourcemap: true,
  }
})
