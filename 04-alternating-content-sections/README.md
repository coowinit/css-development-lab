# 04 · 左右图文交错 Section

CSS Development Lab 的第 04 个独立实验。

本实验研究企业官网、产品介绍页、品牌故事页中非常常见的“左右图文交错”布局。

桌面端：

```text
图片 | 文字

文字 | 图片

图片 | 文字
```

手机端统一：

```text
图片
文字

图片
文字
```

## 实验目标

重点掌握：

- CSS Grid 双栏布局
- `minmax(0, 1fr)`
- `align-items`
- `justify-self`
- `:nth-child(even)`
- Grid Item 的 `grid-column` / `grid-row`
- `clamp()` 流式尺寸
- `aspect-ratio`
- `object-fit`
- 桌面视觉顺序与 HTML 源码顺序的区别
- 手机端恢复自然阅读顺序

## 文件结构

```text
04-alternating-content-sections/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── section-01.svg
│   ├── section-02.svg
│   └── section-03.svg
└── README.md
```

## 核心结构

每一个 Section 的 HTML 顺序完全一致：

```html
<article class="story">
  <div class="story-media">...</div>
  <div class="story-content">...</div>
</article>
```

也就是始终：

```text
media
↓
content
```

不因为视觉效果改变源码结构。

---

## 1. 默认双栏

```css
.story {
  display: grid;
  grid-template-columns:
    minmax(0, 1.06fr)
    minmax(0, 0.94fr);
}
```

左侧图片略宽，右侧文字略窄。

通过：

```css
align-items: center;
```

让两边内容垂直居中。

---

## 2. 偶数项自动交错

```css
.story:nth-child(even) .story-media {
  grid-column: 2;
  grid-row: 1;
}

.story:nth-child(even) .story-content {
  grid-column: 1;
  grid-row: 1;
}
```

这样第二、第四、第六……个模块会自动变成：

```text
文字 | 图片
```

HTML 不需要增加：

```html
class="reverse"
```

也不需要每次手工修改顺序。

---

## 3. 为什么不直接修改 HTML 顺序

如果为了桌面视觉效果把第二个 Section 写成：

```html
<div class="content"></div>
<div class="media"></div>
```

那么不同 Section 的源码结构就不一致。

后期维护、循环输出、WordPress 模板开发都会更麻烦。

更稳定的原则是：

> 内容结构保持一致，视觉顺序交给 CSS。

---

## 4. 手机端恢复自然顺序

桌面端的偶数项虽然视觉反转，但 HTML 本身没有改变。

因此手机端只要取消 Grid 的指定位置：

```css
.story:nth-child(even) .story-media,
.story:nth-child(even) .story-content {
  grid-column: auto;
  grid-row: auto;
}
```

就会自然恢复：

```text
图片
文字
```

不需要再使用：

```css
order: ...
```

这是使用 Grid 处理这类场景时非常干净的一种方式。

---

## 5. 为什么手机端统一图片在上

在大屏幕：

```text
图文交错
```

可以增加页面视觉节奏。

但手机屏幕很窄，如果继续交替“文字先 / 图片先”，阅读节奏容易变乱。

因此统一：

```text
图片
文字
```

通常更适合连续浏览。

---

## 6. 图片处理

```css
.story-media {
  aspect-ratio: 4 / 3;
}

.story-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

这样不同来源图片不会破坏模块高度。

---

## 适用场景

- 企业官网首页
- About 页面
- 品牌故事
- 产品系列介绍
- 产品优势
- 服务介绍
- 工艺流程
- 案例介绍
- WordPress 自定义页面模板
- B2B 产品网站

---

## 维护方式

### 增加模块

直接复制：

```html
<article class="story">
...
</article>
```

CSS 会自动根据奇偶位置判断左右方向。

### 修改双栏比例

```css
grid-template-columns:
  minmax(0, 1.06fr)
  minmax(0, 0.94fr);
```

如果希望完全等宽：

```css
grid-template-columns:
  repeat(2, minmax(0, 1fr));
```

### 修改图片比例

```css
aspect-ratio: 4 / 3;
```

可以根据项目改成：

```text
16 / 9
3 / 2
1 / 1
```

---

## 不建议的做法

为了交错效果，不建议大量使用：

```html
<section class="left">
<section class="right">
<section class="left">
<section class="right">
```

也不建议给每一个模块单独写布局 CSS。

更适合长期维护的是：

```text
统一结构
+
nth-child()
+
Grid
```

---

## 实验结论

这个实验的核心并不是“怎么把图片换到右边”。

真正值得掌握的是：

> **HTML 负责正确的内容顺序，CSS 负责视觉排列。**

对于重复型内容模块，这会显著降低后期维护成本。
