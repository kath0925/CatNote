<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
const container = ref<HTMLElement | null>(null);

function loadComments() {
  if (typeof document === "undefined" || !container.value) {
    return;
  }

  container.value.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("repo", "kath0925/CatNote");
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("label", "comment");
  script.setAttribute("theme", "preferred-color-scheme");

  container.value.appendChild(script);
}

onMounted(() => {
  loadComments();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    loadComments();
  },
);
</script>

<template>
  <section class="comments-panel" aria-labelledby="comments-title">
    <h2 id="comments-title">评论区</h2>
    <p>可以在这里补充理解、提问，或记录这一章的讨论。</p>
    <div ref="container" class="comments-panel-frame" />
  </section>
</template>
