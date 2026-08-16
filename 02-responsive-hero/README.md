# 02 · Hero Banner 左文右图响应式布局

CSS Development Lab 的第 02 个独立实验。

本实验围绕企业官网、产品站、Landing Page 中最常见的 Hero Banner 展开，重点研究如何用现代 CSS 构建稳定、简洁、可复用的“左文右图 / 手机端堆叠”布局。

## 实验目标

本章重点掌握：

- CSS Grid 双栏布局
- `minmax()` 在双栏中的作用
- `clamp()` 实现流式字号与间距
- `aspect-ratio` 控制图片容器比例
- `object-fit: cover` 控制图片裁切
- 桌面端与手机端布局切换
- 减少不必要的 Media Query
- 保持图片在加载前后的布局稳定
- Hero 结构如何复用到普通图文模块

## 文件结构

```text
02-responsive-hero/
├── index.html
├── css/
│   └── style.css
├── images/
│   └── hero-placeholder.svg
└── README.md
```

## 核心知识

### 1. Grid 双栏

```css
.hero-inner {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(360px, 0.92fr);
}
```

这种写法比固定宽度更稳定。

`minmax(0, 1fr)` 中的 `0` 很重要，可以避免内容过长时把 Grid 轨道撑破。

---

### 2. clamp() 流式响应式

```css
.hero h1 {
  font-size: clamp(2.7rem, 6vw, 6.3rem);
}
```

含义：

```text
最小值
↓
理想流式值
↓
最大值
```

这样字号会根据屏幕平滑变化，而不是只在几个断点突然跳变。

---

### 3. aspect-ratio

```css
.hero-image-wrap {
  aspect-ratio: 4 / 5;
}
```

通过固定容器比例，图片还没完全加载时浏览器也已经知道它应该占多大空间。

这能降低布局跳动。

---

### 4. object-fit

```css
.hero-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`cover` 表示：

> 保持图片比例并完全填满容器，必要时允许裁切。

如果改成：

```css
object-fit: contain;
```

图片会完整显示，但可能出现留白。

---

## 响应式策略

桌面端：

```text
文字 | 图片
```

中小屏：

```text
文字
图片
```

本实验只保留两个主要断点：

```css
@media (max-width: 960px)
@media (max-width: 640px)
```

其他字号、间距尽量依靠 `clamp()` 自适应。

---

## 为什么 Hero 值得单独做实验

Hero 是很多页面的第一屏。

常见场景包括：

- 企业官网首页
- B2B 产品网站
- SaaS Landing Page
- WooCommerce 首页
- 品牌专题页
- 活动页
- 产品详情介绍页

如果 Hero 的 Grid、图片比例和响应式处理方式掌握稳定，后面的普通图文 Section 通常可以直接复用相同思路。

---

## 维护方式

### 修改 Hero 文字

直接编辑 `index.html`：

- `.eyebrow`
- `h1`
- `.hero-desc`
- `.hero-actions`

### 替换图片

替换：

```text
images/hero-placeholder.svg
```

或者修改：

```html
<img src="images/your-image.jpg">
```

CSS 无需改变。

### 修改图片比例

桌面端：

```css
aspect-ratio: 4 / 5;
```

移动端：

```css
aspect-ratio: 4 / 3;
```

### 修改最大宽度

```css
:root {
  --page-max: 1200px;
}
```

---

## 适用场景

- 企业官网
- 产品官网
- WordPress 自定义主题
- WooCommerce 商城首页
- Landing Page
- 品牌介绍页
- 产品推广页
- 服务介绍页

---

## 后续扩展方向

真正项目需要时再扩展：

- Hero 视频背景
- 多图轮播
- 数据统计
- Logo Trust Bar
- 面包屑
- 视频弹窗
- 动态背景
- Scroll Indicator

本实验不加入这些功能，避免为了效果增加不必要复杂度。

---

## 实验结论

现代 Hero 不需要依赖复杂框架。

核心组合是：

```text
Grid
+
clamp()
+
aspect-ratio
+
object-fit
+
少量 Media Query
```

只要这几个知识点使用得当，就能构建稳定、现代、容易维护的响应式第一屏。
