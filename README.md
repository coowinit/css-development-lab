# CSS Development Lab

> 20 个独立、可直接运行的 CSS 实验，通过真实 Web 开发场景系统学习现代 CSS。

**版本：v1.0.0**

CSS Development Lab 不是一套“CSS 属性大全”，而是一组以实际页面问题为入口的独立小实验。

项目从企业官网、产品页、博客、文档站、WooCommerce、电商组件和 Web UI 中选择高频场景，将布局、响应式、交互、滚动、视觉效果和现代 CSS 能力拆成 20 个可以单独阅读、运行和修改的小项目。

---

## 项目目标

学习 CSS 时，最容易出现两个问题：

1. 记住了很多属性，却不知道实际项目中什么时候使用。
2. 能完成单个效果，但面对完整页面时不知道如何组合。

本项目采用：

```text
真实问题
↓
最小可运行 Demo
↓
核心 CSS
↓
常见错误
↓
适用场景
↓
可复用思路
```

重点不是追求复杂特效，而是建立一套能够长期复用的 CSS 开发思维。

---

# 20 章知识地图

## Part 1 · 页面布局

| # | 实验 | 核心知识 |
|---|---|---|
| 01 | Responsive Navigation | 响应式导航、多级菜单、Drawer、状态切换 |
| 02 | Responsive Hero | Grid、两栏布局、`clamp()`、图片响应式 |
| 03 | Responsive Card Grid | `repeat()`、`auto-fit`、`minmax()`、`1fr` |
| 04 | Alternating Content Sections | Grid、交错图文、视觉顺序与 DOM 顺序 |

这一部分解决：

```text
页面怎么排？
↓
不同宽度怎么变化？
↓
重复模块怎么自动适应？
```

---

## Part 2 · 内容组件

| # | 实验 | 核心知识 |
|---|---|---|
| 05 | Equal Height Product Cards | Grid + Flex、等高卡片、按钮底部对齐 |
| 06 | Responsive Images / object-fit | `aspect-ratio`、`cover`、`contain`、`object-position` |
| 07 | Text Overflow / Long Content | ellipsis、line-clamp、长 URL、`min-width: 0` |
| 08 | Responsive Table | Table 横向滚动、Sticky Header、Sticky Column |

这一部分解决：

```text
内容长度不可控
图片比例不可控
表格太宽
卡片高度不一致
```

这些真实项目中的高频问题。

---

## Part 3 · 交互组件

| # | 实验 | 核心知识 |
|---|---|---|
| 09 | Accordion | Grid 高度动画、ARIA、单项展开 |
| 10 | Tabs | Tabs 状态、横向滚动、键盘导航 |
| 11 | Modal / Lightbox | `<dialog>`、Top Layer、`::backdrop` |
| 12 | Drawer / Offcanvas | `fixed`、`translateX()`、遮罩、内部滚动 |

这一部分强调一个原则：

> CSS 负责布局与视觉状态，JavaScript 只负责必要的业务状态。

例如：

```text
CSS
→ 位置
→ 动画
→ 响应式
→ 显示样式

JavaScript
→ open / close
→ active
→ ARIA 状态
```

---

## Part 4 · 滚动与视觉

| # | 实验 | 核心知识 |
|---|---|---|
| 13 | Sticky Layout | `position: sticky`、滚动容器、父级边界、overflow |
| 14 | CSS Scroll Snap | 横向滑动、自动吸附、移动端 Gallery |
| 15 | Hover Image Cards | Overlay、`scale()`、Hover、Focus、Touch |
| 16 | Tooltip / Dropdown Positioning | relative + absolute、层级、Anchor Positioning |

这一部分研究：

```text
滚动
吸附
浮层
Hover
组件定位
```

并重点理解：

> 浏览器到底相对谁定位和滚动。

---

## Part 5 · 现代 CSS

| # | 实验 | 核心知识 |
|---|---|---|
| 17 | Container Queries | `container-type`、`@container`、组件级响应式 |
| 18 | Fluid Responsive Design | `clamp()`、`min()`、`max()`、流体尺度 |
| 19 | Cascade & @layer | Cascade、Specificity、`@layer`、CSS 架构 |
| 20 | Dark Mode & Design Tokens | CSS Variables、Design Tokens、主题系统 |

这一部分把 CSS 从：

```text
“写页面样式”
```

提升到：

```text
“建立可维护的 CSS 系统”
```

---

# 推荐学习顺序

建议按照项目编号依次学习：

