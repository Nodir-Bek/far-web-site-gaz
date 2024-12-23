export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    mounted(el, binding) {
      const tooltip = document.createElement("div");
      tooltip.textContent = binding.value;
      tooltip.className =
        "absolute z-50 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 transition-opacity duration-200 pointer-events-none";
      tooltip.style.position = "absolute";
      el.tooltip = tooltip;
      el.style.position = "relative";
      el.appendChild(tooltip);

      // Show tooltip
      el.addEventListener("mouseenter", () => {
        tooltip.style.opacity = 1;
        tooltip.style.transform = "translateY(-8px)";
      });

      // Hide tooltip
      el.addEventListener("mouseleave", () => {
        tooltip.style.opacity = 0;
        tooltip.style.transform = "translateY(0)";
      });

      // Position tooltip dynamically
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        tooltip.style.left = `${Math.min(
          e.clientX - rect.left - tooltipWidth / 2,
          rect.width - tooltipWidth - 8
        )}px`;
        tooltip.style.top = `${e.clientY - rect.top - 30}px`;
      });
    },
    unmounted(el) {
      if (el.tooltip) {
        el.tooltip.remove();
      }
    },
  });
});
