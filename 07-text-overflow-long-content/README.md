# 07 · 文本溢出与长内容处理

CSS Development Lab 的第 07 个独立实验。

本实验研究真实项目中非常常见的一类问题：

> 内容长度不可控时，如何避免文字把布局撑坏？

重点覆盖：

- 超长产品标题
- 多行描述
- 连续英文
- 超长 URL
- 中文长段落
- Flex / Grid 子项被文字撑宽

## 文件结构

```text
07-text-overflow-long-content/
├── index.html
├── css/
│   └── style.css
└── README.md
```

## 核心知识

- `overflow`
- `white-space`
- `text-overflow`
- `line-clamp`
- `overflow-wrap`
- `word-break`
- `min-width: 0`

---

## 1. 单行省略号

```css
.single-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

适合：

- 表格单元格
- 产品名称
- 用户昵称
- 后台列表
- Breadcrumb 中的超长项目

注意：

> `text-overflow: ellipsis` 单独使用不会生效。

通常需要同时配合：

```css
overflow: hidden;
white-space: nowrap;
```

---

## 2. 多行截断

```css
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

适合：

- 产品卡片标题
- 新闻摘要
- 博客描述
- 商品简介

例如：

```text
最多显示两行
超过后截断
```

如果需要三行：

```css
-webkit-line-clamp: 3;
```

---

## 3. overflow-wrap

对于：

```text
veryveryveryveryverylongword
```

或者：

```text
https://example.com/very/very/very/long/url
```

可以：

```css
overflow-wrap: anywhere;
```

它允许浏览器在必要时从任意位置换行。

适合：

- URL
- Email
- 文件名
- 长型号
- 连续字符串

---

## 4. word-break

常见：

```css
word-break: normal;
```

以及：

```css
word-break: break-all;
```

`break-all` 非常强硬，会在几乎任意字符之间断开。

所以不要把它作为默认方案。

一般更推荐：

```css
overflow-wrap: anywhere;
```

因为阅读体验通常更自然。

---

## 5. 中文处理

中文本身通常可以自然换行。

所以很多时候：

```css
word-break: normal;
```

已经足够。

只有当中文中混入：

- 超长英文
- 产品型号
- URL
- 连续数字
- 文件名

时，才需要额外处理。

---

## 6. 一个非常重要的知识点：min-width: 0

Flex 或 Grid 项目经常出现：

```text
明明容器已经很窄
文字却把整个布局撑破
```

原因之一是 Flex Item 默认：

```css
min-width: auto;
```

也就是：

> 不愿意缩小到比内容的最小尺寸更小。

因此很多时候需要：

```css
.flex-item {
  min-width: 0;
}
```

这是非常高频的真实排错知识。

---

## 7. Flex 中的典型问题

例如：

```text
图标 | 很长很长很长很长的标题
```

结构：

```css
.row {
  display: flex;
}
```

如果右侧内容没有：

```css
min-width: 0;
```

即使标题写了：

```css
text-overflow: ellipsis;
```

也可能无法正常省略。

推荐：

```css
.copy {
  min-width: 0;
}
```

然后再：

```css
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

---

## 8. 截断还是换行？

这是本实验最重要的判断之一。

### 适合截断

```text
产品列表标题
新闻卡片
后台列表
昵称
简短摘要
```

可以使用：

```text
ellipsis
line-clamp
```

### 不适合截断

```text
产品参数
技术规格
URL
文件名
错误信息
订单号
重要说明
```

更适合：

```text
完整换行
overflow-wrap
```

---

## 9. 不要为了整齐就随便隐藏内容

例如产品标题：

```css
height: 40px;
overflow: hidden;
```

这种方式虽然简单，但问题是：

- 不知道到底显示几行
- 字号变化后容易出问题
- 行高变化后容易切到半行
- 内容被隐藏时没有明确规则

更推荐：

```css
line-clamp
```

因为意图更加明确。

---

## 10. text-overflow 并不能解决所有问题

如果问题是：

```text
内容撑破 Flex
```

首先检查：

```css
min-width: 0
```

如果问题是：

```text
长 URL 不换行
```

检查：

```css
overflow-wrap
```

如果问题是：

```text
标题太长，希望固定两行
```

使用：

```css
line-clamp
```

不要所有问题都只用：

```css
overflow: hidden;
```

---

## 常见应用场景

- WooCommerce 产品卡片
- WordPress 文章列表
- 新闻列表
- 表格
- 后台管理系统
- 文件下载列表
- Breadcrumb
- URL 展示
- 用户昵称
- 产品参数
- 分类菜单
- Flex 工具栏
- Grid 卡片

---

## 实验结论

处理长文本时可以按这个顺序判断：

```text
内容是否允许隐藏？
│
├─ 是
│  ├─ 单行 → ellipsis
│  └─ 多行 → line-clamp
│
└─ 否
   └─ overflow-wrap
```

如果布局仍然被撑破：

```text
检查 Flex / Grid 子项
↓
min-width: 0
```

这套思路可以解决绝大多数真实项目中的文本溢出问题。
