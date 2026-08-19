# 18 · Fluid Responsive Design 流体响应式设计

CSS Development Lab 的第 18 个独立实验。

本实验研究一个非常实用的响应式方向：

> 不是所有变化都需要 Media Query。

很多尺寸可以在：

```text
最小值
↓
理想流体值
↓
最大值
```

之间连续变化。

## 文件结构

```text
18-fluid-responsive-design/
├── index.html
├── css/
│   └── style.css
└── README.md
```

## 实验目标

重点掌握：

- `clamp()`
- `min()`
- `max()`
- `vw`
- 流体字号
- 流体间距
- 流体容器宽度
- 流体按钮尺寸
- CSS 自定义属性
- Fluid Design 与 Media Query 的边界

---

# 1. 传统响应式的常见问题

传统方式：

```css
.title {
  font-size: 36px;
}

@media (max-width: 1024px) {
  .title {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 22px;
  }
}
```

结果是：

```text
1025px
→ 36px

1024px
→ 突然 30px
```

尺寸在断点处发生明显跳变。

如果一个页面有很多：

- 字号
- Padding
- Gap
- Section Space

CSS 很快会堆满 Media Query。

---

# 2. clamp()

语法：

```css
clamp(
  最小值,
  理想值,
  最大值
)
```

例如：

```css
font-size:
  clamp(2rem, 6vw, 5rem);
```

意思：

```text
最小不能低于 2rem

中间根据 6vw 流体变化

最大不能超过 5rem
```

---

# 3. 为什么不能直接只用 vw

例如：

```css
font-size: 6vw;
```

问题：

```text
超大屏
→ 字体可能巨大

超小屏
→ 字体可能太小
```

所以更合理：

```css
font-size:
  clamp(2rem, 6vw, 5rem);
```

`vw` 负责流体变化。

`clamp()` 负责限制上下限。

---

# 4. 流体字号

本实验：

```css
--title-xl:
  clamp(2.8rem, 7.2vw, 6.4rem);
```

页面从手机逐渐变宽时：

```text
2.8rem
↓
连续增长
↓
6.4rem
```

而不是：

```text
手机字号
平板字号
桌面字号
```

三个离散档位。

---

# 5. 流体间距

Section 常见写法：

```css
padding: 120px 0;
```

然后手机：

```css
padding: 70px 0;
```

可以改为：

```css
padding-block:
  clamp(64px, 10vw, 132px);
```

页面越宽：

> Section 间距自然增加。

但始终有上下限。

---

# 6. 流体 Card Padding

例如：

```css
--space-card:
  clamp(20px, 3.5vw, 36px);
```

Card 在手机：

```text
约 20px
```

桌面：

```text
逐渐增加
```

最大：

```text
36px
```

不用额外写多个断点。

---

# 7. min()

语法：

```css
min(A, B)
```

浏览器选择：

> 两个值里更小的一个。

非常经典的页面容器：

```css
.page-wrap {
  width:
    min(100% - 32px, 1200px);
}
```

意思：

```text
小屏
→ 使用可用宽度

大屏
→ 最大 1200px
```

这比：

```css
width: 100%;
max-width: 1200px;
```

在某些表达中更加紧凑。

---

# 8. 页面容器的实用写法

本实验：

```css
.page-wrap {
  width:
    min(
      calc(100% - var(--space-page) * 2),
      1200px
    );

  margin-inline: auto;
}
```

结果：

```text
手机
→ 保留左右安全边距

桌面
→ 最大宽度 1200px

超大屏
→ 内容不会无限拉宽
```

---

# 9. max()

语法：

```css
max(A, B)
```

浏览器选择：

> 两个值里更大的一个。

例如：

```css
min-height:
  max(44px, 3vw);
```

意思：

```text
按钮尺寸可以随屏幕变化

但是
永远不能低于 44px
```

---

# 10. 为什么 max() 对按钮有价值

如果完全使用：

```css
height: 3vw;
```

在手机上可能变得很小。

加入：

```css
max(44px, 3vw)
```

相当于设置：

> 可点击区域最低保护值。

---

## Demo 中的尺寸一致性

页面中的 `max()` 示例与实际按钮统一使用：

```css
min-height: max(44px, 3vw);
```

下方 Small / Medium / Large 三条尺寸条只用于直观看出不同宽度档位，因此分别使用 `58% / 78% / 100%`。它们不再额外叠加一个会被覆盖的 `clamp()` 宽度规则，避免出现“源码写了流式宽度但实际没有生效”的教学歧义。

