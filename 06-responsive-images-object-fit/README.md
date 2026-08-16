# 06 · 图片展示与 object-fit

CSS Development Lab 的第 06 个独立实验。

本实验专门研究网站开发中最常见的图片显示问题：

- 产品图为什么被裁切？
- Logo 为什么不能使用 `cover`？
- Banner 如何控制保留左边还是右边？
- 人物头像如何保持圆形？
- 不同尺寸图片怎样统一显示比例？

## 实验目标

重点掌握：

- `aspect-ratio`
- `object-fit`
- `object-position`
- `overflow: hidden`
- `width: 100%`
- `height: 100%`
- 图片容器与图片本身的职责区别
- `cover` 与 `contain` 的真实应用场景
- 产品图、Logo、头像、Banner 的不同处理方式

## 文件结构

```text
06-responsive-images-object-fit/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── product-scene.svg
│   ├── logo-mark.svg
│   ├── portrait.svg
│   └── banner-scene.svg
└── README.md
```

---

## 核心原则

不要只给图片写：

```css
img {
  width: 100%;
}
```

更稳定的思路是：

```text
先定义图片容器
↓
确定容器比例
↓
让图片填充容器
↓
最后决定是否允许裁切
```

---

## 1. cover

```css
.media {
  aspect-ratio: 4 / 3;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

`cover` 的目标是：

> 让图片完整填满容器。

代价是：

> 图片边缘可能被裁切。

适合：

- 新闻封面
- 博客缩略图
- 产品卡片
- 案例图片
- Hero 图片
- Gallery

---

## 2. contain

```css
.logo img {
  object-fit: contain;
}
```

`contain` 的目标是：

> 保证整张图片完整显示。

代价是：

> 容器内可能出现留白。

适合：

- Logo
- 图标
- 包装图
- 证书
- 某些电商产品主图
- 必须完整展示的视觉素材

---

## 3. cover 与 contain 如何选择

可以简单理解为：

```text
cover
优先保证“容器完整”

contain
优先保证“图片完整”
```

没有谁更高级。

完全取决于具体场景。

---

## 4. aspect-ratio

```css
.media {
  aspect-ratio: 4 / 3;
}
```

常见比例：

```text
1 / 1   正方形
4 / 3   产品、案例
3 / 2   摄影
16 / 9  视频、Banner
3 / 4   人像
```

相比手工写固定高度：

```css
height: 320px;
```

`aspect-ratio` 更适合响应式页面。

---

## 5. object-position

默认：

```css
object-position: 50% 50%;
```

等价于：

```css
object-position: center;
```

如果人物或产品主体位于图片右侧：

```css
object-position: 78% center;
```

也可以使用：

```css
object-position: top;
object-position: left;
object-position: right;
object-position: bottom;
```

它不会改变图片尺寸，只改变裁切时的视觉焦点。

---

## 6. Banner 为什么经常需要 object-position

Banner 通常比例很宽：

```text
16:9
2:1
21:9
```

手机端容器比例又可能变成：

```text
4:3
```

使用：

```css
object-fit: cover;
```

后必然发生裁切。

此时如果主体不在图片中心，就应该调整：

```css
object-position
```

否则可能把产品、人脸、建筑主体直接裁掉。

---

## 7. Logo 为什么通常不用 cover

Logo 是一个完整视觉标识。

如果：

```css
object-fit: cover;
```

可能发生：

```text
Logo 左右被裁掉
Logo 上下被裁掉
品牌文字消失
```

所以 Logo 更适合：

```css
object-fit: contain;
```

并配合一定：

```css
padding
```

给 Logo 留出呼吸空间。

---

## 8. 头像怎么处理

常见写法：

```css
.avatar {
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

如果人物脸部偏上：

```css
object-position: center 30%;
```

比直接缩放图片更合理。

---

## 常见错误

### 错误 1：直接拉伸图片

```css
img {
  width: 100%;
  height: 300px;
}
```

如果没有：

```css
object-fit
```

图片可能直接变形。

---

### 错误 2：所有图片统一 cover

产品场景图可以。

Logo、证书、包装图通常不适合。

---

### 错误 3：所有图片统一 contain

这样虽然不会裁切，但大量卡片可能出现不一致的留白。

---

### 错误 4：只调整图片，不定义容器

更好的思路是：

```text
容器定义布局
图片适配容器
```

---

## 适用场景

- WooCommerce 产品图片
- 企业官网产品卡片
- WordPress Featured Image
- 新闻缩略图
- 博客图片
- Logo Wall
- 团队成员头像
- Hero Banner
- Gallery
- 案例展示
- 视频封面

---

## 维护方式

### 修改图片比例

```css
aspect-ratio: 4 / 3;
```

### 修改填充方式

```css
object-fit: cover;
```

或：

```css
object-fit: contain;
```

### 修改视觉焦点

```css
object-position: 70% center;
```

### 替换真实图片

只需替换：

```html
<img src="images/your-image.jpg">
```

不需要改变整个布局结构。

---

## 实验结论

处理图片时最值得记住的是这一套判断：

```text
这张图能不能裁？

能
↓
cover

不能
↓
contain
```

如果使用 `cover`：

```text
主体在哪里？
↓
object-position
```

再配合：

```text
aspect-ratio
```

就能解决绝大多数网站图片展示问题。
