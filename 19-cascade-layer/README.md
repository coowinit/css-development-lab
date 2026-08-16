# 19 · Cascade & @layer 层叠管理

CSS Development Lab 的第 19 个独立实验。

本实验研究 CSS 项目越做越大以后最常见的问题：

> 到底哪一条 CSS 会生效？

重点包括：

- Cascade
- Specificity
- Source Order
- `!important`
- `@layer`
- Reset / Base / Components / Utilities 分层

## 文件结构

```text
19-cascade-layer/
├── index.html
├── css/
│   └── style.css
└── README.md
```

---

# 1. 为什么这个实验非常重要

小项目中：

```css
.button {
  color: white;
}
```

看起来很简单。

项目逐渐变大以后可能出现：

```css
.header .button {}
.product-card .button {}
.page-home .product-card .button {}
.button.special {}
```

最后为了覆盖：

```css
.button {
  color: black !important;
}
```

然后下一次：

```css
.page .button {
  color: white !important;
}
```

这就是典型的：

> CSS Specificity War。

---

# 2. CSS 最终为什么会选择某条规则

可以先简单理解为几个重要因素：

```text
来源 / 重要性
↓
Cascade Layer
↓
Specificity
↓
源码顺序
```

真实 Cascade 规则还有更多细节。

但做普通网站开发时，

先把这几个核心因素理解清楚已经非常有价值。

---

# 3. Source Order

如果：

```css
.button {
  color: black;
}

.button {
  color: white;
}
```

两者：

- 来源相同
- Layer 相同
- Specificity 相同

那么：

> 后写的通常胜出。

因此第二条：

```css
color: white;
```

生效。

---

# 4. Specificity

例如：

```css
.button {
  color: black;
}

.card .button {
  color: red;
}
```

`.card .button` 更具体。

所以即使：

```css
.button
```

写在后面，

也不一定能够覆盖前者。

---

# 5. 一个简单的 Specificity 认识

大致可以理解：

```text
元素选择器
p

↓

类 / 属性 / 伪类
.button
[type="text"]
:hover

↓

ID
#header

↓

inline style
style=""
```

不要把这个理解成绝对的“数字排行榜”。

真正 Cascade 还要考虑：

- Origin
- Layer
- Importance

---

# 6. 为什么选择器越写越长很危险

例如：

```css
.page .products .card .button {
}
```

后来想覆盖：

```css
.button {
}
```

很可能不够。

于是继续：

```css
.home .page .products .card .button {
}
```

项目进入：

> 谁的选择器更长。

这种 CSS 后期非常难维护。

---

# 7. !important 为什么不适合做日常方案

```css
.button {
  color: white !important;
}
```

短期：

> 确实解决问题。

长期：

下一条规则只能：

```css
.other-button {
  color: red !important;
}
```

于是：

```text
!important
↓
更多 !important
↓
覆盖关系越来越难预测
```

所以 `!important` 应该是特殊工具，

而不是日常架构。

---

# 8. @layer 解决什么

`@layer` 可以提前定义：

> 不同类型 CSS 的优先级顺序。

例如：

```css
@layer reset, base, components, utilities;
```

这不是文件顺序说明。

它是明确声明：

```text
reset
↓
base
↓
components
↓
utilities
```

对于普通声明，

后面的 Layer 优先级更高。

---

# 9. 本实验的四层架构

```text
01 reset
02 base
03 components
04 utilities
```

---

## reset

负责：

```text
box-sizing
默认 margin
图片默认行为
链接基础清理
```

它应该拥有较低优先级。

---

## base

负责：

```text
body
字体
颜色
页面宽度
标题基础
CSS Variables
```

---

## components

负责：

```text
Button
Card
Accordion
Tabs
Navigation
Modal
Drawer
```

这是业务 UI 的主体。

---

## utilities

负责：

```text
特殊隐藏
对齐
小型间距
局部颜色
特殊宽度
```

应该能够方便地覆盖组件中的局部样式。

---

# 10. 实际例子

组件：

```css
@layer components {
  .button {
    color: white;
    background: black;
  }
}
```

工具类：

```css
@layer utilities {
  .u-quiet {
    color: black;
    background: #f5f5f1;
  }
}
```

HTML：

```html
<a class="button u-quiet">
```

`.u-quiet` 不需要写：

```css
.button.u-quiet
```

也不需要：

```css
.u-quiet {
  background: ... !important;
}
```

因为：

```text
utilities
```

已经比：

```text
components
```

拥有更高的普通 Layer 优先级。

---

# 11. 这就是 Layer 最大的价值

过去：

> 用 Specificity 管理覆盖。

现在可以：

> 先用 Architecture 管理覆盖。

即：

```text
这个规则属于哪一层？
```

比：