---

# 11. clamp / min / max 的简单记忆

## clamp()

```text
我要一个范围
```

例如：

- 字号
- Padding
- Gap
- Section Space

---

## min()

```text
不能超过某个尺寸
```

例如：

- 页面最大宽度
- 图片最大宽度
- Modal 宽度

---

## max()

```text
不能低于某个尺寸
```

例如：

- 按钮高度
- 点击区域
- 最低 Padding

---

# 12. Fluid Design 不等于没有断点

这是非常重要的一点。

如果：

```text
桌面
图片 | 文字

手机
图片
文字
```

这不是简单尺寸变化。

而是：

> Layout Mode 改变。

这时 Media Query 更清晰：

```css
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

不要为了“零 Media Query”而把 CSS 写得难以理解。

---

# 13. 哪些最适合 Fluid

特别适合：

```text
font-size
padding
margin
gap
section spacing
container width
button padding
border-radius
```

这些本来就适合连续变化。

---

# 14. 哪些更适合 Media Query

例如：

```text
2 Column
→
1 Column
```

```text
Desktop Navigation
→
Mobile Drawer
```

```text
Sidebar
→
隐藏 / 移动到底部
```

这些属于：

> 结构变化。

继续使用 Media Query。

---

# 15. Fluid + Media Query

最实用的方式不是二选一。

而是：

```text
尺寸
↓
Fluid CSS

结构
↓
Media Query
```

例如：

```css
.section {
  padding-block:
    clamp(4rem, 9vw, 8rem);
}

@media (max-width: 768px) {
  .section-grid {
    grid-template-columns: 1fr;
  }
}
```

这种代码通常会非常清晰。

---

# 16. Fluid + Container Query

还可以进一步：

```text
页面级结构
→ Media Query

组件级结构
→ Container Query

字号 / 间距
→ Fluid CSS
```

三者各自处理自己最擅长的问题。

这是现代响应式布局非常清晰的分层方式。

---

# 17. CSS Variables

如果大量地方都使用流体尺寸，可以：

```css
:root {
  --space-section:
    clamp(4rem, 9vw, 8rem);

  --space-card:
    clamp(1.25rem, 3vw, 2.25rem);

  --title-xl:
    clamp(2.5rem, 7vw, 6rem);
}
```

然后：

```css
.section {
  padding-block:
    var(--space-section);
}
```

整个网站的尺度体系会更加统一。

---

# 18. 为什么这对企业官网特别实用

企业官网常见：

```text
Hero
Section
Cards
Products
Cases
CTA
Footer
```

过去经常：

```text
桌面间距 120px
平板 90px
手机 60px
```

每个模块重复写。

使用：

```css
clamp()
```

以后可以建立统一的：

```text
Fluid Spacing Scale
```

减少大量重复 Media Query。

---

# 19. 常见错误：流体值没有边界

不推荐：

```css
font-size: 8vw;
padding: 6vw;
```

因为：

> 没有上下限。

更推荐：

```css
font-size:
  clamp(2rem, 8vw, 6rem);

padding:
  clamp(1rem, 6vw, 4rem);
```

---

# 20. 常见错误：公式太复杂

例如为了追求数学精确，写出非常长的：

```css
calc(...)
```

虽然正确，但后期很难记忆维护。

对于多数企业网站：

```css
clamp(
  reasonable-min,
  simple-vw,
  reasonable-max
)
```

已经足够实用。

CSS Lab 的原则仍然是：

> 易懂、易记、易维护优先。

---

# 21. 推荐的实际组合

例如：

```css
:root {
  --title-xl:
    clamp(2.8rem, 7vw, 6rem);

  --title-md:
    clamp(2rem, 4vw, 4rem);

  --section-space:
    clamp(4rem, 9vw, 8rem);

  --card-space:
    clamp(1.25rem, 3vw, 2.25rem);
}
```

就能覆盖大量页面需求。

---

# 22. 适用场景

- 企业官网
- WooCommerce
- 产品页
- Landing Page
- Hero
- Card Grid
- Blog
- Portfolio
- Dashboard
- 响应式组件库

---

# 实验结论

现代响应式设计可以按三层理解：

```text
页面结构变化
↓
Media Query

组件结构变化
↓
Container Query

尺寸连续变化
↓
clamp / min / max
```

最重要的原则：

> 不要为了响应式而不断增加断点。

如果一个值本来就可以连续变化，

优先考虑：

```css
clamp()
min()
max()
```

这样 CSS 往往更短、更自然，也更容易长期维护。
