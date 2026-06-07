<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

async function copyCurrentLink() {
  if (typeof window === "undefined") {
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;

  window.setTimeout(() => {
    copied.value = false;
  }, 1800);
}

function openFeedback(kind: "error" | "improvement") {
  if (typeof window === "undefined") {
    return;
  }

  const subject =
    kind === "error" ? "CatNote 笔记错误反馈" : "CatNote 笔记改进建议";
  const body = `页面：${window.location.href}%0D%0A%0D%0A请在这里描述你的反馈：`;

  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
}
</script>

<template>
  <section class="feedback-panel" aria-labelledby="feedback-title">
    <div>
      <h2 id="feedback-title">这篇笔记有帮助吗？</h2>
      <p>你可以分享这篇笔记，或反馈错误帮助改进 CatNote。</p>
    </div>

    <div class="feedback-actions">
      <button type="button" class="feedback-button primary" @click="copyCurrentLink">
        {{ copied ? "已复制" : "复制链接" }}
      </button>
      <button type="button" class="feedback-button" @click="openFeedback('error')">
        反馈错误
      </button>
      <button type="button" class="feedback-button" @click="openFeedback('improvement')">
        提出改进
      </button>
    </div>
  </section>
</template>
