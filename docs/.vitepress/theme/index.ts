import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import CommentsPanel from "./CommentsPanel.vue";
import CopyLinkButton from "./CopyLinkButton.vue";
import HypothesisPanel from "./HypothesisPanel.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(CopyLinkButton),
      "doc-after": () => [h(HypothesisPanel), h(CommentsPanel)],
    });
  },
};
