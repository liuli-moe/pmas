# 贡献指南

管理 markdown 翻译源文件。

## 进度

| 项目           | 进度 |
| -------------- | ---- |
| 原作           | 845  |
| GPT 初翻       | 130  |
| 校对&润色      | 56   |
| 替换斜体为粗体 | 126  |
| 发布到 b 站    | 55   |

## prompt

接下来，请按照下面的翻译对照表翻译人名或专有名词。应该特别留意只有名字的简称翻译，例如只有 Madoka 时应该翻译为小圆而非鹿目圆。

Kaname Madoka: 鹿目圆
Miki Sayaka: 美树沙耶加
Madoka: 小圆
Sayaka: 沙耶加
Sabrina: 萨布丽娜
Tomoe Mami: 巴麻美
Mami: 麻美
Akemi Homura: 晓美焰
Homura: 焰
Mikuni Oriko: 美国织莉子
Oriko: 织莉子
Kure Kirika: 吴纪里香
Shizuki Hitom: 志筑仁美
Hitomi: 仁美
Momoe Nagisa: 百江渚
Nagisa: 渚
Momoe: 百江
Charlotte: 夏洛特
Momoe Shin: 百江申
Shin: 申
Kyouko Sakura: 佐仓杏子
Sakura: 杏子
Chitose Yuma: 千岁由麻
Yuma: 由麻
Kywjibo: 上条
Grief Seed: 悲叹之种
Grief: 悲伤
Soul Gem: 灵魂宝石
witch: 魔女
hunt: 狩猎
Barrier: 结界
Labyrinth: 迷宫
Mitakihara: 见泷原市
Kasamino: 风见野市

## GPT-4 初翻的已知错误

很多人名容易错误使用全称而非简称，例如很多时候应该使用 小圆 而非 鹿目圆。
替换单引号为双引号 `"(.*?)"` => `“$1”`
替换斜体为粗体 `(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!_)_(?!_)(.+?)(?<!_)_(?!_)` => `**$1**`
鹿目小圆 => 鹿目圆
美滨市 => 见泷原市
见滨 => 见泷原
笠美野 => 风见野市
有时似乎将 Grief 翻译为 悲叹之种，需要修改为 悲伤。
屏障 => 结界，将 Barrier 翻译为了 结界 是更合适的
替换 - 为中文的 —— `([\u4e00-\u9fa5]+?)-([\u4e00-\u9fa5”]+?)` => `$1——$2`
京介 => 恭介
真纱美 => 正美，原文 Gaikotsu Masami，是一个原创魔法少女
奥里可 => 织莉子
Walpurgisnacht => 魔女之夜
圣瓦尔普吉斯之夜 => 魔女之夜
瓦尔普吉斯之夜 => 魔女之夜
美滨中学 => 见泷原中学
泽诺的悖论 => 芝诺悖论
猎魔 => 狩猎
盒子魔女 => 箱之魔女
城之白学院 => 私立白羽女校
白魅学院方向 => 私立白羽女校
悲伤种子 => 悲叹之种
