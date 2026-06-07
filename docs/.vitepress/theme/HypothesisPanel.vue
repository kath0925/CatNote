<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useData } from "vitepress";

const enabledPages = new Set([
  "software-engineering/1_introduction.md",
  "software-engineering/2_agile.md",
  "software-engineering/3_requirements.md",
]);

const { page } = useData();

const isEnabled = computed(() => enabledPages.has(page.value.relativePath));

function loadHypothesis() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector('script[src="https://hypothes.is/embed.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://hypothes.is/embed.js";
  script.async = true;
  document.body.appendChild(script);
}

onMounted(() => {
  if (isEnabled.value) {
    loadHypothesis();
  }
});

watch(isEnabled, (enabled) => {
  if (enabled) {
    loadHypothesis();
  }
});
</script>

<template>
  <section v-if="isEnabled" class="hypothesis-panel" aria-labelledby="hypothesis-title">
    <h2 id="hypothesis-title">Hypothesis 批注试用</h2>
    <p>
      本页试用 Hypothesis 批注功能，适合反馈不清楚的句子或补充理解。
    </p>
  </section>
</template>
