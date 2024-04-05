import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import taskLists from '@hackmd/markdown-it-task-lists'

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      documentRootPath: '/books/zh-CN',
      useTitleFromFileHeading: true,
    }),
  },
  markdown: {
    config(md) {
      md.use(taskLists)
    },
  },
})
