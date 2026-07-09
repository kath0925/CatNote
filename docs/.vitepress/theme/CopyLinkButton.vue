<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
let resetTimer: number | undefined;

function removeButton() {
  document.querySelector(".chapter-copy-link")?.remove();
}

function mountButton() {
  if (typeof document === "undefined") {
    return;
  }

  removeButton();

  const title = document.querySelector<HTMLElement>(".vp-doc h1");

  if (!title) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "chapter-copy-link";
  button.textContent = "复制链接";
  button.setAttribute("aria-label", "复制当前页面链接");

  button.addEventListener("click", async () => {
    if (typeof navigator === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    button.textContent = "已复制";

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.textContent = "复制链接";
    }, 1800);
  });

  title.appendChild(button);
}

async function refreshButton() {
  await nextTick();
  window.requestAnimationFrame(mountButton);
}

onMounted(refreshButton);

watch(() => route.path, refreshButton);

onUnmounted(() => {
  window.clearTimeout(resetTimer);
  removeButton();
});
</script>

<template></template>
