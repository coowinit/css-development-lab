# 16 · Tooltip / Dropdown 定位

CSS Development Lab 的第 16 个独立实验。

本实验研究网站中非常常见的浮层定位问题：

- Tooltip
- Dropdown
- 操作菜单
- 小型 Popover

重点不是“让浮层显示出来”，而是理解：

> 浮层到底相对谁定位？

## 文件结构

```text
16-tooltip-dropdown-positioning/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── chevron.svg
└── README.md
```

## 实验目标

重点掌握：

- `position: relative`
- `position: absolute`
- `top / left / right / bottom`
- `transform`
- `z-index`
- `overflow`
- `:focus-within`
- Tooltip 箭头伪元素
- Dropdown 状态切换
- Anchor Positioning 渐进增强
- 什么时候仍然需要 JavaScript 定位方案

---

## 1. 最经典的定位模型

结构：

```html
<div class="wrapper">
  <button>Trigger</button>
  <div class="popover">...</div>
</div>
```

父级：

```css
.wrapper {
  position: relative;
}
```

浮层：

```css
.popover {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
}
```

意思：

```text
Trigger / Wrapper
↓
建立定位参照

Popover
↓
相对 Wrapper 定位
```

这是最值得先掌握的基础。

---

## 2. absolute 相对谁定位

`position: absolute` 并不是：

> 自动相对最近按钮。

它会寻找：

> 最近的非 static 定位祖先。

例如：

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

都可能形成定位参照。

所以很多 Dropdown 跑偏，本质是：

> 定位父级不是你以为的那个元素。

---

## 3. Tooltip 为什么适合纯 CSS

Tooltip 通常只是：

```text
辅助说明
```

没有复杂业务状态。

所以可以：

```css
.tooltip-wrap:hover .tooltip,
.tooltip-wrap:focus-within .tooltip {
  opacity: 1;
  visibility: visible;
}
```

不需要 JavaScript。

---

## 4. 为什么同时写 focus-within

只写：

```css
:hover
```

键盘用户看不到 Tooltip。

加入：

```css
:focus-within
```

当内部按钮获得焦点时，Tooltip 也显示。

---

## 5. Tooltip 箭头

不需要图片。

可以：

```css
.tooltip::after {
  content: "";
  width: 8px;
  height: 8px;
  background: #171717;
  transform: rotate(45deg);
}
```

形成一个小菱形。

再让一半露出 Tooltip，就会看起来像三角箭头。

---

## 6. Dropdown 为什么需要少量 JS

Dropdown 与 Tooltip 不同。

用户点击按钮后：

```text
菜单应该保持打开
```

直到：

- 再次点击
- 点击外部
- ESC

所以需要业务状态：

```text
open / close
```

本实验 JavaScript 只负责：

```text
hidden
aria-expanded
```

定位本身仍然完全交给 CSS。

---

## 7. 左对齐与右对齐

左对齐：

```css
.menu {
  left: 0;
}
```

右对齐：

```css
.menu {
  left: auto;
  right: 0;
}
```

这两个规则可以解决大量常见菜单。

例如：

```text
左侧导航
→ left: 0

页面右上角账户菜单
→ right: 0
```

---

## 8. z-index 为什么有时写很大也没用

如果：

```css
z-index: 999999;
```

仍然被别的元素遮住，

问题可能不是数字不够大，而是：

> 元素处于另一个 Stacking Context。

常见创建新层叠上下文的因素包括：

```text
transform
opacity
filter
isolation
position + z-index
```

因此浮层层级排错时不能只会不断加数字。

---

## 9. overflow 裁切

这是 Dropdown / Tooltip 非常高频的问题。

例如：

```css
.card {
  overflow: hidden;
}
```

如果 Dropdown 放在 Card 内：

```text
菜单超出 Card
↓
直接被裁掉
```

即使：

```css
z-index: 9999;
```

也救不了。

因为这是：

> clipping

不是普通层级问题。

---

