# 12 · Drawer / Offcanvas 侧滑抽屉

CSS Development Lab 的第 12 个独立实验。

本实验研究网站中高频使用的 Drawer / Offcanvas 组件。

演示三类真实场景：

- 手机导航
- 产品筛选
- Mini Cart

三个入口共用同一个 Drawer 核心。

## 文件结构

```text
12-drawer-offcanvas/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── close.svg
└── README.md
```

## 实验目标

重点掌握：

- `position: fixed`
- `inset-block`
- `right: 0`
- `transform: translateX()`
- `visibility`
- 遮罩层
- `100dvh`
- 内部独立滚动
- `overscroll-behavior`
- 页面滚动锁定
- ESC 关闭
- 点击遮罩关闭
- 焦点返回
- 多种业务内容复用同一个 Drawer

---

## 1. Drawer 的核心动画

关闭状态：

```css
.drawer {
  transform: translateX(100%);
}
```

此时整个抽屉位于视口右边。

打开：

```css
.drawer.is-open {
  transform: translateX(0);
}
```

本质就是：

```text
右侧屏幕外
↓
滑入当前视口
```

因此不需要 JavaScript 连续修改：

```text
left
right
width
```

---

## 2. 为什么使用 transform

如果用：

```css
right: -430px;
```

再动画到：

```css
right: 0;
```

也可以实现。

但对于纯视觉位移：

```css
transform
```

通常更加清晰，也更适合动画。

所以推荐：

```text
固定定位
+
transform 位移
```

---

## 3. Drawer 为什么使用 fixed

抽屉应该相对于浏览器视口固定。

```css
.drawer {
  position: fixed;
  inset-block: 0;
  right: 0;
}
```

这里：

```css
inset-block: 0;
```

等价于当前横向书写模式下：

```css
top: 0;
bottom: 0;
```

让 Drawer 占满视口高度。

---

## 4. 100dvh

```css
height: 100dvh;
```

相比传统：

```css
height: 100vh;
```

动态视口单位更适合移动浏览器地址栏显示 / 隐藏的情况。

---

## 5. Drawer 内部布局

本实验使用：

```css
.drawer {
  display: grid;
  grid-template-rows:
    auto
    minmax(0, 1fr)
    auto;
}
```

结构：

```text
Header
↓
Scrollable Content
↓
Footer
```

中间：

```css
.drawer-body {
  min-height: 0;
  overflow-y: auto;
}
```

这样无论内容多长：

- 顶部关闭按钮仍然存在
- 底部操作按钮仍然存在
- 只有中间内容滚动

---

## 6. 为什么需要 min-height: 0

在 Grid / Flex 中：

```css
min-height: auto;
```

有时会让子项不愿意缩小。

结果：

```text
drawer-body 内容很长
↓
把整个 Drawer 撑出屏幕
```

所以：

```css
.drawer-body {
  min-height: 0;
  overflow-y: auto;
}
```

是非常重要的组合。

---

## 7. overscroll-behavior

```css
.drawer-body {
  overscroll-behavior: contain;
}
```

作用是尽量让：

```text
Drawer 滚动
```

停留在 Drawer 内部。

减少滚到顶部 / 底部后继续带动背景页面的体验问题。

---

## 8. 页面滚动锁定

Drawer 打开：

```css
body.drawer-open {
  overflow: hidden;
}
```

这样用户不会：

```text
一边打开抽屉
一边滚动背景网页
```

---

## 9. 遮罩层

结构：

```text
页面
↓
Backdrop
↓
Drawer
```

层级：

```css
backdrop z-index: 190;
drawer   z-index: 200;
```

打开时：

```css
.backdrop.is-visible {
  opacity: 1;
}
```

关闭：

```css
opacity: 0;
```

动画完成后再：

```text
hidden
```

避免透明遮罩仍然阻挡页面点击。

---

## 10. visibility 为什么一起使用

关闭时：

```css
transform: translateX(100%);
visibility: hidden;
```

单独使用 `transform` 时，虽然肉眼看不到 Drawer，但它仍然存在。

结合：

```css
visibility: hidden;
```

可以让关闭状态更加明确。

---

## 11. JavaScript 的职责

JavaScript 只负责：

```text
打开哪个 Drawer 内容
↓
添加 is-open
↓
显示 backdrop
↓
关闭时移除状态
```

不负责：

- Drawer 位置
- Drawer 宽度
- 动画
- 响应式
- 内部滚动
- 遮罩颜色

这些全部由 CSS 完成。

---

## 12. 为什么三个 Demo 共用一个 Drawer

不推荐：

```text
Navigation Drawer
Filter Drawer
Cart Drawer

各写一整套 HTML/CSS/JS
```

因为它们的核心行为完全一样：

```text
从右边滑入
+
遮罩
+
关闭
+
滚动
```

差异只是：

> 里面装什么内容。

所以本实验：

```text
Drawer Shell
固定

Content
按场景切换
```

这样更容易维护。

---

## 13. Template 的作用

页面中使用：

```html
<template>
```

保存三种内容模板。

JavaScript 打开时：

```js
template.content.cloneNode(true)
```

将对应内容放入 Drawer。

这种方式只用于实验展示。

真实项目中：

- WordPress
- WooCommerce
- Vue
- React
- PHP

都可以由自己的模板系统输出内容。

Drawer CSS 本身不需要变化。

---

## 14. 焦点返回

打开 Drawer 时记录：

```text
用户点击的是哪个按钮
```

关闭后：

```js
lastTrigger.focus();
```

让键盘用户回到原来的操作位置。

打开时则先让 Drawer 进入可见状态，再在下一帧聚焦关闭按钮，避免 `visibility: hidden` 刚切换时浏览器拒绝聚焦。

这属于很实用的小细节。

同时，本实验在 Drawer 打开时给主页面内容设置 `inert`，关闭后再恢复：

```js
pageContent.inert = true;  // 打开
pageContent.inert = false; // 关闭
```

关闭状态下 Drawer 自身也使用 `inert`。这样被遮挡或已经移出视口的交互内容不会继续进入键盘焦点顺序，而不需要额外编写复杂的 Focus Trap。

---

## 15. ESC 关闭

本实验监听：

```text
Escape
```

关闭 Drawer。

因为 Drawer 不像原生 `<dialog>`：

> 浏览器不会自动帮我们处理 ESC。

所以需要少量 JavaScript。

---

## 16. Drawer 和 Modal 怎么选

### Drawer

特点：

```text
从边缘进入
仍然保留页面空间关系
```

适合：

- 导航
- 筛选
- Mini Cart
- 辅助详情

### Modal

特点：

```text
居中覆盖
强调当前任务
```

适合：

- 登录
- 表单
- 确认
- Lightbox

---

## 17. 左侧 Drawer

当前使用：

```css
right: 0;
transform: translateX(100%);
```

如果改为左侧：

```css
left: 0;
right: auto;
transform: translateX(-100%);
```

打开仍然：

```css
transform: translateX(0);
```

整个组件逻辑不变。

---

## 适用场景

- 手机导航
- WooCommerce 产品筛选
- Mini Cart
- 询盘清单
- 收藏夹
- 产品详情
- 用户中心
- Search Panel
- 分类导航
- 后台辅助面板

---

## 实验结论

Drawer 最值得保留的核心结构：

```text
fixed
+
transform
+
backdrop
+
Grid 三段式布局
+
中间区域 overflow-y
```

再加少量 JavaScript：

```text
open
close
ESC
focus
```

就能形成一个稳定、可长期复用的 Offcanvas 组件。
