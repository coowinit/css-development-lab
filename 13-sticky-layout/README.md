# 13 · Sticky Header / Sticky Sidebar

CSS Development Lab 的第 13 个独立实验。

本实验专门研究：

```css
position: sticky;
```

以及它为什么在真实项目里经常“看起来失效”。

页面包含两个真实场景：

- Sticky Header
- Sticky Sidebar / 文章目录

## 文件结构

```text
13-sticky-layout/
├── index.html
├── css/
│   └── style.css
└── README.md
```

## 实验目标

重点掌握：

- `position: sticky`
- `top`
- 滚动容器
- 父级边界
- `overflow`
- 容器高度
- `z-index`
- `scroll-padding-top`
- Sticky 与 Fixed 的区别
- Sticky Header
- Sticky Sidebar

---

## 1. Sticky 的最基本条件

仅写：

```css
.sidebar {
  position: sticky;
}
```

不会产生明显效果。

必须至少有一个偏移值：

```css
.sidebar {
  position: sticky;
  top: 96px;
}
```

浏览器需要知道：

> 元素距离顶部多少位置时开始吸附。

---

## 2. Sticky 不是 Fixed

### Fixed

```css
position: fixed;
```

通常相对视口定位。

元素脱离普通文档流，并且不受普通父容器边界约束。

### Sticky

```css
position: sticky;
```

开始时仍然在正常文档位置。

滚动到指定位置后开始吸附。

但它仍然：

> 不能离开自己的父容器边界。

这是两者最重要的差异之一。

---

## 3. Sticky 相对谁工作

Sticky 会参考：

> 最近的滚动容器。

通常我们希望：

```text
body / 页面滚动
↓
Sticky Sidebar
```

但如果父级出现：

```css
overflow: auto;
```

父级可能变成新的滚动容器。

此时 Sticky 的参照关系就发生变化。

---

## 4. Sticky 不工作时先检查 overflow

这是实际项目中非常高频的原因。

例如：

```css
.parent {
  overflow: auto;
}
```

或者某些布局中出现：

```css
overflow: hidden;
```

可能让 Sticky 行为和预期不同。

所以排错时优先检查祖先元素：

```text
parent
grandparent
layout wrapper
section
main
```

是否设置：

```css
overflow
```

---

## 5. 父容器高度必须足够

Sticky 元素只能：

> 在自己的父容器范围内移动。

如果父容器高度几乎和 Sticky 元素一样高：

```text
没有额外滚动空间
```

就很难看到 Sticky 效果。

本实验中：

```text
左侧 Sidebar
+
右侧长 Article
```

共同处于同一个 Grid。

右侧文章足够长，所以整个 Grid 足够高，左侧才有充分的 Sticky 空间。

---

## 6. Sticky 元素本身不能太高

如果侧栏高度：

```text
接近甚至超过视口高度
```

用户会遇到：

```text
上半部分能看到
下半部分看不到
又很难滚动到内部内容
```

所以 Sticky Sidebar 通常应该：

- 内容相对简短
- 或者自己成为内部滚动容器

不要无限堆内容。

---

## 7. Sticky Header

本实验顶部：

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

这是最常见的 Sticky 用法。

适合：

- 主导航
- 顶部工具栏
- 分类栏
- 操作栏

---

## 8. 为什么 Header 需要 z-index

Header 吸顶以后，页面内容会继续从下面滚过。

如果没有：

```css
z-index
```

某些内容可能覆盖 Header。

所以 Sticky Header 常见组合：

```css
position: sticky;
top: 0;
z-index: 100;
background: #fff;
```

还必须有背景。

否则下面文字会透过 Header 显示。

---

## 9. Sticky Sidebar

本实验：

```css
.sidebar-sticky {
  position: sticky;
  top: calc(var(--header-h) + 24px);
}
```

为什么不是：

```css
top: 0;
```

因为顶部已经有一个 Sticky Header。

如果 Sidebar 也：

```css
top: 0;
```

它会跑到 Header 后面。

所以应该计算：

```text
Header 高度
+
额外间距
```

---

## 10. scroll-padding-top

页面使用锚点：

```html
<a href="#section">
```

点击后浏览器会把目标滚动到顶部。

但有 Sticky Header 时，标题可能被 Header 遮住。

所以：

```css
html {
  scroll-padding-top:
    calc(var(--header-h) + 26px);
}
```

让浏览器滚动时预留顶部空间。

这个知识点非常实用。

---

## 11. Sticky 与 Grid

Sticky Sidebar 很常搭配：

```css
.layout {
  display: grid;
  grid-template-columns:
    250px 1fr;
}
```

然后：

```css
.sidebar-inner {
  position: sticky;
}
```

注意：

> 通常不要直接让整个 Grid Item 做一些复杂拉伸后再期待 Sticky 行为。

更清晰的结构是：

```text
aside
└── sidebar-sticky
```

外层负责 Grid。

内层负责 Sticky。

---

### Grid 中一个很容易忽略的坑

如果父级 Grid 写了：

```css
.docs-grid {
  align-items: start;
}
```

左侧 `.sidebar` 可能只保持自身内容高度。这样即使内部元素写了：

```css
position: sticky;
```

也几乎没有可移动空间。

本实验因此让 Grid Item 保持拉伸：

```css
.docs-grid {
  align-items: stretch;
}
```

这样 `.sidebar` 会拥有与整行内容相同的高度，内部 `.sidebar-sticky` 才能在长文章滚动过程中真正吸附。

## 12. 常见失效原因

排查顺序：

### ① 有没有 top？

```css
top: 0;
```

### ② 父级有没有 overflow？

```css
overflow: auto;
overflow: scroll;
overflow: hidden;
```

### ③ 父容器是否足够高？

如果没有滚动空间，Sticky 无法表现。

### ④ Sticky 自己是不是太高？

可能视觉上看不出吸附。

### ⑤ 当前真正滚动的是谁？

可能不是 body。

---

## 13. 不要一遇到问题就改 z-index

很多 Sticky 问题和：

```css
z-index
```

完全无关。

如果元素根本没 Sticky：

```text
把 z-index 写成 999999
```

也没有作用。

应该先检查：

```text
滚动容器
+
top
+
父容器边界
```

---

## 14. 适用场景

- 文档目录
- Markdown 阅读页面
- 博客文章目录
- 产品详情购买区
- WooCommerce 筛选栏
- 企业官网侧栏
- 后台操作栏
- 左侧分类
- Sticky Header
- Sticky CTA

---

## 15. Sticky 还是 Fixed

### 使用 Sticky

如果希望：

```text
元素仍然属于当前 Section / Parent
```

并且到边界后停止。

例如：

- 文章目录
- 产品信息
- 左侧筛选

### 使用 Fixed

如果希望：

```text
无论页面滚到哪里
都固定在视口
```

例如：

- 浮动客服
- 返回顶部
- 全局工具按钮

---

## 实验结论

Sticky 排错最值得记住的是：

```text
position: sticky
↓
必须有 top / bottom

↓

检查最近的滚动容器

↓

检查祖先 overflow

↓

检查父容器高度

↓

检查 Sticky 自身高度
```

理解这几个条件以后，大多数“Sticky 为什么不生效”的问题都能很快定位。
