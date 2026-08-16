# 03 · 响应式 Card 卡片网格

CSS Development Lab 的第 03 个独立实验。

本实验研究网站中最常见、复用率最高的布局之一：**响应式 Card Grid**。

适合产品、服务、案例、新闻、博客、团队成员等列表页面。

## 实验目标

重点掌握：

- CSS Grid
- `repeat()`
- `auto-fit`
- `auto-fill`
- `minmax()`
- `fr`
- `gap`
- `min-width: 0`
- `aspect-ratio`
- `object-fit`
- 卡片内部 Flex 布局
- 少写 Media Query 的响应式策略

## 文件结构

```text
03-responsive-card-grid/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── card-01.svg
│   ├── card-02.svg
│   ├── card-03.svg
│   ├── card-04.svg
│   ├── card-05.svg
│   └── card-06.svg
└── README.md
```

## 核心代码

```css
.card-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}
```

这是本实验最重要的一行代码。

---

## 1. repeat()

传统写法：

```css
grid-template-columns:
  1fr 1fr 1fr 1fr;
```

可以写成：

```css
grid-template-columns:
  repeat(4, 1fr);
```

但这仍然固定为四列。

真正适合响应式卡片的是：

```css
repeat(auto-fit, ...)
```

---

## 2. minmax()

```css
minmax(250px, 1fr)
```

表示每一列：

```text
最小：250px
最大：1fr
```

浏览器会先保证卡片不要窄于 250px。

如果容器还有剩余空间，就让所有卡片共同拉伸。

---

## 3. auto-fit

```css
repeat(auto-fit, minmax(250px, 1fr))
```

浏览器会自动判断一行能够容纳多少列。

例如：

```text
宽屏
[ Card ][ Card ][ Card ][ Card ]

中屏
[ Card ][ Card ][ Card ]

窄屏
[ Card ][ Card ]

手机
[ Card ]
```

这里不需要分别写：

```css
@media (...) { 4列 }
@media (...) { 3列 }
@media (...) { 2列 }
@media (...) { 1列 }
```

---

## 4. auto-fit 与 auto-fill

两者非常接近。

### auto-fit

会把没有内容的空轨道折叠掉，让现有卡片继续扩展。

### auto-fill

会保留潜在的空轨道。

因此当卡片数量较少时，两者最容易看出区别。

对于常见产品 / 新闻卡片：

```css
auto-fit
```

通常更加直观。

---

## 5. 为什么使用 min-width: 0

Grid 或 Flex 子项中的长文本有时会把布局撑破。

因此卡片保留：

```css
.card {
  min-width: 0;
}
```

这允许卡片真正缩小到 Grid 分配给它的宽度。

这个知识点在真实项目排查 overflow 时非常重要。

---

## 6. 图片统一比例

```css
.card-media {
  aspect-ratio: 4 / 3;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

即使原始图片尺寸完全不同，也可以获得统一卡片视觉。

---

## 7. 卡片内部为什么使用 Flex

```css
.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-link {
  margin-top: auto;
}
```

这样可以让“查看详情”自然停在内容区域底部。

更深入的等高与跨卡片内容对齐，会在第 05 个实验中单独研究。

---

## 响应式原则

本实验的核心不是：

> 不写任何 Media Query。

而是：

> 让 Grid 自己解决它擅长的问题，只在真正必要时使用断点。

所以主要列数变化完全由：

```css
auto-fit + minmax()
```

处理。

只有超窄手机屏幕才把最小列宽：

```text
250px
```

降低为：

```text
220px
```

避免极窄环境发生横向溢出。

---

## 适用场景

- WooCommerce 产品列表
- WordPress 文章列表
- 企业官网产品中心
- 新闻列表
- 博客首页
- 案例展示
- 服务项目
- 团队成员
- 下载资源
- Portfolio

---

## 维护方式

### 修改每列最小宽度

```css
minmax(250px, 1fr)
```

例如想让卡片更大：

```css
minmax(300px, 1fr)
```

一行自然会减少列数。

### 修改卡片间距

```css
gap: 24px;
```

### 修改图片比例

```css
aspect-ratio: 4 / 3;
```

可以改成：

```css
16 / 9
1 / 1
3 / 4
```

### 增加卡片

直接复制：

```html
<article class="card">
...
</article>
```

不需要修改 CSS。

---

## 实验结论

响应式卡片列表最值得掌握的不是：

```text
桌面几列？
平板几列？
手机几列？
```

而是：

```text
一张卡片允许多窄？
↓
容器现在有多宽？
↓
浏览器能够自动放几张？
```

核心组合：

```text
Grid
+
repeat()
+
auto-fit
+
minmax()
+
gap
```

这套方式非常适合长期复用于真实项目。