```text
01–04
页面布局

↓

05–08
内容组件

↓

09–12
交互组件

↓

13–16
滚动与视觉

↓

17–20
现代 CSS 架构
```

前面的知识会在后面的实验中不断重复出现。

例如：

```text
Grid
→ Card
→ Tabs
→ Sticky Layout
→ Container Query
```

这样能够逐渐从单个属性形成完整知识体系。

---

# 项目目录

```text
css-development-lab/
│
├── 01-responsive-navigation/
├── 02-responsive-hero/
├── 03-responsive-card-grid/
├── 04-alternating-content-sections/
│
├── 05-equal-height-product-cards/
├── 06-responsive-images-object-fit/
├── 07-text-overflow-long-content/
├── 08-responsive-table/
│
├── 09-accordion/
├── 10-tabs/
├── 11-modal-lightbox/
├── 12-drawer-offcanvas/
│
├── 13-sticky-layout/
├── 14-scroll-snap/
├── 15-hover-image-cards/
├── 16-tooltip-dropdown-positioning/
│
├── 17-container-queries/
├── 18-fluid-responsive-design/
├── 19-cascade-layer/
├── 20-dark-mode-design-tokens/
│
└── README.md
```

每一个实验都是独立项目。

典型结构：

```text
experiment/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
└── README.md
```

部分纯 CSS 实验不需要 JavaScript，因此不会强行创建空的 `js/` 目录。

---

# 如何运行

项目没有构建流程，也不依赖 npm。

直接进入任意实验目录：

```text
01-responsive-navigation/
```

打开：

```text
index.html
```

即可查看效果。

也可以部署到：

- GitHub Pages
- Cloudflare Pages
- Netlify
- 任意静态 Web Server

---

# 技术栈

核心技术：

```text
HTML5
CSS3 / Modern CSS
Vanilla JavaScript
SVG
```

没有使用：

```text
React
Vue
Bootstrap
Tailwind CSS
jQuery
npm
Webpack
Vite
```

这样可以把学习重点始终放在：

> 浏览器原生 CSS 能力。

---

# CSS 知识体系

通过 20 个实验，可以把项目中的 CSS 大致归纳成以下几个层次。

## 1. Layout

```text
Flexbox
Grid
Position
Sticky
Overflow
```

负责页面空间结构。

---

## 2. Responsive

```text
Media Query
Container Query
clamp()
min()
max()
```

负责不同空间条件下的布局变化。

---

## 3. Content

```text
object-fit
aspect-ratio
text-overflow
line-clamp
word-break
```

负责处理真实、不可控的内容。

---

## 4. Interaction

```text
:hover
:focus-visible
:focus-within
transition
transform
dialog
scroll-snap
```

负责用户操作反馈。

---

## 5. Architecture

```text
CSS Variables
Design Tokens
Cascade
Specificity
@layer
```

负责大型项目长期维护。

---

# 响应式设计原则

本项目没有把响应式简单理解为：

```text
桌面 CSS
+
手机重新写一套 CSS
```

而是尽量按不同职责处理。

## 页面结构变化

使用：

```css
@media
```

例如：

```text
两栏
→
一栏
```

---

## 组件结构变化

使用：

```css
@container
```

例如：

```text
Product Card 在主栏
→ 横向

Product Card 在侧栏
→ 纵向
```

---

## 尺寸连续变化

使用：

```css
clamp()
min()
max()
```

例如：

```text
字号
Section 间距
Card Padding
容器宽度
```

---

# CSS 与 JavaScript 的职责

项目尽量遵守：

```text
能由 CSS 解决
→ 不使用 JS

真正存在业务状态
→ 才使用 JS
```

例如 Accordion：

```text
JavaScript
→ 当前哪一项打开

CSS
→ 打开后的高度和动画
```

Drawer：

```text
JavaScript
→ open / close

CSS
→ fixed / transform / backdrop / responsive
```

Tabs：

```text
JavaScript
→ active panel

CSS
→ layout / style / mobile scroll
```

---

# 图片处理原则

实验中的 SVG 主要作为无文字占位图。

真实项目替换图片时，重点理解：

```text
图片是否允许裁切？
```

允许：

```css
object-fit: cover;
```

不允许：

```css
object-fit: contain;
```

需要固定视觉比例：

```css
aspect-ratio: 4 / 3;
```

不要依赖 JavaScript计算图片高度。

---

# 移动端原则

20 个实验均考虑移动端使用。

重点包括：

