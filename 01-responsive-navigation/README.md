# 01 · 响应式 Header + 多级导航

CSS Development Lab 的第 01 个独立实验。

本实验围绕真实网站中最常见的导航场景展开：**桌面端多级下拉导航 + Sticky Header + 手机端 Offcanvas 抽屉菜单**。

## 实验目标

重点不是“做一个漂亮导航”，而是理解导航组件背后的 CSS 结构与常见问题：

- `position: sticky` 如何正确用于 Header
- `z-index` 与浮层层级如何组织
- 桌面端二级菜单如何用 `absolute` 定位
- `:hover` 与 `:focus-within` 如何同时兼顾鼠标和键盘操作
- 手机端如何用 `transform` 实现抽屉滑入
- 如何锁定背景页面滚动
- 二级菜单展开时如何避免直接操作元素高度
- CSS 与 JavaScript 如何明确分工
- 如何用 `prefers-reduced-motion` 尊重减少动画的系统设置

## 文件结构

```text
01-responsive-navigation/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   ├── menu.svg
│   ├── close.svg
│   └── chevron-down.svg
└── README.md
```

## 核心 CSS 知识

### 1. Sticky Header

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

`sticky` 不等于 `fixed`。它仍然参与正常文档流，但滚动到指定位置后保持吸顶。

### 2. 桌面端下拉菜单

父级使用：

```css
.has-submenu {
  position: relative;
}
```

二级菜单使用：

```css
.submenu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
}
```

通过：

```css
.has-submenu:hover > .submenu,
.has-submenu:focus-within > .submenu
```

控制显示。

### 3. 手机端 Drawer

初始状态：

```css
.mobile-drawer {
  transform: translateX(100%);
}
```

打开状态：

```css
.mobile-drawer.is-open {
  transform: translateX(0);
}
```

JavaScript 只负责添加或删除 `.is-open`，并同步 `aria-hidden`、`aria-expanded` 与 `inert`。关闭状态下 Drawer 本身使用 `inert`，避免屏幕外的链接继续进入键盘焦点顺序。

### 4. 手机端二级菜单

没有通过 JavaScript 计算 `scrollHeight`，而是利用 Grid：

```css
.mobile-submenu {
  display: grid;
  grid-template-rows: 0fr;
}

.has-children.is-open > .mobile-submenu {
  grid-template-rows: 1fr;
}
```

这是一种非常适合折叠内容的现代 CSS 写法。

视觉折叠之外，本实验还会在关闭的二级菜单上同步 `aria-hidden="true"` 与 `inert`，避免高度为 `0fr` 时隐藏链接仍可被键盘访问。

## JavaScript 的职责

本实验刻意让 JavaScript 保持最小化。

JS 只处理：

- 打开 / 关闭抽屉
- 添加状态 class
- 更新 `aria-expanded`
- ESC 关闭
- 点击遮罩关闭
- 手机端二级菜单状态切换
- 同步 `aria-hidden` / `inert`
- 关闭 Drawer 后恢复触发按钮焦点

打开 Drawer 时，关闭按钮的 `focus()` 放在 Drawer 变为可见后的下一帧执行，避免元素仍处于 `visibility: hidden` 的同一帧时聚焦失败。

布局、动画、定位、显示方式全部交给 CSS。

## 维护方式

### 修改菜单

直接编辑 `index.html` 中的导航列表即可。

### 修改断点

当前主要断点为：

```css
@media (max-width: 900px)
```

900px 以下切换为手机 / 平板抽屉菜单。

### 修改抽屉宽度

```css
.mobile-drawer {
  width: min(88vw, 390px);
}
```

### 修改 Header 高度

统一修改：

```css
:root {
  --header-h: 76px;
}
```

## 适用场景

- 企业官网
- WordPress 自定义主题
- WooCommerce 商城
- 产品展示网站
- 新闻 / 博客网站
- B2B 询盘网站
- Landing Page
- 后台管理系统顶部导航

## 后续可扩展方向

本实验保持最小化，不急于增加功能。真正项目需要时可以继续扩展：

- 三级导航
- Mega Menu
- 滚动后 Header 缩小
- 当前页面菜单高亮
- Search Panel
- Language Switcher
- 登录 / 用户中心
- WooCommerce Mini Cart

## 实验结论

一个稳定的响应式导航不需要大量 JavaScript。

更合理的职责划分是：

```text
HTML
负责语义与信息结构

CSS
负责布局、响应式、定位和动画

JavaScript
只负责状态切换
```

这也是后续 CSS Development Lab 会持续遵循的原则。


## 手机二级菜单折叠结构说明

`grid-template-rows: 0fr → 1fr` 的动画要求 Grid 容器只有一个需要伸缩的直接子项。

因此本实验使用：

```html
<div class="mobile-submenu" aria-hidden="true" inert>
  <ul class="mobile-submenu-list">
    <li>...</li>
  </ul>
</div>
```

而不是让多个 `li` 直接成为 `0fr` Grid 的多个行项目。否则额外的隐式行仍可能显示，造成“箭头是关闭状态，但子菜单内容已经露出”的问题。
