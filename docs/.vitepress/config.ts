import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CatNote",
  description: "Free technical documentation notes",
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    math: true,
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
            { text: "Introduction", link: "/software-engineering/introduction" },
            { text: "Agile Software Development", link: "/software-engineering/agile" },
            { text: "Requirements", link: "/software-engineering/requirements" },
            { text: "Object-Oriented Design", link: "/software-engineering/object-oriented-design" },
            { text: "Project Management", link: "/software-engineering/project-management" },
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
    },
    outline: {
      level: "deep",
      label: "On this page",
    },
    socialLinks: [],
  },
});
