import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";

const markdownTitle = (relativePath: string, fallback: string) => {
  try {
    const content = readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf-8");
    const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim();

    return title || fallback;
  } catch {
    return fallback;
  }
};

const wrapHeadingNumbers = (md: any) => {
  const defaultHeadingOpen = md.renderer.rules.heading_open;
  const defaultHeadingClose = md.renderer.rules.heading_close;
  const defaultText = md.renderer.rules.text;

  md.renderer.rules.heading_open = (tokens: any[], index: number, options: any, env: any, self: any) => {
    const level = Number(tokens[index].tag.slice(1));

    if (level >= 1 && level <= 3) {
      env.__catnoteHeadingNumber = { wrapped: false };
    }

    return defaultHeadingOpen
      ? defaultHeadingOpen(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
  };

  md.renderer.rules.text = (tokens: any[], index: number, options: any, env: any, self: any) => {
    const headingNumber = env.__catnoteHeadingNumber;
    const content = tokens[index].content;

    if (headingNumber && !headingNumber.wrapped && content.trim()) {
      headingNumber.wrapped = true;

      const match = content.match(/^(\d+(?:\.\d+)*\.?)(\s+)/);

      if (match) {
        const number = md.utils.escapeHtml(match[1]);
        const rest = md.utils.escapeHtml(content.slice(match[1].length));

        return `<span class="heading-number">${number}</span>${rest}`;
      }
    }

    return defaultText
      ? defaultText(tokens, index, options, env, self)
      : md.utils.escapeHtml(content);
  };

  md.renderer.rules.heading_close = (tokens: any[], index: number, options: any, env: any, self: any) => {
    delete env.__catnoteHeadingNumber;

    return defaultHeadingClose
      ? defaultHeadingClose(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
  };
};

export default defineConfig({
  title: "CatNote",
  description: "免费的技术文档笔记站",
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    math: true,
    config(md) {
      wrapHeadingNumbers(md);
    },
  },
  themeConfig: {
    nav: [
      { text: "Software Engineering", link: "/software-engineering/" },
      { text: "Java", link: "/java/" },
      { text: "Mathematics", link: "/mathematics/" },
    ],
    sidebar: {
      "/software-engineering/": [
        {
          text: "Software Engineering",
          items: [
            { text: "Overview", link: "/software-engineering/" },
            {
              text: markdownTitle("software-engineering/1_introduction.md", "Introduction"),
              link: "/software-engineering/1_introduction",
            },
            {
              text: markdownTitle("software-engineering/2_agile.md", "Agile Software Development"),
              link: "/software-engineering/2_agile",
            },
            {
              text: markdownTitle("software-engineering/3_requirements.md", "Requirements"),
              link: "/software-engineering/3_requirements",
            },
            {
              text: markdownTitle("software-engineering/object-oriented-design.md", "Object-Oriented Design"),
              link: "/software-engineering/object-oriented-design",
            },
            {
              text: markdownTitle("software-engineering/project-management.md", "Project Management"),
              link: "/software-engineering/project-management",
            },
          ],
        },
      ],
      "/java/": [
        {
          text: "Java",
          items: [{ text: "Overview", link: "/java/" }],
        },
      ],
      "/mathematics/": [
        {
          text: "Mathematics",
          items: [{ text: "Overview", link: "/mathematics/" }],
        },
      ],
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详细结果",
            resetButtonTitle: "清空搜索",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有找到相关结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "回车键",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "向上键",
              navigateDownKeyAriaLabel: "向下键",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc 键",
            },
          },
        },
      },
    },
    outline: {
      level: "deep",
      label: "本页目录",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    skipToContentLabel: "跳到正文",
    notFound: {
      title: "页面不存在",
      quote: "你访问的页面不存在，可能是链接已更新。",
      linkLabel: "返回首页",
      linkText: "返回首页",
    },
    socialLinks: [],
  },
});
