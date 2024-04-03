import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      documentRootPath: '/books/zh-CN',
      useTitleFromFileHeading: true,
    }),
  },
})
