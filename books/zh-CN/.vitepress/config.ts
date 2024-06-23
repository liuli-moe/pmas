import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import taskLists from '@hackmd/markdown-it-task-lists'
import { cjk } from 'markdown-it-cjk-space-clean'

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      documentRootPath: '/books/zh-CN',
      useTitleFromFileHeading: true,
    }),
  },
  markdown: {
    config(md) {
      md.use(taskLists).use(cjk() as any)
    },
  },
})
