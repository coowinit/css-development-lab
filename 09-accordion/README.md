# 09 · Accordion 手风琴

CSS Development Lab 的第 09 个独立实验。

本实验研究网站中非常常见的 Accordion 手风琴组件。

默认规则：

- 第一项默认展开
- 一次只展开一个项目
- 点击其他项目时自动切换
- 点击当前展开项时不折叠
- 始终至少保留一个展开项
- CSS 负责动画
- JavaScript 只负责状态

## 文件结构

```text
09-accordion/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── chevron.svg
└── README.md
```

## 核心知识

- `grid-template-rows`
- `overflow: hidden`
- CSS Transition
- 状态类 `.is-open`
- `aria-expanded`
- `aria-controls`
- `role="region"`
- 最少量 JavaScript
- CSS / JS 职责分离

---

## 1. 为什么 Accordion 很值得单独练习

常见场景：

- FAQ
- 产品参数
- WooCommerce 产品说明
- 下载资料
- 服务流程
- 招聘职位
- 左侧分类
- 手机导航
- 帮助中心

这是一个非常高频的 UI 组件。

---

## 2. 传统 max-height 方案的问题

常见写法：

```css
.panel {
  max-height: 0;
  overflow: hidden;
}

.open .panel {
  max-height: 500px;
}
```

这种写法的问题是：

```text
内容少
→ 500px 太大

内容多
→ 500px 可能不够

内容变化
→ 又要调整数值
```

而且动画速度取决于：

```text
真实高度 / max-height
```

可能出现快慢不一致。

---

## 3. 本实验使用 Grid 展开

关闭：

```css
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
}
```

打开：

```css
.accordion-item.is-open .accordion-panel {
  grid-template-rows: 1fr;
}
```

内部：

```css
.accordion-panel-inner {
  overflow: hidden;
}
```

然后：

```css
transition: grid-template-rows 300ms ease;
```

这样不需要提前知道内容到底多高。

---

## 4. 为什么 JavaScript 不计算 scrollHeight

传统方案经常：

```js
panel.style.height = panel.scrollHeight + "px";
```

这样虽然可以做，但会让 JavaScript 同时负责：

```text
状态
+
布局
+
尺寸计算
+
动画
```

本实验更推荐：

```text
JavaScript
只负责 is-open

↓

CSS
根据 is-open 决定视觉状态
```

职责更加清晰。

---

## 5. JavaScript 核心逻辑

逻辑非常简单：

```text
点击一个 Trigger
↓
找到当前 Item
↓
如果已经打开
  不处理
↓
否则
  当前 Item 打开
  其他 Item 关闭
```

这样确保：

> 始终至少有一个项目展开。

---

## 6. 为什么使用 button

Accordion 标题不是普通文字。

它实际上是一个：

> 可以操作界面状态的控件。

所以推荐：

```html
<button>
```

而不是：

```html
<div>
```

这样天然支持：

- Tab 键
- Enter
- Space
- Focus

---

## 7. aria-expanded

关闭：

```html
aria-expanded="false"
```

打开：

```html
aria-expanded="true"
```

JavaScript 切换状态时同步修改。

---

## 8. aria-controls

Trigger：

```html
<button aria-controls="panel-1">
```

Panel：

```html
<div id="panel-1">
```

这样建立：

```text
按钮
↓
控制哪个内容区域
```

的语义关系。

---

## 9. 箭头动画

打开项目：

```css
.is-open .trigger-icon {
  transform: rotate(180deg);
}
```

视觉状态完全由 CSS 控制。

不需要 JavaScript 修改：

```text
up.svg
down.svg
```

也不需要两套图标。

---

## 10. 为什么默认至少展开一个

对于：

- FAQ
- 步骤说明
- 分类导航
- 产品信息

默认显示一项可以避免整个区域看起来完全关闭。

并且用户当前正在看的内容不会因为误点再次关闭。

当然，真实项目如果希望允许全部折叠，只需要删除 JS 中：

```js
if (currentItem.classList.contains("is-open")) {
  return;
}
```

即可。

---

## 11. 后期增加项目

直接复制：

```html
<article class="accordion-item">
...
</article>
```

JavaScript 不需要增加新的选择器。

只要保证：

```text
trigger id
panel id
aria-controls
aria-labelledby
```

互相对应即可。

---

## 12. CSS 与 JS 的职责

本实验特别强调：

### HTML

负责：

```text
结构
语义
ARIA
```

### CSS

负责：

```text
布局
展开
收起
动画
图标旋转
响应式
```

### JavaScript

负责：

```text
哪个 Item 是 open
```

这是一种非常适合长期维护的组件分工。

---

## 适用场景

- FAQ
- WooCommerce 产品详情
- B2B 产品参数
- 技术资料
- 安装说明
- 服务流程
- 招聘职位
- 帮助中心
- 手机导航
- 左侧分类
- 文档目录

---

## 实验结论

一个稳定的 Accordion 不需要大量 JavaScript。

推荐结构：

```text
Button
↓
JS 切换状态 class
↓
CSS 根据状态展开
↓
Grid 自动处理内容高度
```

核心组合：

```text
grid-template-rows
+
overflow: hidden
+
transition
+
is-open
```

这比固定 `max-height` 更容易长期维护。
