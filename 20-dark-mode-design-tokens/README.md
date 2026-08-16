# 20 · Dark Mode & Design Tokens

CSS Development Lab 的第 20 个独立实验，也是第一阶段最后一个实验。

本实验研究：

- CSS Variables
- Design Tokens
- Light / Dark Theme
- `prefers-color-scheme`
- `color-scheme`
- `data-theme`
- 手动主题切换
- localStorage 保存主题
- 组件如何避免重复写 Dark CSS

---

## 文件结构

```text
20-dark-mode-design-tokens/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   ├── product.svg
│   ├── sun.svg
│   └── moon.svg
└── README.md
```

---

# 1. 最重要的思想

不推荐：

```css
.card {
  background: #fff;
  color: #171717;
}

.dark .card {
  background: #181818;
  color: #fff;
}
```

项目越大，就会出现：

```text
.card
.dark .card

.button
.dark .button

.header
.dark .header

.modal
.dark .modal
```

相当于：

> 重新写了一遍组件 CSS。

更推荐：

```css
.card {
  background: var(--surface);
  color: var(--text);
}
```

然后主题只改变：

```css
--surface
--text
```

组件本身完全不用改。

---

# 2. Design Tokens 是什么

可以简单理解为：

> 把设计系统中的值命名保存下来。

例如：

```css
:root {
  --text: #171717;
  --muted: #666;
  --surface: #fff;
  --border: #ddd;
}
```

组件不再关心具体颜色。

它只关心：

```text
这里需要主要文字
→ --text

这里需要 Card 背景
→ --surface
```

---

# 3. 为什么推荐语义化 Token

不太推荐：

```css
--white: #fff;
--gray-100: #eee;
--gray-900: #111;
```

然后组件：

```css
.card {
  background: var(--white);
}
```

到了 Dark Mode：

> Card 还应该是 white 吗？

所以组件层更适合：

```css
--bg
--surface
--text
--muted
--border
--accent
```

这些变量表达的是：

> 用途。

不是固定颜色。

---

# 4. Primitive Token

最底层仍然可以有：

```css
--white: #fff;
--black: #171717;
```

它们属于：

> Primitive Token。

即基础原子值。

---

# 5. Semantic Token

例如：

```css
--bg
--surface
--text
--muted
--border
--accent
```

属于：

> Semantic Token。

也是普通网站项目中最实用的一层。

---

# 6. Component Token

更大型设计系统可以继续：

```css
--button-bg
--button-text
--card-bg
--card-border
--modal-shadow
```

它们属于：

> Component Token。

但小项目不需要一开始就创建几十个组件变量。

仍然坚持：

> 需要时再增加。

---

# 7. Theme Token

Light：

```css
:root {
  --bg: #f7f7f4;
  --surface: #fff;
  --text: #171717;
}
```

Dark：

```css
[data-theme="dark"] {
  --bg: #101112;
  --surface: #181a1c;
  --text: #f4f4f2;
}
```

组件：

```css
.card {
  background: var(--surface);
  color: var(--text);
}
```

完全不用增加：

```css
.dark .card
```

---

# 8. 系统 Dark Mode

CSS 可以检测用户系统设置：

```css
@media (prefers-color-scheme: dark) {
}
```

本实验默认：

> 如果用户从未手动选择主题，就跟随系统。