## 10. 传统方案的结构限制

传统：

```text
Trigger
└── Popover
```

通常要求浮层位于触发器附近的 DOM 结构里。

这样：

```css
position: relative
+
position: absolute
```

才最方便。

但复杂项目中可能出现：

```text
Trigger 在组件 A

Popover 必须放到页面顶层
```

这时传统定位就开始变麻烦。

---

## 11. Anchor Positioning 的思路

现代 CSS Anchor Positioning 的目标是：

> 让一个浮层直接引用另一个元素作为定位锚点。

概念上：

```css
.trigger {
  anchor-name: --menu;
}

.popover {
  position: absolute;
  position-anchor: --menu;
  position-area: bottom;
}
```

这样 Popover 可以直接参考 Trigger 的锚点定位。

本实验仍然保留传统 fallback；在支持 Anchor Positioning 的环境中，
增强规则使用 `position-area: bottom`，并继续限制浮层宽度，
避免在窄容器中出现浮层被压缩或与 Trigger 重叠的问题。

---

## 12. 为什么本实验不把 Anchor Positioning 当唯一方案

这套 CSS Lab 的原则是：

> 实用优先。

所以本实验：

```text
主方案
relative + absolute

↓

增强方案
Anchor Positioning
```

这样即使环境不支持增强能力：

> 基础组件仍然能正常工作。

这就是 Progressive Enhancement。

---

## 13. @supports

本实验使用：

```css
@supports
  (anchor-name: --demo-anchor) and
  (position-anchor: --demo-anchor) {
}
```

只有支持相应能力时：

```text
才启用 Anchor Positioning
```

不支持时：

```text
继续使用传统 absolute 定位
```

---

## 14. 什么时候 Anchor Positioning 更有价值

例如：

- Tooltip
- Dropdown
- Popover
- Context Menu
- 浮动说明
- 触发器与浮层不在同一个 DOM 层级

尤其当过去需要 JavaScript：

```text
getBoundingClientRect()
↓
计算 top / left
↓
监听 resize
↓
监听 scroll
```

Anchor Positioning 的价值就很明显。

---

## 15. 什么时候传统方案已经足够

如果只是：

```text
按钮下面一个菜单
```

并且：

```text
按钮和菜单在同一个简单组件中
```

那么：

```css
relative
+
absolute
```

完全足够。

不要为了使用新技术，把简单问题复杂化。

---

## 16. 什么时候仍然需要 JS 定位库

如果需要：

- 自动检测视口边缘
- 上下左右智能翻转
- 多层浮层
- 碰撞检测
- Portal
- 复杂 Tooltip 系统
- 很复杂的 Context Menu

那么专业的 JS 定位方案仍然可能更合适。

CSS 不是为了消灭所有 JavaScript。

---

## 17. 手机端注意事项

Tooltip 本身应该只是：

> 补充信息。

重要内容不能：

```text
只有 hover 后才能看到
```

因为手机没有稳定 Hover。

关键操作更适合：

- 点击
- Modal
- Drawer
- 展开区域

---

## 18. Tooltip 与 Popover 的区别

### Tooltip

通常：

```text
简短说明
无复杂操作
Hover / Focus 出现
```

### Dropdown / Popover

通常：

```text
可交互
包含链接或按钮
需要 open / close 状态
```

所以两者不能完全用同一种交互方式。

---

## 适用场景

- 导航下拉菜单
- 用户账户菜单
- 更多操作
- Tooltip
- 商品说明
- 后台操作菜单
- Share Menu
- Filter Menu
- Context Menu
- 产品小提示

---

## 实验结论

浮层定位建议按这个顺序：

```text
简单场景
↓
relative + absolute

↓

结构开始复杂
↓
Anchor Positioning 可作为渐进增强

↓

需要智能碰撞 / 翻转 / 复杂定位
↓
专门 JS 定位方案
```

最重要的不是追求最新语法。

而是：

> 用最简单、最可靠的方式解决当前场景。
