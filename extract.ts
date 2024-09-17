import { fs } from 'zx'
import {
  fromMarkdown,
  Heading,
  select,
  selectAll,
  Table,
  toString,
} from '@liuli-util/markdown-util'

function extractEntities(text: string): [string, string][] {
  const ast = fromMarkdown(text)
  const tables = selectAll(
    'heading[depth="2"]:has( > [value="译名对照表"]) ~ table',
    ast,
  ) as Table[]
  return tables.flatMap((table) => {
    const rows = table.children.slice(1)
    return rows.map((row) => {
      const [c1, c2] = row.children
      const entity = toString(c1)
      const translation = toString(c2)
      return [entity, translation] as [string, string]
    })
  })
}

const content = await fs.readFile('./CONTRIBUTING.md', 'utf-8')
const entities = extractEntities(content)
console.log(
  entities.reduce((acc, [entity, translation]) => {
    acc[entity] = translation
    return acc
  }, {} as Record<string, string>),
)
