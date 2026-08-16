# 08 · 响应式表格

CSS Development Lab 的第 08 个独立实验。

本实验研究真实项目中非常常见的表格适配问题：

- 桌面端正常显示
- 手机端横向滚动
- 表头固定
- 第一列固定
- 大量列不被强行压缩
- 表格内容避免乱换行
- 什么时候应该继续用 Table
- 什么时候可以改成移动端卡片

## 文件结构

```text
08-responsive-table/
├── index.html
├── css/
│   └── style.css
└── README.md
```

## 实验目标

重点掌握：

- `overflow-x: auto`
- `min-width`
- `white-space: nowrap`
- `position: sticky`
- Sticky Header
- Sticky First Column
- `z-index`
- 表格语义
- 移动端表格策略

---

## 1. 最常用的响应式表格方案

HTML：

```html
<div class="table-shell">
  <table>
    ...
  </table>
</div>
```

CSS：

```css
.table-shell {
  overflow-x: auto;
}

table {
  min-width: 900px;
}
```

核心思想：

> 表格保持合理宽度，窄屏时由外层容器负责滚动。

不要为了塞进手机屏幕，把每一列压到无法阅读。

---

## 2. 为什么需要 min-width

如果只写：

```css
table {
  width: 100%;
}
```

浏览器会尝试把所有列压进当前容器。

当列很多时容易出现：

```text
每列特别窄
文字疯狂换行
一行数据高度很高
阅读困难
```

因此可以：

```css
table {
  min-width: 920px;
}
```

让表格保持基本可读宽度。

---

## 3. white-space: nowrap

规格表中很多数据不适合随意换行：

```text
140 × 23 mm
15 年
CW-150 Pro
```

可以：

```css
th,
td {
  white-space: nowrap;
}
```

然后交给外层：

```css
overflow-x: auto;
```

处理窄屏。

---

## 4. Sticky Header

长表格向下滚动时，用户很容易忘记当前列代表什么。

可以：

```css
thead th {
  position: sticky;
  top: 0;
}
```

让表头固定在滚动容器顶部。

注意：

> Sticky 是相对于最近的滚动容器工作的。

---

## 5. Sticky First Column

横向滚动时，也可能忘记当前是哪一行。

可以：

```css
th:first-child {
  position: sticky;
  left: 0;
}
```

这在：

- 财务表
- 月度数据
- 产品对比
- 排期表

中很常见。

---

## 6. Sticky Header + First Column 的 z-index

左上角单元格同时属于：

```text
表头
+
第一列
```

因此层级需要单独提高：

```css
thead th:first-child {
  z-index: 4;
}
```

否则滚动时可能出现覆盖错误。

---

## 7. 为什么不要一上来就“手机端卡片化”

表格最重要的价值是：

> 横向比较。

例如：

```text
型号 | 尺寸 | 颜色 | 价格 | 库存
```

用户可能需要快速比较多行、多列。

如果移动端全部变成：

```text
Card 1
Card 2
Card 3
```

横向比较能力会明显下降。

所以对真正二维数据：

> 保留 Table + 横向滚动

通常更合理。

---

## 8. 什么情况下适合卡片化

如果每一行本质上是一条独立记录：

```text
订单
联系人
产品
下载文件
客户
```

那么手机端可以考虑：

```text
一条记录
↓
一个 Card
```

例如：

```text
型号：CW-140
尺寸：140 × 23 mm
颜色：Teak
质保：15 年
```

这种数据不强依赖横向比较，就比较适合卡片化。

---

## 9. Table 与 Card 的选择

### 保留 Table

适合：

- 产品规格
- 价格比较
- 财务数据
- 月度数据
- 参数对照
- 多列统计

### 可以 Card 化

适合：

- 联系人列表
- 订单列表
- 文件列表
- 产品记录
- 移动端后台记录

---

## 10. 不建议的做法

### 不建议：手机端直接缩小字体

例如：

```css
table {
  font-size: 10px;
}
```

只是为了塞进屏幕。

这样会严重影响可读性。

---

### 不建议：所有单元格疯狂换行

例如宽度很窄：

```text
CW-
150
Pro
```

会让表格高度失控。

---

### 不建议：为了响应式破坏语义结构

真正的二维数据尽量保留：

```html
<table>
<thead>
<tbody>
<th>
<td>
```

这不仅影响布局，也关系到可访问性。

---

## 11. 手机端滑动提示

横向滚动区域在手机端有时不够明显。

可以增加：

```text
手机端可左右滑动表格 →
```

帮助用户发现表格仍然可以查看更多列。

正式项目也可以进一步增加渐变遮罩或滚动提示。

---

## 适用场景

- WooCommerce 产品规格
- 产品参数表
- 价格表
- B2B 技术参数
- WordPress 后台工具
- 财务数据
- 排期表
- 月度统计
- 产品比较
- 库存列表
- 下载记录

---

## 实验结论

响应式表格最实用的判断顺序：

```text
这是二维比较数据吗？
│
├─ 是
│  └─ 保留 Table
│      +
│      overflow-x: auto
│      +
│      min-width
│
└─ 否
   └─ 每行是否是独立记录？
       └─ 可以考虑手机端 Card
```

表格响应式的目标不是：

> 强行把所有列塞进手机屏幕。

而是：

> 在不同屏幕下，仍然保持数据可读、可比较、可操作。