```text
这个选择器要写多长才能赢？
```

更加健康。

---

# 12. Layer 内部仍然有 Specificity

注意：

```text
@layer
```

不是取消 Specificity。

在同一个 Layer 内：

```css
.card .button {}
.button {}
```

仍然需要按照正常 Cascade 规则判断。

所以：

> Layer 是管理模块之间的优先级。

不是让 CSS 不再有 Specificity。

---

# 13. Layer 顺序最好提前声明

推荐：

```css
@layer reset, base, components, utilities;
```

直接放在 CSS 顶部。

这样即使代码后面：

```css
@layer reset {}
```

和：

```css
@layer utilities {}
```

出现顺序发生变化，

整体 Layer 优先级仍然已经被明确声明。

---

# 14. @layer 可以跨文件

以后大型项目可以：

```text
reset.css
base.css
components.css
utilities.css
```

每个文件内部进入对应 Layer。

例如：

```css
@layer components {
  ...
}
```

架构仍然一致。

---

# 15. 一个非常重要的细节：Unlayered Styles

普通情况下：

> 没有放入任何 Layer 的普通样式，

会比：

> Layer 内的普通样式

拥有更高优先级。

例如：

```css
@layer components {
  .button {
    color: white;
  }
}

.button {
  color: red;
}
```

外面的：

```css
color: red;
```

会优先。

所以如果项目决定使用 `@layer`：

> 最好制定清晰规则。

不要一边使用 Layer，

一边又在 Layer 外随意写大量组件覆盖。

---

# 16. !important 与 Layer

这里有一个容易混淆的高级细节：

> `!important` 声明的 Layer 顺序与普通声明不同。

这是 CSS 为了保护低层基础样式而设计的行为。

所以不要把：

```text
!important + @layer
```

当成日常覆盖技巧。

实际项目中更好的目标仍然是：

```text
尽量少用 !important
```

---

# 17. 为什么 Reset 放在第一层

例如：

```css
@layer reset {
  a {
    color: inherit;
  }
}
```

然后组件：

```css
@layer components {
  .button {
    color: white;
  }
}
```

Button 不需要写很高 Specificity，

就能自然覆盖 Reset。

这比把 Reset 写成：

```css
body main section a {
}
```

健康得多。

---

# 18. 第三方 CSS 也可以利用 Layer

大型项目有时会引入：

```text
第三方组件 CSS
```

理论上可以给它单独设置较低 Layer：

```text
vendor
```

然后：

```text
components
utilities
```

覆盖第三方样式时就不必拼命提高 Specificity。

这也是 `@layer` 很重要的实际价值之一。

---

# 19. 推荐的项目 Layer 架构

简单项目：

```css
@layer reset, base, components, utilities;
```

已经足够。

更大的项目可以：

```text
reset
vendor
base
layout
components
utilities
```

但不要一开始就设计十几个 Layer。

仍然坚持：

> 越简单越好。

---

# 20. Layer 与 CSS Variables

推荐组合：

```text
base
↓
定义 Design Tokens

components
↓
使用 Tokens

utilities
↓
局部覆盖
```

例如：

```css
@layer base {
  :root {
    --color-primary: #171717;
  }
}
```

组件：

```css
@layer components {
  .button {
    background:
      var(--color-primary);
  }
}
```

结构会非常清晰。

---

# 21. Layer 不等于必须拆很多 CSS 文件

这个实验仍然只有：

```text
css/style.css
```

因为学习重点是：

> Cascade Architecture。

即使只有一个 CSS 文件，

`@layer` 仍然有学习价值。

以后项目变大，再决定是否拆文件。

不要因为用了 Layer 就马上把 CSS 拆成十几个文件。

---

# 22. 一个实用的排错顺序

CSS 样式没生效时可以检查：

```text
1. 选择器是否匹配？
2. 属性是否被划掉？
3. 是否存在 !important？
4. 当前规则在哪个 Layer？
5. Specificity 谁更高？
6. 权重相同时谁写在后面？
```

使用浏览器 DevTools 通常很快就能找到答案。

---

# 23. 适用场景

特别适合：

- 企业官网长期维护
- WordPress Theme
- WooCommerce Theme
- 大型静态站
- Design System
- UI Component Library
- Dashboard
- 多人维护项目

---

# 实验结论

CSS 项目越大，

越应该从：

```text
“怎么让我的选择器赢？”
```

转向：

```text
“这条样式应该属于哪个层级？”
```

推荐最基础的架构：

```css
@layer reset, base, components, utilities;
```

然后坚持：

```text
Reset
↓
Base
↓
Components
↓
Utilities
```

这样可以显著减少：

```text
超长选择器
+
重复覆盖
+
!important
```

让 CSS 更容易理解、预测和长期维护。
