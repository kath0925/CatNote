# Markdown 快捷键与常用语法

## 快捷键

| 功能 | Windows / Linux | macOS |
| --- | --- | --- |
| 自动续写 Markdown 列表 | `Enter` | `Enter` |
| 缩进 | `Tab` | `Tab` |
| 反向缩进 | `Shift + Tab` | `Shift + Tab` |
| 撤销 | `Ctrl + Z` | `Cmd + Z` |
| 重做 | `Ctrl + Y` / `Ctrl + Shift + Z` | `Cmd + Shift + Z` |
| 保存 | `Ctrl + S` | `Cmd + S` |
| 全选 | `Ctrl + A` | `Cmd + A` |
| 复制 | `Ctrl + C` | `Cmd + C` |
| 剪切 | `Ctrl + X` | `Cmd + X` |
| 粘贴 | `Ctrl + V` | `Cmd + V` |
| 查找 | `Ctrl + F` | `Cmd + F` |
| 替换 | `Ctrl + H` | `Cmd + Option + F` |
| 删除整行 | `Ctrl + Shift + K` | `Cmd + Shift + K` |
| 复制当前行 | `Shift + Alt + Up / Down` | `Shift + Option + Up / Down` |
| 移动当前行 | `Alt + Up / Down` | `Option + Up / Down` |
| 在下方插入新行 | `Ctrl + Enter` | `Cmd + Enter` |
| 在上方插入新行 | `Ctrl + Shift + Enter` | `Cmd + Shift + Enter` |
| 选中下一个相同词 | `Ctrl + D` | `Cmd + D` |
| 选中所有相同词 | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| 多光标点击 | `Alt + 鼠标点击` | `Option + 鼠标点击` |
| 行注释/取消注释 | `Ctrl + /` | `Cmd + /` |
| 格式化文档 | `Shift + Alt + F` | `Shift + Option + F` |
| 打开 Markdown 预览 | `Ctrl + Shift + V` | `Cmd + Shift + V` |
| 侧边打开 Markdown 预览 | `Ctrl + K` 后按 `V` | `Cmd + K` 后按 `V` |
| 查看所有快捷键 | `Ctrl + K` 后按 `Ctrl + S` | `Cmd + K` 后按 `Cmd + S` |

## 常用 Markdown 格式

标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
```

加粗：

```markdown
**加粗文字**
```

斜体：

```markdown
*斜体文字*
```

删除线：

```markdown
~~删除线文字~~
```

无序列表：

```markdown
- 项目一
- 项目二
  - 子项目
```

有序列表：

```markdown
1. 第一步
2. 第二步
3. 第三步
```

链接：

```markdown
[显示文字](https://example.com)
```

图片：

```markdown
![图片说明](image.png)
```

引用：

```markdown
> 这是一段引用
```

行内代码：

```markdown
使用 `print("hello")` 输出文本
```

代码块：

````markdown
```python
print("hello")
```
````

分割线：

```markdown
---
```

表格：

```markdown
| 姓名 | 年龄 |
|---|---:|
| 张三 | 20 |
| 李四 | 21 |
```

任务列表：

```markdown
- [x] 已完成
- [ ] 未完成
```

数学公式：

```markdown
行内公式：$E = mc^2$

块级公式：
$$
E = mc^2
$$
```

脚注：

```markdown
这是一个脚注示例[^1]

[^1]: 这是脚注内容
```

HTML 混用：

```markdown
<br>
<span style="color:red">红色文字</span>
```
