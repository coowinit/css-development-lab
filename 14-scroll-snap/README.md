# 14 · CSS Scroll Snap 横向滚动

CSS Development Lab 的第 14 个独立实验。

本实验研究一个非常实用的现代 CSS 能力：

```css
scroll-snap-type
scroll-snap-align
```

用于实现：

- 横向产品卡片
- 图片画廊
- 案例展示
- 手机端横向内容
- Logo 列表

而不必一开始就引入 Swiper。

## 文件结构

```text
14-scroll-snap/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── card-01.svg
│   ├── card-02.svg
│   ├── card-03.svg
│   ├── card-04.svg
│   ├── gallery-01.svg
│   ├── gallery-02.svg
│   └── gallery-03.svg
└── README.md
```

## 核心知识

- `overflow-x: auto`
- `scroll-snap-type`
- `scroll-snap-align`
- `scroll-snap-stop`
- `scroll-padding`
- `overscroll-behavior`
- `grid-auto-flow: column`
- `grid-auto-columns`

---

## 1. 最核心的结构

容器：

```css
.track {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
```

子项：

```css
.item {
  scroll-snap-align: start;
}

.item:last-child {
  scroll-snap-align: end;
}
```

普通项目吸附到滚动容器起始位置，最后一个项目吸附到结束位置。

结果：

```text
自由横向滚动
↓
停止时
↓
自动靠齐
```

---

## 2. scroll-snap-type

```css
scroll-snap-type: x mandatory;
```

含义：

```text
x
横向吸附

mandatory
滚动结束后必须吸附到一个 Snap Point
```

还可以：

```css
scroll-snap-type: x proximity;
```

`proximity` 更宽松。

只有接近吸附点时才吸附。

---

## 3. mandatory 还是 proximity

### mandatory

适合：

- 产品卡片
- Story
- Gallery
- 分页感比较强的横向内容

### proximity

适合：

- 用户仍然需要自由滚动
- 吸附只是辅助效果

大多数卡片轮播感场景：

```css
mandatory
```

更加直观。

---

## 4. scroll-snap-align

本实验普通项目使用：

```css
.item {
  scroll-snap-align: start;
}
```

表示普通项目的左侧与滚动容器起始位置对齐。

最后一个项目单独使用：

```css
.item:last-child {
  scroll-snap-align: end;
}
```

原因是最后一个项目后方通常没有足够的滚动空间，如果仍强制使用 `start`，它可能无法真正移动到容器左侧。改为 `end` 后，末项会自然贴齐滚动容器结束位置。

还可以：

```css
center
end
```

例如居中式 Gallery：

```css
scroll-snap-align: center;
```

---

## 5. 为什么配合 Grid

本实验横向列表使用：

```css
.track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(300px, 50%);
}
```

意思：

```text
自动创建列
↓
所有 Item 横向排列
```

相比：

```css
display: flex;
```

两种都可以。

这里用 Grid 是为了更直接控制每一列宽度。

产品卡片桌面端使用约 `50%` 列宽，使一个视口大约展示两张卡片，并保留足够的横向滚动距离。相比原来的较窄卡片，这样更容易观察 Scroll Snap 的实际吸附过程。

---

## 6. 手机端露出下一张卡片

移动端：

```css
grid-auto-columns: 84%;
```

意味着每张卡片占滚动容器宽度的大约：

```text
84%
```

结果：

```text
[ 当前卡片 ][下一张露出一点]
```

这是一种很实用的视觉提示：

> 用户会自然意识到可以继续向右滑。

本实验采用三级列宽：

```text
桌面：约 50%
平板：约 58%
手机：84%
```

图片画廊则保持更大的单项宽度：

```text
桌面：78%
平板：86%
手机：92%
```

---

## 7. scroll-padding

如果容器两侧有：

```css
padding: 14px;
```

可以：

```css
scroll-padding-inline: 14px;
```

这样浏览器计算吸附位置时，也会考虑容器内边距。

否则卡片可能吸附得过于贴边。

---

## 8. overscroll-behavior

```css
overscroll-behavior-inline: contain;
```

尽量让横向滚动手势停留在当前组件中。