例如系统是 Dark：

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #101112;
  }
}
```

这里：

```css
:not([data-theme])
```

非常重要。

它表示：

> 只有用户还没有手动选择主题时，才跟随系统。

---

# 9. 手动主题

用户点击按钮后：

```html
<html data-theme="dark">
```

CSS：

```css
:root[data-theme="dark"] {
  ...
}
```

此时：

> 手动选择优先。

即使系统还是 Light，

页面也保持 Dark。

---

# 10. 为什么使用 data-theme

也可以：

```html
<body class="dark">
```

但：

```html
<html data-theme="dark">
```

更适合全局主题。

因为 Theme 本身就是：

> 整个 Document 的状态。

而且 CSS 写起来非常清晰：

```css
:root[data-theme="dark"]
```

---

# 11. localStorage

如果用户手动选择：

```text
Dark
```

刷新页面后又回到 Light，

体验会比较差。

所以正常环境中会通过：

```js
localStorage.setItem(
  "css-lab-theme",
  "dark"
);
```

下次打开再读取：

```js
localStorage.getItem(...)
```

恢复选择。

本实验还使用 `try...catch` 包装读取和写入。
如果某些受限预览环境禁止 Storage，当前页面仍然可以切换主题，
只是不会跨页面访问保存选择。

这部分需要少量 JavaScript。

---

# 12. JavaScript 的职责

本实验 JS 只负责：

```text
读取主题
切换主题
保存主题
同步按钮状态
```

它不负责：

- 背景颜色
- Card 颜色
- Border
- 按钮颜色
- Dark CSS

这些全部由 CSS Variables 完成。

---

# 13. color-scheme

本实验：

```css
:root {
  color-scheme: light;
}
```

Dark：

```css
color-scheme: dark;
```

它告诉浏览器：

> 当前页面适合哪个颜色方案。

浏览器自身的一些原生 UI：

- Form Control
- Scrollbar
- 系统控件

也可以更自然地适配当前主题。

---

# 14. 一个组件只写一次

例如：

```css
.info-panel {
  color: var(--text);
  background: var(--surface);
  border-color: var(--border);
}
```

Light：

```text
自动使用 Light Tokens
```

Dark：

```text
自动使用 Dark Tokens
```

组件完全不需要知道：

> 现在是 Light 还是 Dark。

这就是 Token 化最大的维护价值。

---

# 15. 不要让变量只代表颜色

Design Tokens 也可以管理：

```css
--page-max
--space-section
--radius-sm
--radius-lg
--shadow
```

也就是说：

```text
Color
Spacing
Typography
Radius
Shadow
Layout
```

都可以 Token 化。

---

# 16. 一个实用的基础 Token 系统

企业官网可以先从这些开始：

```css
:root {
  --bg: ...;
  --surface: ...;
  --surface-2: ...;

  --text: ...;
  --muted: ...;
  --border: ...;

  --accent: ...;
  --accent-text: ...;

  --page-max: 1200px;

  --radius-sm: 14px;
  --radius-md: 20px;
  --radius-lg: 28px;
}
```

已经可以覆盖大部分基础 UI。

---

# 17. 不要一开始创建几百个 Token

Design System 很容易过度设计。

例如：

```text
--gray-10
--gray-20
--gray-30
...
--space-1
--space-2
...
--button-primary-hover-text
...
```

如果项目没有这么复杂：

> 不需要。

CSS Lab 的原则仍然是：

```text
先解决真实需求
再逐步抽象
```

---

# 18. Dark Mode 不是简单反色

不推荐：

```text
白 → 黑
黑 → 白
```

直接机械反转。

Dark Mode 还需要考虑：

- 对比度
- Border 是否过亮
- Shadow 是否合适
- Surface 层级
- 图片是否刺眼
- Accent 是否仍然清晰

因此通常会设计：

```text
bg
surface
surface-2
```

多个暗色层级。

---

# 19. Dark Mode 中 Shadow

Light：

```css
box-shadow:
  0 18px 44px
  rgba(0,0,0,.08);
```

Dark 中相同 Shadow 可能不明显。

可以 Theme Token：

```css
--shadow:
  0 20px 50px
  rgba(0,0,0,.28);
```

组件只写：

```css
box-shadow: var(--shadow);
```

---

# 20. Header 透明背景

本实验使用：

```css
background:
  color-mix(
    in srgb,
    var(--bg) 90%,
    transparent
  );
```

这样 Header：

- Light 使用 Light bg
- Dark 使用 Dark bg

仍然保持半透明效果。

不需要写两套。

---

# 21. Theme Toggle 的交互规则

首次访问：

```text
没有保存主题
↓
跟随系统
```

用户点击：

```text
Light ↔ Dark
↓
设置 data-theme
↓
保存 localStorage
```

以后访问：

```text
读取保存设置
```

这是很常见的主题策略。

---

# 22. 是否需要 System / Light / Dark 三种选择

更完整的产品可以设计：

```text
System
Light
Dark
```

三种模式。

本实验为了保持简单：

```text
首次跟随系统
+
用户手动 Light / Dark
```

已经足够理解核心机制。

---

# 23. Design Tokens 与 @layer

上一章学习：

```css
@layer
```

这两章可以组合：

```text
base Layer
↓
定义 Design Tokens

components Layer
↓
组件引用 Tokens

utilities Layer
↓
局部调整
```

这会形成非常清晰的 CSS 架构。

---

# 24. Design Tokens 与 Fluid CSS

第 18 章学习：

```css
clamp()
```

可以直接放进 Tokens：

```css
--space-section:
  clamp(4rem, 9vw, 8rem);

--title-xl:
  clamp(2.8rem, 7vw, 6rem);
```

所以 Token 不只是主题系统。

它也可以成为：

> 网站整体尺度系统。

---

# 25. Design Tokens 与组件化

例如：

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
```

Card 不知道：

- 当前页面
- 当前主题
- 当前品牌

只知道：

> 使用这些语义 Token。

这让组件更容易复用。

---

# 26. 适用场景

- 企业官网
- WordPress Theme
- WooCommerce Theme
- Dashboard
- WebApp
- Design System
- UI Component Library
- SaaS
- 文档站
- 长期维护项目

---

# 实验结论

Dark Mode 最重要的不是：

> 怎么把背景改成黑色。

而是：

> 如何建立组件与主题之间的正确职责边界。

推荐结构：

```text
Theme
↓
修改 Design Tokens

Components
↓
只读取 Design Tokens

JavaScript
↓
只切换 Theme 状态
```

核心代码：

```css
:root {
  --bg: ...;
  --surface: ...;
  --text: ...;
}

[data-theme="dark"] {
  --bg: ...;
  --surface: ...;
  --text: ...;
}
```

组件：

```css
.card {
  background: var(--surface);
  color: var(--text);
}
```

这套思路不仅可以做 Dark Mode，

还可以进一步扩展：

```text
品牌主题
活动主题
高对比度主题
后台主题
多站点主题
```

至此，CSS Development Lab 第一阶段 20 个独立实验完整结束。
