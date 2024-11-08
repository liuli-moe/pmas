import { glob, path, fs } from 'zx'

const english: [string | RegExp, string][] = [
  // 格式错误
  ['[X]', '[x]'],
  ['\n\n**\\[] ', '\n\n---\n\n- [ ] '],
  ['\n\n\\*\\*\\[] ', '\n\n---\n\n- [] '],
  ['**\\[]', '\n---\n\n- [] '],
  ['\n**\\[x] ', '\n---\n\n- [x] '],
  ['\n\\[]', '\n- [ ]'],
  ['\n-\\[]', '\n- [ ]'],
  ['\n\\[x]', '\n- [x]'],
  ['\n-\\[', '\n- ['],
  ['\n\\[', '\n- ['],
  ['\n\\- \\[]', '\n  - [ ]'],
  ['\n\\-- \\[]', '\n    - [ ]'],
  ['\n\\-- \\[x]', '\n    - [x]'],
  ['\n\\--\\[', '\n  - ['],
  ['\n\\---\\[', '\n    - ['],
  ['\n\\--- \\[', '\n    - ['],
  ['\n\\----\\[', '\n      - ['],
  ['\n\\-----\\[', '\n        - ['],
  ['\n\\------\\[', '\n          - ['],
  ['\n\\-------\\[', '\n            - ['],
  ['\n\\--------\\[', '\n              - ['],
  ['\n\\- \\[', '\n  - ['],
  ['\n> \\[', '\n> - ['],
  ['**\n\n\\=====​\n', '\n\n---\n'],
  ['**\n\nSpoiler: ', '\n\n---\n\nSpoiler: '],
  ['\n\\-\\[x] ', '\n- [x] '],
  ['\n\\-\\[x]', '\n- [x] '],
  [/^~~- \\\[x\] (.+?)~~/gm, '- [x] ~~$1~~'],
  [/^~~\\\[\] (.+?)~~/gm, '- [] ~~$1~~'],
  [/^~~-- \\\[\] (.+?)~~/gm, '  - [ ] ~~$1~~'],
  [/^\*\*~~\\\[\] (.+?)~~/gm, '---\n\n- [] ~~$1~~'],
  ['\\*', '*'],
  ['\\=====', '---'],
]

