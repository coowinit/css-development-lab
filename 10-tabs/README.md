# 10 · Tabs 标签页

CSS Development Lab 的第 10 个独立实验。

本实验研究网站中非常常见的 Tabs 标签页组件。

常见场景：

- 产品概述
- 技术参数
- 下载资料
- 安装说明
- WooCommerce 产品信息
- 后台设置
- 分类内容切换

## 文件结构

```text
10-tabs/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## 实验目标

重点掌握：

- `.is-active`
- `[hidden]`
- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`
- `tabindex`
- 键盘左右切换
- 手机端 Tab 横向滚动
- CSS / JavaScript 职责分离

---

## 1. Tabs 的核心是什么

本质上只有一个状态：

```text
当前哪个 Tab 是 active？
```

然后：

```text
对应按钮高亮
+
对应 Panel 显示
+
其他 Panel 隐藏
```

不需要为每一个 Tab 单独写逻辑。

---

## 2. 推荐 HTML 结构

Tab 列表：

```html
<div role="tablist">
  <button
    role="tab"
    aria-controls="panel-1">
    产品概述
  </button>
</div>
```

内容：

```html
<section
  role="tabpanel"
  id="panel-1">
  ...
</section>
```

按钮通过：

```text
aria-controls
```

关联内容区域。

---

## 3. aria-selected

当前激活：

```html
aria-selected="true"
```

其他：

```html
aria-selected="false"
```

JavaScript 切换状态时同步更新。

---

## 4. tabindex

推荐：

```text
当前 Tab
tabindex="0"

其他 Tab
tabindex="-1"
```

这样 Tab 键不会逐个停留在所有标签上。

用户进入 Tab 组件后，可以使用：

```text
←
→
Home
End
```

在标签之间移动。

---

## 5. Panel 显隐

本实验使用：

```html
hidden
```

隐藏未激活面板。

CSS：

```css
.tab-panel[hidden] {
  display: none;
}
```

JavaScript：

```js
panel.hidden = !isActive;
```

意图很清楚。

---

## 6. 为什么 JS 不写死每一个 Tab

不推荐：

```js
tab1.onclick = ...
tab2.onclick = ...
tab3.onclick = ...
```

因为后期每增加一个 Tab：

```text
HTML 要增加
JS 也要增加
```

本实验使用：

```js
querySelectorAll('[role="tab"]')
```

自动获取所有标签。

新增 Tab 时，不需要修改核心 JS。

---

## 7. 激活逻辑

核心：

```js
const isActive = tab === nextTab;

tab.classList.toggle(
  "is-active",
  isActive
);

tab.setAttribute(
  "aria-selected",
  String(isActive)
);

panel.hidden = !isActive;
```

这比维护多个独立布尔变量更简单。

---

## 8. 手机端为什么让 Tab 横向滚动

如果有四五个标签，手机端强行：

```text
每个平均分宽
```

容易出现：

```text
文字换两三行
按钮特别高
阅读困难
```

本实验使用：

```css
.tab-list {
  display: flex;
  overflow-x: auto;
}
```

Tab 本身：

```css
.tab-button {
  flex: 0 0 auto;
  white-space: nowrap;
}
```

这样手机端自然横向滑动。

---

## 9. 键盘操作

实现：

```text
ArrowRight → 下一个
ArrowLeft  → 上一个
Home       → 第一个
End        → 最后一个
```

这不仅提升可访问性，也让 Tabs 更接近标准 UI 控件行为。

---

## 10. CSS 的职责

CSS 负责：

- 当前 Tab 高亮
- 下划线
- 内容布局
- 参数 Grid
- 下载列表
- 手机横向滚动
- 响应式

JavaScript 不负责：

```text
颜色
尺寸
动画
布局
```

---

## 11. JavaScript 的职责

JavaScript 只负责：

```text
哪个 Tab 当前激活
+
Panel 显隐
+
ARIA 状态
+
键盘导航
```

这是比较清晰的职责边界。

---

## 12. 后期增加 Tab

新增按钮：

```html
<button
  role="tab"
  aria-controls="panel-new"
  aria-selected="false"
  tabindex="-1">
  新标签
</button>
```

新增 Panel：

```html
<section
  role="tabpanel"
  id="panel-new"
  hidden>
  ...
</section>
```

不需要修改主 JavaScript。

---

## 13. Tabs 与 Accordion 怎么选

### Tabs

适合：

```text
内容类别并列
一次只看其中一个
用户经常来回切换
```

例如：

- Overview
- Specs
- Downloads

### Accordion

适合：

```text
纵向阅读
内容较长
手机场景
FAQ
```

两者不是谁替代谁，而是不同信息结构。

---

## 适用场景

- WooCommerce 产品详情
- 企业官网产品页
- 技术参数
- 下载中心
- 后台设置
- 用户中心
- FAQ 分类
- 文档内容
- SaaS 功能页
- 产品比较

---

## 实验结论

Tabs 最值得掌握的不是：

> 怎么隐藏一个 div，再显示另一个 div。

而是建立统一的状态模型：

```text
Tab
↓
aria-controls
↓
Panel

当前 active
↓
同步：
class
aria-selected
tabindex
hidden
```

这样组件才容易扩展、维护和复用。


## 横向 Tabs 的滚动条处理

手机端 Tab 较多时仍保留原生横向滚动：

```css
.tab-list {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.tab-list::-webkit-scrollbar {
  display: none;
}
```

`overflow-y: hidden` 可以避免活动下划线等细小溢出触发纵向滚动条；隐藏 Scrollbar 只影响视觉，触屏横向滑动仍然保留。
