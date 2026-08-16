# 11 · Modal / Lightbox

CSS Development Lab 的第 11 个独立实验。

本实验研究网站中非常常见的 Modal 与 Lightbox。

重点使用原生：

```html
<dialog>
```

而不是从零重新实现一个浮层系统。

## 文件结构

```text
11-modal-lightbox/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   ├── gallery-01.svg
│   ├── close.svg
│   └── close-light.svg
└── README.md
```

## 实验目标

重点掌握：

- `<dialog>`
- `showModal()`
- `close()`
- `::backdrop`
- Top Layer
- Modal 内部滚动
- `max-height`
- `100dvh`
- 页面背景滚动锁定
- 点击遮罩关闭
- ESC 关闭
- Lightbox 图片大图
- 原生 Dialog 与传统 Modal 的区别

---

## 1. 为什么优先研究 dialog

传统 Modal 常见结构：

```html
<div class="overlay">
  <div class="modal">
  </div>
</div>
```

然后需要自己处理：

```text
position: fixed
z-index
overlay
ESC
焦点
页面层级
```

现代浏览器提供：

```html
<dialog>
```

并通过：

```js
dialog.showModal();
```

打开真正的模态窗口。

---

## 2. showModal() 与 show()

两者不同。

### show()

```js
dialog.show();
```

显示普通 Dialog。

它不会成为真正的 Modal。

### showModal()

```js
dialog.showModal();
```

会进入浏览器的：

```text
Top Layer
```

同时页面背景变成非交互区域。

对于真正 Modal：

> 优先使用 `showModal()`。

---

## 3. Top Layer

这是使用原生 Dialog 的重要优势。

传统浮层经常出现：

```text
Header z-index: 9999
Modal z-index: 999
```

结果：

> Header 反而盖在 Modal 上面。

原生 Modal Dialog 会进入浏览器 Top Layer。

所以它不是普通文档层级里的：

```text
z-index 比大小
```

这能明显减少浮层层级问题。

---

## 4. ::backdrop

原生 Dialog 可以直接：

```css
dialog::backdrop {
  background: rgba(0, 0, 0, .6);
}
```

还可以：

```css
backdrop-filter: blur(3px);
```

不需要额外创建：

```html
<div class="overlay"></div>
```

---

## 5. Modal 内部滚动

一个很常见的错误是：

```text
Modal 内容很长
↓
整个弹窗超出手机屏幕
↓
关闭按钮也滚出去了
```

本实验结构：

```text
Header
↓
Scrollable Body
↓
Footer
```

CSS：

```css
.modal-shell {
  display: grid;
  grid-template-rows:
    auto
    minmax(0, 1fr)
    auto;
}
```

中间：

```css
.modal-body {
  min-height: 0;
  overflow-y: auto;
}
```

这样：

- Header 固定
- Footer 固定
- 中间内容滚动

非常适合表单和说明内容。

---

## 6. 为什么使用 dvh

本实验：

```css
max-height: 86dvh;
```

移动浏览器地址栏会动态显示和隐藏。

`dvh` 比传统：

```css
100vh
```

更适合现代移动端动态视口。

---

## 7. 页面滚动锁定

虽然 Modal Dialog 本身负责模态交互，本实验仍然增加：

```css
body.has-modal {
  overflow: hidden;
}
```

避免背景页面在部分触控场景下继续产生滚动体验。

JavaScript 只负责同步：

```text
是否有 dialog.open
```

---

## 8. 点击遮罩关闭

`dialog` 元素本身包含：

```text
Dialog Box
+
Backdrop 点击区域
```

本实验通过：

```js
if (event.target === dialog) {
  dialog.close();
}
```

判断点击是否发生在 Dialog 内容外。

注意：

> 重要确认弹窗不一定应该允许点击背景关闭。

例如：

- 删除确认
- 支付确认
- 强制协议

应根据业务决定。

---

## 9. ESC 关闭

原生 Modal Dialog 自带：

```text
ESC → close
```

因此不需要像传统 Modal 那样额外监听：

```js
keydown
```

这是原生组件的一个实际优势。

---

## 10. Lightbox

Lightbox 本质也是 Modal。

只不过主体内容变成：

```text
大图
+
关闭按钮
```

本实验：

```html
<dialog class="lightbox-dialog">
  <img>
</dialog>
```

图片：

```css
.lightbox-image {
  max-width: 100%;
  max-height: 90dvh;
}
```

确保大图不会超出视口。

---

## 11. Modal 与 Drawer 的区别

### Modal

视觉：

```text
        ┌───────┐
页面    │ Modal │
        └───────┘
```

强调：

> 当前任务。

适合：

- 登录
- 表单
- 确认
- 图片
- 视频

### Drawer

视觉：

```text
页面 | Panel ←
```

强调：

> 从页面边缘展开的辅助区域。

适合：

- 导航
- 筛选
- Mini Cart
- 详情信息

两者不应该混为一谈。

---

## 12. 为什么不是所有弹层都用 position: fixed

传统：

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
}
```

仍然完全可以使用。

但如果需求就是标准 Modal：

> 原生 Dialog 往往可以减少自己重复实现浏览器已有能力的代码。

---

## 13. JavaScript 的职责

本实验 JavaScript 只负责：

```text
打开
关闭
同步 body 状态
点击 backdrop 关闭
```

不负责：

- 定位
- 尺寸
- 遮罩颜色
- 响应式
- 内容滚动
- Lightbox 图片尺寸

这些全部由 CSS 控制。

---

## 14. 适用场景

- B2B 询盘表单
- WooCommerce 快速查看
- 产品图片大图
- Gallery
- 视频播放
- 登录
- 注册
- 联系表单
- 删除确认
- 下载提示
- 重要通知

---

## 实验结论

现代 Modal 可以优先考虑：

```text
dialog
+
showModal()
+
::backdrop
+
CSS Grid
+
内部 overflow
```

核心原则仍然是：

```text
浏览器已经提供的能力
尽量不要重新造一遍

CSS
负责视觉和布局

JavaScript
只负责状态与行为
```
