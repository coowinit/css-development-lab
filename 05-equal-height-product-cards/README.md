# 05 · 等高产品卡片

CSS Development Lab 的第 05 个独立实验。

本实验解决真实产品列表中非常常见的问题：

> 标题、描述、标签数量都不同，但同一行卡片的底部按钮仍然需要整齐对齐。

## 实验目标

重点掌握：

- 外层 CSS Grid
- 卡片内部 Flex
- `flex-direction: column`
- `flex: 1`
- `margin-top: auto`
- `align-items: stretch`
- 内容长度不一致时的高度分配
- `min-width: 0`
- 响应式卡片列表
- Flex、Grid、Subgrid 的职责区别

## 文件结构

```text
05-equal-height-product-cards/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── product-01.svg
│   ├── product-02.svg
│   ├── product-03.svg
│   └── product-04.svg
└── README.md
```

---

## 真实问题

产品卡片经常出现：

```text
Card A        Card B        Card C
短标题        很长标题       中等标题
短描述        很长描述       中等描述
2 个标签      3 个标签       4 个标签

查看产品      查看产品       查看产品
```

如果只按普通文档流排列，按钮位置通常会参差不齐。

---

## 推荐方案：Grid + Flex

### 外层 Grid

```css
.product-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  align-items: stretch;
}
```

Grid 负责：

- 一行几列
- 卡片间距
- 响应式
- 同一行卡片拉伸到相同高度

---

## 卡片内部使用 Flex

```css
.product-card {
  display: flex;
  flex-direction: column;
}
```

然后：

```css
.product-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

这样内容区域会占满图片下方的剩余高度。

---

## 最关键的一行

```css
.product-link {
  margin-top: auto;
}
```

`auto` 会吸收当前 Flex 容器中的剩余空间。

结果就是：

```text
标题
描述
标签


↑ 剩余空间


按钮
```

无论前面的内容长短如何，按钮都会尽量停在底部。

---

## 为什么不建议固定卡片高度

例如：

```css
.product-card {
  height: 520px;
}
```

虽然看起来能让卡片一样高，但存在很多问题：

- 内容增加后容易溢出
- 不同语言文字长度不同
- 手机端高度需求不同
- 后期维护困难
- 需要不断调整固定值

更合理的方式是让布局系统自然分配空间。

---

## 为什么不建议固定标题高度

例如：

```css
h3 {
  height: 60px;
}
```

这种方式也不够稳定。

标题可能：

- 一行
- 两行
- 三行
- 换成英文
- 换成德文
- 字号发生变化

因此优先使用自然内容高度。

只有业务明确要求限制行数时，再使用文本截断。

---

## Flex、Grid、Subgrid 怎么选

### Flex

最适合：

> 单张卡片内部纵向排列。

例如：

```text
图片
标题
描述
标签
按钮
```

这是本实验最推荐的方案。

---

### Grid

最适合：

> 外层卡片列表。

例如：

```text
Card | Card | Card | Card
```

负责：

- 列数
- 间距
- 响应式
- 整体拉伸

---

### Subgrid

适合更严格的场景，例如要求：

```text
所有标题起始位置一致
所有描述区域高度一致
所有标签区域高度一致
所有按钮严格按同一轨道对齐
```

这属于更高级的跨卡片轨道对齐。

对于大多数普通产品卡片：

> Grid + Flex 已经足够，而且更容易维护。

因此本实验没有为了“高级”而强行把 Subgrid 作为主方案。

---

## 适用场景

- WooCommerce 产品卡片
- 企业官网产品中心
- 服务套餐
- Pricing Cards
- 新闻卡片
- 博客卡片
- 团队成员
- 下载资源
- 案例列表
- SaaS Feature Cards

---

## 维护方式

### 修改卡片数量

直接复制：

```html
<article class="product-card">
...
</article>
```

不需要修改 CSS。

### 修改卡片最小宽度

```css
minmax(250px, 1fr)
```

例如：

```css
minmax(300px, 1fr)
```

会让卡片更宽、每行列数更少。

### 修改图片比例

```css
.product-media {
  aspect-ratio: 4 / 3;
}
```

### 修改按钮样式

只需修改：

```css
.product-link
```

不影响高度对齐逻辑。

---

## 实验结论

等高卡片最实用的思路不是：

```text
给每张卡片固定高度
```

而是：

```text
外层 Grid
负责一行卡片整体布局

↓

卡片 Flex Column
负责内部纵向布局

↓

内容区 flex: 1

↓

按钮 margin-top: auto
自动贴到底部
```

这个组合简单、稳定、可复用，是实际项目中非常值得长期保留的方案。
