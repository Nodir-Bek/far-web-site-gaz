<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Props
defineProps({
  text: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "top", // 'top', 'bottom', 'left', 'right'
  },
});

// State
const isVisible = ref(false);
const tooltipClasses = ref("");
const tooltipRef = ref(null);
let parentElement = null; // Tooltipni parent element bilan bog'lash

// Tooltipni ko'rsatish funksiyalari
const showTooltip = () => {
  isVisible.value = true;
  updateTooltipPosition();
};
const hideTooltip = () => {
  isVisible.value = false;
};

// Tooltip joylashuvini hisoblash
const updateTooltipPosition = () => {
  if (!parentElement || !tooltipRef.value) return;

  const parentRect = parentElement.getBoundingClientRect();
  const tooltipRect = tooltipRef.value.getBoundingClientRect();

  let styles = {};
  switch (props.position) {
    case "top":
      styles = {
        left: `${
          parentRect.left + parentRect.width / 2 - tooltipRect.width / 2
        }px`,
        top: `${parentRect.top - tooltipRect.height - 8}px`,
      };
      break;
    case "bottom":
      styles = {
        left: `${
          parentRect.left + parentRect.width / 2 - tooltipRect.width / 2
        }px`,
        top: `${parentRect.bottom + 8}px`,
      };
      break;
    case "left":
      styles = {
        left: `${parentRect.left - tooltipRect.width - 8}px`,
        top: `${
          parentRect.top + parentRect.height / 2 - tooltipRect.height / 2
        }px`,
      };
      break;
    case "right":
      styles = {
        left: `${parentRect.right + 8}px`,
        top: `${
          parentRect.top + parentRect.height / 2 - tooltipRect.height / 2
        }px`,
      };
      break;
  }

  tooltipRef.value.style.left = styles.left;
  tooltipRef.value.style.top = styles.top;
};

// Tooltipni parent element bilan bog'lash
onMounted(() => {
  parentElement = tooltipRef.value?.parentElement;

  if (parentElement) {
    parentElement.addEventListener("mouseenter", showTooltip);
    parentElement.addEventListener("mouseleave", hideTooltip);
    parentElement.addEventListener("focus", showTooltip);
    parentElement.addEventListener("blur", hideTooltip);
  }

  window.addEventListener("resize", updateTooltipPosition);
});

// Tooltipni tozalash
onBeforeUnmount(() => {
  if (parentElement) {
    parentElement.removeEventListener("mouseenter", showTooltip);
    parentElement.removeEventListener("mouseleave", hideTooltip);
    parentElement.removeEventListener("focus", showTooltip);
    parentElement.removeEventListener("blur", hideTooltip);
  }

  window.removeEventListener("resize", updateTooltipPosition);
});
</script>

<template>
  <div
    ref="tooltipRef"
    v-show="isVisible"
    class="fixed bg-gray-800 text-white text-sm rounded px-3 py-1 shadow-md z-50 transition-opacity duration-200"
    style="position: fixed"
  >
    {{ text }}
  </div>
</template>

<style scoped>
/* Tooltip uchun animatsiyalar */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
