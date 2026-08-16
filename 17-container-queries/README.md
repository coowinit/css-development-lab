# 17 · Container Queries 容器查询

CSS Development Lab 的第 17 个独立实验。

本实验研究非常重要的现代 CSS 能力：

```css
@container
```

核心问题：

> 同一个组件放在不同宽度的容器里，如何根据“自己的空间”改变布局？

## 文件结构

```text
17-container-queries/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── product-01.svg
│   ├── product-02.svg
│   └── product-03.svg
└── README.md
```

## 实验目标

重点掌握：

- `container-type`
- `@container`
- `inline-size`
- 容器宽度查询
- 组件级响应式
- `cqi`
- Container Query 与 Media Query 的区别
- 组件在主栏 / 侧栏 / Drawer / Modal 中复用

---

## 1. Media Query 的局限

传统：

```css
@media (min-width: 768px) {
  .card {
    ...
  }
}
```

它判断的是：

> 浏览器视口宽度。

但实际项目中：

```text
浏览器 1440px
```

并不代表组件就拥有：

```text
1440px
```

例如：

```text
页面 1440px

左侧 Sidebar 300px
右侧 Main 900px

Drawer 400px
Modal 650px
```

同一个组件可能出现在完全不同宽度的区域里。

---

## 2. Container Query 解决什么

Container Query 判断：

> 组件所在容器有多宽。

因此：

```text
Card 在主栏
→ 横向布局

Card 在侧栏
→ 纵向布局

Card 在中等列
→ 紧凑布局
```

而 HTML 完全相同。

---

## 3. 第一步：定义容器

必须先告诉浏览器：

```css
.card-container {
  container-type: inline-size;
}
```

意思是：

> 允许根据这个容器的 Inline Size 进行查询。

在常见横向书写模式中：

```text
inline-size ≈ width
```

---

## 4. 第二步：使用 @container

例如：

```css
@container (min-width: 620px) {
  .product-card {
    grid-template-columns:
      38% 1fr;
  }
}
```

意思是：

```text
当 card-container
宽度达到 620px

↓

里面的 product-card
变成两列
```

注意：

> 这里判断的不是浏览器宽度。

---

## 5. 为什么先写窄布局

本实验基础状态：

```css
.product-card {
  grid-template-columns: 1fr;
}
```

也就是：

```text
图片
↓
文字
```

这是窄容器默认布局。

然后：

```css
@container (min-width: 620px)
```

再升级成：

```text
图片 | 文字
```

这和 Mobile First 思路类似：

> 先保证小空间可用，再增强大空间。

---

## 6. 三个容器，共用同一个 HTML

本实验中：

```text
Wide Container
Medium Container
Narrow Sidebar
```

三个区域的 Product Card HTML 结构完全一样。

区别只有：

```text
父容器宽度
```

Container Query 自动决定卡片布局。

这是 Container Query 最大的实际价值。

---

## 7. Container Query 与 Media Query 的职责

### Media Query

更适合：

- 网站主导航
- 页面两栏 / 一栏
- Header
- Footer
- 整体页面布局
- 全局字体调整

因为这些确实与：

```text
Viewport
```

强相关。

### Container Query

更适合：

- Card
- Widget
- Product Item
- Dashboard Module
- Sidebar Component
- Drawer Content
- CMS Block

因为这些更关心：

```text
自己到底有多少空间
```

---

## 8. 两者不是替代关系

不要理解为：

```text
Container Query 出现
↓
Media Query 淘汰
```

正确思路是：

```text
页面级响应式
→ Media Query

组件级响应式
→ Container Query
```

两者一起使用。

---

## 9. 430px 阶段

本实验：

```css
@container (min-width: 430px) {
  .product-actions {
    grid-template-columns:
      repeat(2, 1fr);
  }
}
```

窄的时候：

```text
查看详情
↓
获取报价
```

容器稍宽后：

```text
查看详情 | 获取报价
```

这是非常典型的组件级微响应。

---

## 10. 620px 阶段

当容器进一步变宽：

```css
@container (min-width: 620px)
```

整个 Card：

```text
图片
文字
```

变成横向布局。

这时按钮也变成：

```css
display: flex;
```

组件逐级增强。

---

## 11. 820px 阶段

非常宽时：

```css
@container (min-width: 820px)
```

可以进一步调整：

- 图片比例
- Padding
- 字号
- 描述宽度

让组件更充分利用空间。

---

## 12. cqi 是什么

本实验中：

```css
font-size: clamp(
  1.7rem,
  4cqi,
  2.8rem
);
```

`cqi`：

> Container Query Inline Size 单位。

可以理解为：

```text
1cqi
=
容器 inline-size 的 1%
```

所以组件字号可以根据：

> 自己容器

而不是：

> 浏览器 viewport

进行流体变化。

---

## 13. 为什么这对组件库特别重要

假设开发一个：

```text
Product Card
```

你不知道未来它会被放到：

- 首页
- 分类页
- Sidebar
- Modal
- Drawer
- Related Products
- Page Builder

如果只写：

```css
@media
```

组件必须不断猜测：

> 页面现在是什么布局？

Container Query 则让组件自己判断：

> 我现在到底有多宽？

这更符合真正的组件化思想。

---

## 14. WordPress 中的价值

例如 Gutenberg / Page Builder：

同一个区块可能被用户拖到：

```text
Full Width
2/3 Column
1/2 Column
1/3 Column
Sidebar
```

使用 Container Query：

> 组件不需要知道用户把它放在哪里。

只需要根据当前容器宽度调整。

---

## 15. WooCommerce 中的价值

Product Card 可能出现：

```text
Shop Grid
Related Products
Upsell
Sidebar
Quick View
Mini Cart
```

同一套组件在不同区域需要不同布局。

这就是 Container Query 的典型使用场景。

---

## 16. 为什么不要所有地方都使用 Container Query

如果需求明显是：

```text
手机菜单
桌面菜单
```

它本质与：

```text
Viewport
```

相关。

那么 Media Query 更自然。

不要因为 Container Query 更新，就强行把所有响应式都改成 Container Query。

---

## 17. 容器应该定义在哪里

不要随便：

```css
* {
  container-type: inline-size;
}
```

更合理的是：

> 找到真正拥有组件可用空间的 Wrapper。

本实验：

```html
<div class="card-container">
  <article class="product-card">
```

然后：

```css
.card-container {
  container-type: inline-size;
}
```

职责非常清楚。

---

## 18. 适用场景

- Product Card
- WooCommerce Card
- WordPress Block
- Sidebar Widget
- Dashboard
- Modal 内容
- Drawer 内容
- Related Products
- CMS 模块
- 组件库
- Page Builder

---

## 实验结论

响应式布局可以逐渐形成两个层级：

```text
页面级
↓
Media Query

组件级
↓
Container Query
```

最值得记住的一句话：

> Media Query 问：“浏览器多宽？”
>
> Container Query 问：“我这个组件现在有多宽？”

当组件需要被大量复用时，Container Query 的价值会非常明显。
