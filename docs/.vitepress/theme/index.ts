import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import FeedbackPanel from "./FeedbackPanel.vue";
import HypothesisPanel from "./HypothesisPanel.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => [h(HypothesisPanel), h(FeedbackPanel)],
    });
  },
};