- 页面不产生非预期的整体横向滚动
- Table / Tabs / Scroll Snap 的横向滚动限制在组件内部
- Modal / Drawer 内容区域可以独立滚动
- Hover 不是触控设备的唯一入口
- 导航、按钮和操作区域保持可用尺寸
- 长文字和 URL 不撑破布局
- 图片保持稳定比例
- Sticky / Sidebar 在窄屏下根据场景退化为普通布局或隐藏

---

# 几个最值得记住的 CSS 组合

## 自动响应式 Grid

```css
grid-template-columns:
  repeat(auto-fit, minmax(250px, 1fr));
```

---

## 图片裁切

```css
aspect-ratio: 4 / 3;
overflow: hidden;
```

```css
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## Sticky

```css
position: sticky;
top: 96px;
```

---

## Fluid Typography

```css
font-size:
  clamp(2rem, 6vw, 5rem);
```

---

## Container Query

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 620px) {
  .card {
    grid-template-columns: 40% 1fr;
  }
}
```

---

## Scroll Snap

```css
.track {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.item {
  scroll-snap-align: start;
}
```

---

## Cascade Layers

```css
@layer reset, base, components, utilities;
```

---

## Design Tokens

```css
:root {
  --bg: #f7f7f4;
  --surface: #ffffff;
  --text: #171717;
}

[data-theme="dark"] {
  --bg: #101112;
  --surface: #181a1c;
  --text: #f4f4f2;
}
```

---

# 开发原则

整个项目尽量坚持以下原则：

### 1. 场景优先

不为了展示某个 CSS 属性而制造实验。

先问：

> 真实网站中哪里会用到？

---

### 2. CSS 优先

布局、响应式、动画和视觉状态尽可能交给 CSS。

---

### 3. JavaScript 最小化

JavaScript 只负责 CSS 无法表达的业务状态。

---

### 4. 不使用固定高度解决内容问题

内容高度应该尽可能由内容自然决定。

---

### 5. 不使用 JS 测量高度解决 CSS 能解决的问题

例如 Accordion 使用：

```css
grid-template-rows:
  0fr → 1fr;
```

而不是持续读取：

```js
scrollHeight
```

---

### 6. HTML 保持语义顺序

移动端和无 CSS 环境下，内容顺序仍然合理。

视觉交错尽量由 CSS Grid 完成。

---

### 7. 组件可复用

Card、Tabs、Accordion、Drawer 等结构不依赖某一个具体页面。

---

### 8. 现代 CSS 采用渐进增强

例如 Anchor Positioning：

```text
传统 relative + absolute
→ 基础方案

Anchor Positioning
→ 支持时增强
```

而不是为了使用新特性牺牲基础可用性。

---

# 建议的学习方式

每一章可以按照下面的方式学习：

```text
1. 先直接打开 index.html

2. 调整浏览器宽度

3. 阅读当前 README.md

4. 找到核心 CSS

5. 修改一个参数

6. 刷新查看结果

7. 尝试复制到自己的项目
```

不要一次记住全部代码。

重点是：

> 理解“为什么这样写”。

---

# 后期扩展方向

v1.0.0 已经覆盖 CSS 日常开发中的主要场景。

后续可以扩展第二阶段，例如：

```text
01 CSS Subgrid
02 :has()
03 CSS Nesting
04 View Transitions
05 Popover API
06 Advanced Anchor Positioning
07 CSS Mask
08 clip-path
09 Logical Properties
10 Writing Modes
11 CSS Shapes
12 Advanced Grid Layout
13 Masonry Layout
14 Print CSS
15 Accessibility Styles
16 Form Styling
17 CSS Animation System
18 Motion Design
19 Multi-theme Design System
20 CSS Performance / Architecture
```

这些更适合作为：

> v2.0 进阶实验。

第一阶段不需要为了追求数量继续加入复杂特性。

---

# v1.0.0 状态

当前版本完成：

```text
20 / 20 独立实验
```

发布前已检查：

- 20 个目录完整
- HTML / CSS / JS 基础结构完整
- 本地资源引用完整
- JavaScript 语法检查通过
- CSS 基础解析检查通过
- HTML ID / ARIA 关联检查通过
- 主要交互组件完成桌面与移动端适配
- 已修复 Navigation、Tabs、Sticky、Anchor Positioning 等最终检查中发现的问题

---

# License

本项目主要用于 CSS 学习、研究、实验和个人项目参考。

如用于实际生产项目，请根据具体业务、浏览器环境、可访问性要求和设计规范进一步测试与调整。