减少：

```text
滑到边缘后
继续影响外层页面
```

的体验问题。

---

## 9. scroll-snap-stop

可以：

```css
scroll-snap-stop: always;
```

意思是更强制地停在每一个吸附点。

但普通卡片列表通常不必这么强硬。

本实验保留：

```css
normal
```

让用户可以更自然地快速滑过多张卡片。

---

## 10. 桌面端如何操作

CSS Scroll Snap 基于原生滚动。

桌面端常见操作方式包括：

- 触控板横向手势
- 浏览器横向滚动条
- 部分系统或浏览器中的 `Shift + 鼠标滚轮`
- 触摸屏横向滑动

需要注意：

> 纯 CSS Scroll Snap 不会自动提供类似 Swiper 的“鼠标左键按住并拖拽卡片”交互。

如果项目明确要求鼠标拖拽、箭头、分页器、自动播放等完整轮播体验，应使用 JavaScript 或 Swiper，而不是继续堆叠 CSS。

---

## 11. Scroll Snap 和 Swiper 的最大区别

Scroll Snap 不是完整 Slider Library。

它更像：

> 给原生滚动增加“吸附规则”。

因此它没有自动提供：

- 前后箭头
- Pagination
- Autoplay
- Infinite Loop
- Slide Index
- Effect Fade
- Thumbs
- Controller
- Lazy Loading 管理

这些属于完整轮播系统的功能。

---

## 12. 什么时候优先 Scroll Snap

如果需求只是：

```text
用户横向浏览
+
手机滑动
+
停止后自动对齐
```

优先考虑：

```text
CSS Scroll Snap
```

例如：

- 产品卡片
- 新闻卡片
- Logo
- 客户案例
- 图片列表
- 推荐内容

代码非常少。

---

## 13. 什么时候使用 Swiper

如果需要：

```text
自动轮播
左右箭头
分页器
无限循环
多种动画
缩略图联动
复杂事件
```

就应该使用 Swiper。

不要为了“纯 CSS”而牺牲真正的产品需求。

---

## 14. Scroll Snap 与普通横向滚动

普通：

```css
overflow-x: auto;
```

用户停止在哪里就停在哪里。

加入：

```css
scroll-snap-type
```

以后：

```text
滚动停止
↓
自动对齐 Item
```

体验会更接近轮播。

---

## 15. 图片 Gallery

本实验第二个 Demo：

```text
大图
→
大图
→
大图
```

仍然完全使用原生滚动。

普通图片使用 `scroll-snap-align: start`，最后一张图片使用 `scroll-snap-align: end`，这样既保留前面项目的左侧吸附感，也避免末项因尾部空间不足而无法完成吸附。

它特别适合：

- 移动端案例图
- 产品细节图
- 项目图片
- Inspiration Gallery

---

## 16. 可访问性与原生滚动

Scroll Snap 的一个优势是：

> 它仍然是普通滚动区域。

浏览器原生支持：

- 触控板横向手势
- 横向滚动条
- 触屏滑动
- 键盘滚动
- 浏览器滚动惯性

没有把整个交互替换成复杂 JavaScript。

---

## 17. 不要隐藏滚动行为

如果完全隐藏：

```css
scrollbar-width: none;
```

用户有时不容易发现内容可以横向滚动。

所以真实项目可以考虑保留：

- 下一张露出
- 滚动条
- “Swipe” 提示
- 箭头

至少一种发现提示。

本实验使用：

```text
下一张露出
+
横向滑动提示
```

---

## 适用场景

- 产品卡片
- 新闻列表
- 博客推荐
- 图片 Gallery
- 案例展示
- Logo Wall
- 客户评价
- 移动端内容列表
- WooCommerce 推荐产品

---

## 实验结论

CSS Scroll Snap 的核心非常简单：

```text
overflow-x
+
scroll-snap-type
+
scroll-snap-align
```

可以把普通横向滚动升级成：

> 带吸附感的原生滑动组件。

最重要的选择原则：

```text
简单横向浏览
→ CSS Scroll Snap

复杂 Slider 功能
→ Swiper
```

实用性永远优先于“是否纯 CSS”。
