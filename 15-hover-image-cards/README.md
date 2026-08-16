# 15 · Hover 图片卡片效果

CSS Development Lab 的第 15 个独立实验。

本实验研究产品、案例、Gallery、Portfolio 中非常常见的图片 Hover 卡片。

目标效果：

```text
默认
图片 + 标题

Hover
↓
图片轻微放大
遮罩加深
操作文字出现
箭头轻移
```

同时兼顾：

- 键盘 Focus
- 手机触控设备
- Reduced Motion
- 响应式

## 文件结构

```text
15-hover-image-cards/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── project-01.svg
│   ├── project-02.svg
│   ├── project-03.svg
│   └── project-04.svg
└── README.md
```

## 核心知识

- `position: relative`
- `position: absolute`
- `overflow: hidden`
- `transform: scale()`
- `opacity`
- `transition`
- `::before`
- `isolation: isolate`
- `:focus-visible`
- `@media (hover: hover)`
- `@media (pointer: fine)`
- `@media (hover: none)`
- `prefers-reduced-motion`

---

## 1. 卡片的图层结构

推荐理解成三层：

```text
Content
↑
Overlay
↑
Image
```

HTML 只需要：

```html
<a class="card-link">
  <img class="card-image">

  <div class="card-content">
    ...
  </div>
</a>
```

遮罩不需要额外写：

```html
<div class="overlay"></div>
```

可以直接使用：

```css
.card-link::before
```

---

## 2. 外层为什么要 overflow: hidden

图片 Hover 时：

```css
.card-image {
  transform: scale(1.055);
}
```

图片会比容器略大。

所以外层：

```css
.card-link {
  overflow: hidden;
  border-radius: 22px;
}
```

这样放大的图片仍然被裁切在圆角卡片内部。

---

## 3. 图片不要放大太多

推荐：

```css
scale(1.03)
```

到：

```css
scale(1.08)
```

通常已经足够。

如果：

```css
scale(1.2)
```

Hover 时视觉跳动会比较明显。

本实验：

```css
transform: scale(1.055);
```

属于比较克制的范围。

---

## 4. 遮罩为什么适合 ::before

```css
.card-link::before {
  content: "";
  position: absolute;
  inset: 0;
}
```

优点：

- 不增加 HTML
- 与卡片绑定
- 方便统一控制
- 后期修改透明度简单

---

## 5. 为什么使用渐变遮罩

如果整张图统一：

```css
background: rgba(0,0,0,.5);
```

上半部分也会变得很暗。

而标题通常位于底部。

所以更适合：

```css
linear-gradient(
  to top,
  rgba(0,0,0,.72),
  rgba(0,0,0,.30),
  rgba(0,0,0,.05)
);
```

实现：

```text
底部深
↓
中部轻
↓
顶部几乎透明
```

这样既保证文字可读，又保留图片主体。

---

## 6. 内容出现动画

初始：

```css
.card-action {
  opacity: 0;
  transform: translateY(10px);
}
```

Hover：

```css
.card-action {
  opacity: 1;
  transform: translateY(0);
}
```

效果会比直接：

```css
display: none;
display: block;
```

更自然。

因为：

```text
display
```

本身不适合普通 Transition。

---

## 7. 为什么不能只写 :hover

这是这一章非常重要的实际问题。

手机和平板没有稳定的 Hover 状态。

如果按钮：

```text
默认完全隐藏
只有 hover 才显示
```

触控用户可能无法正常发现操作。

所以不要：

```css
.card:hover .button {
  display: block;
}
```

然后完全忽略触控设备。

---

## 8. 现代媒体能力查询

本实验使用：

```css
@media (hover: hover) and (pointer: fine) {
}
```

表示：

```text
设备真正支持 Hover
+
主要指针比较精准
```

通常就是鼠标设备。

只有这种设备才启用：

```text
默认隐藏 action
Hover 后显示
```

---

## 9. 触控设备

本实验：

```css
@media (hover: none), (pointer: coarse) {
  .card-action {
    opacity: 1;
    transform: none;
  }
}
```

也就是：

> 手机上的操作信息默认直接显示。

这样页面不会依赖一个触屏用户没有的交互方式。

---

## 10. Focus 也要有状态

卡片是：

```html
<a>
```

键盘用户可以使用 Tab 聚焦。

所以：

```css
.card-link:focus-visible
```

也应该触发与 Hover 相近的状态：

```text
图片放大
遮罩增强
操作出现
```

不要让鼠标用户有反馈，而键盘用户完全没有。

---

## 11. isolation: isolate

本实验外层：

```css
.card-link {
  isolation: isolate;
}
```

作用是创建独立的层叠上下文。

这样：

```text
Image
Overlay
Content
```

内部的 `z-index` 更容易控制，不会与外部页面元素混在一起。

这对于带多个绝对定位图层的组件很实用。

---

## 12. 为什么不需要 JavaScript

Hover 卡片的所有状态都来源于：

```text
:hover
:focus-visible
媒体能力
```

没有真正的业务状态。

所以不需要 JavaScript 添加：

```text
active
hover
open
```

CSS 自己就可以完成。

---

## 13. 哪些内容适合 Hover 时出现

适合：

- “查看项目”
- 简短分类
- 箭头
- 一句辅助描述

不适合：

- 重要价格
- 产品名称唯一入口
- 必须阅读的信息
- 手机端必须操作的按钮

原则：

> Hover 可以增强信息，但不应该隐藏关键业务内容。

---

## 14. Hover 动画速度

推荐：

```text
180ms ～ 350ms
```

图片缩放可以稍慢：

```text
350ms ～ 600ms
```

本实验：

```text
遮罩 / 内容：约 240～320ms
图片：520ms
```

这样图片会有一点惯性，但不会拖沓。

---

## 15. prefers-reduced-motion

部分用户会在操作系统中选择：

```text
减少动画
```

因此：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: .01ms !important;
  }
}
```

让组件尊重用户系统偏好。

---

## 16. 适用场景

- 企业官网案例
- Portfolio
- WooCommerce 产品分类
- 产品系列
- Gallery
- 新闻封面
- 博客推荐
- 团队成员
- 服务卡片
- 图片导航

---

## 实验结论

Hover 图片卡片最实用的结构：

```text
Container
overflow:hidden

↓

Image
transform: scale()

↓

::before
Overlay

↓

Content
opacity + translate
```

再补上两个实际项目必须考虑的条件：

```text
Keyboard
→ :focus-visible

Touch
→ 不依赖 hover
```

这样才是一个真正可复用的 Hover 组件，而不只是桌面端视觉特效。