const chinese: [string | RegExp, string][] = [
  // 替换单引号为双引号
  [/"(.*?)"/g, '“$1”'],
  // 替换斜体为粗体
  [/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '**$1**'],
  // 替换 - 为中文的 ——
  [/([\u4e00-\u9fa5]+?)-([\u4e00-\u9fa5”]+?)/g, '$1—$2'],
  [/([\u4e00-\u9fa5\*]+?)-([\u4e00-\u9fa5”\*]+?)/g, '$1—$2'],
  [/([\u4e00-\u9fa5\*]+?) ?- ?([\u4e00-\u9fa5”\*]+?)/g, '$1—$2'],
  [/([\u4e00-\u9fa5？]+?)--([\u4e00-\u9fa5”]+?)/g, '$1——$2'],
  [/([\u4e00-\u9fa5？]+?) --([\u4e00-\u9fa5”]+?)/g, '$1——$2'],
  ['-”', '—”'],
  [/([\u4e00-\u9fa5]+?)-$/gm, '$1—'],
  [/^-([\u4e00-\u9fa5]+?)/gm, '—$1'],
  [/^- ?([\u4e00-\u9fa5]+?) ?-$/gm, '—$1—'],
  // 替换英文 , 为中文的，
  [',', '，'],
  [/([\u4e00-\u9fa5]+?)!/g, '$1！'],
  [/([\u4e00-\u9fa5]+?);/g, '$1；'],
  [/([\u4e00-\u9fa5]+?)\?/g, '$1？'],
  [/([\u4e00-\u9fa5]+?):( ?)/g, '$1：'],

  ['鹿目小圆', '鹿目圆'],
  ['美滨市', '见泷原市'],
  ['见滨', '见泷原'],
  ['见泽原市', '见泷原市'],
  ['见滝原市', '见泷原市'],
  ['三滩市', '见泷原市'],
  ['笠野市', '风见野市'],
  ['笠美野', '风见野市'],
  ['笠见野', '风见野市'],
  ['笠间野', '风见野市'],
  ['浅鸟市', '翌桧市'],
  ['京介', '恭介'],
  ['真纱美', '正美'],
  ['奥里可', '织莉子'],
  ['織莉子', '织莉子'],
  ['美玖织莉子', '美国织莉子'],
  ['基里卡', '纪里香'],
  ['桐花', '纪里香'],
  ['Walpurgisnacht', '魔女之夜'],
  // [/ ?Mami ?/, '麻美'],
  ['圣瓦尔普吉斯之夜', '魔女之夜'],
  ['瓦尔普吉斯之夜', '魔女之夜'],
  ['美滨中学', '见泷原中学'],
  ['见泽原中学', '见泷原中学'],
  ['泽诺的悖论', '芝诺悖论'],
  ['盒子魔女', '箱之魔女'],
  ['城之白学院', '私立白羽女校'],
  ['白梦中学', '私立白羽女校'],
  ['白魅学院方向', '私立白羽女校'],
  ['城南学园', '私立白羽女校'],
  ['悲伤种子', '悲叹之种'],
  ['时间旅者', '时间旅行者'],
  ['培育者', '孵化者'],
  ['孵化器', '孵化者'],
  ['力场使', '念力使'],
  ['吉莉香', '纪里香'],
  ['织里香', '纪里香'],
  ['美树纱织', '纪里香'],
  [/(?<!纪)(?<!吴纪)里香/g, '纪里香'],
  ['由奈', '友奈'],
  ['梅子优子', '梅子裕子'],
  ['心电感应', '心灵感应'],
  ['津叶蝶子', '椿蝶子'],
  // ['尸体', '身体'],
  ['留女组', '优妮组'],
  ['Apprehension pt.', '忧虑'],
  [`“We've Got Hostiles” pt.`, '"敌人出现"'],
  [`"We've Got Hostiles" pt.`, '"敌人出现"'],
  ['Under the Radar pt.', '潜伏行动'],
  ['Interloper pt.', '不速之客'],
  ['Our Benefactor pt.', '我们的恩人'],
  ['Residue processing pt.', '残渣处理'],
  ['Residue Processing pt.', '残渣处理'],
  ['This mortal coil pt.', '凡人心弦'],
  ['Anomalous Materials pt.', '异常物质'],
  ['Anomalous materials pt.', '异常物质'],
  ['On a Rail pt.', '在轨道上'],
  ['On a rail pt.', '在轨道上'],
  ['A Red Letter Day pt.', '好日子'],
  ['库薇拉', '库维拉'],
  ['蕾米尔', '拉米尔'],
  ['昴星团', '昴宿圣团'],
  ['仙台小组', '仙台组'],
  ['沙织老师', '早乙女老师'],
  ['Write-in', '自由发挥'],
  ['- [ ] 任意回答', '- [ ] 自由发挥'],
  ['- [ ] 写下你的行动', '- [ ] 自由发挥'],
  ['- [ ] 写作', '- [ ] 自由发挥'],
  ['- [ ] 自由回答', '- [ ] 自由发挥'],
  ['- [ ] 写入回答', '- [ ] 自由发挥'],
  ['- [ ] 写入回应', '- [ ] 自由发挥'],
  ['- [ ] 随意发挥', '- [ ] 自由发挥'],
  ['- [ ] 写入投票', '- [ ] 自由发挥'],
  ['- [ ] 请写下你的想法', '- [ ] 自由发挥'],
  ['- [ ] 请给出建议', '- [ ] 自由发挥'],
  ['- [ ] 在评论中写下你的回应', '- [ ] 自由发挥'],
  ['- [ ] 写入\n', '- [ ] 自由发挥\n'],
  ['Spoiler', '剧透'],
  ['Aurora', '奥罗拉'],
  ['预言者', '预言家'],
  ['预言家', '预知者'],
  ['小野眼镜', '小野梅甘娜'],
  ['沙耶加', '沙耶香'],
  ['沃珀尔吉斯之夜', '魔女之夜'],
  ['沃普尔吉斯之夜', '魔女之夜'],
  ['瓦普尔吉斯之夜', '魔女之夜'],
  ['瓦普鲁基斯之夜', '魔女之夜'],
  ['艾尔莎·玛丽亚', '艾尔莎・玛丽亚'],
  ['艾尔莎玛丽亚', '艾尔莎・玛丽亚'],
  ['艾尔莎玛利亚', '艾尔莎・玛丽亚'],
  ['横须贺学院', '横须贺中学'],
  ['梅岗', '梅甘娜'],
  ['嘿，萨布丽娜', '嗨，萨布丽娜'],
  ['。 “', '。“'],
  ['大学城小组', '大学组'],
  ['清洁种子', '净化之种'],
  ['透明种子', '净化之种'],
  ['透明的种子', '净化之种'],
  ['净化种子', '净化之种'],
  ['清净之种', '净化之种'],
  ['清澈之种', '净化之种'],
  ['悲伤之种', '悲叹之种'],
  ['小圆女神', '圆神'],
  ['小圆神', '圆神'],
  ['佐佐由纪', '优木沙沙'],
  ['纳迪亚·本努纳', '娜迪亚·贝努纳'],
  ['压迫要塞', '战斗堡垒'],
  ['压迫堡垒', '战斗堡垒'],
  ['最小战斗堡垒', '微型战斗堡垒'],
  ['滨崎', '浜崎'],
  ['游马', '由麻'],
  ['日向', '仁美'],
  ['日笠', '仁美'],
  // ['Sabrina', '萨布丽娜'],
]

const lang = process.argv[3]
const replaces = lang === 'en' ? english : chinese
console.log('language:', process.argv[3])
for (const it of await glob(
  lang === 'en' ? './books/en-US/*.md' : './books/zh-CN/*.md',
)) {
  console.log(it)
  const fsPath = path.resolve(it)
  const r = replaces.reduce(
    (acc, [reg, rep]) => acc.replaceAll(reg, rep),
    await fs.readFile(fsPath, 'utf-8'),
  )
  await fs.writeFile(fsPath, r)
}
