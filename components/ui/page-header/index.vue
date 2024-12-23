<script setup lang="ts">
const { filePath, fileName, customPrint, wrapperClass } = defineProps({
  label: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hideButton: {
    type: Boolean,
    default: false,
  },
  customPrint: {
    type: Boolean,
    default: false,
  },
  isUppercase: {
    type: Boolean,
    default: true,
  },
  titleFontSizeClass: {
    type: String,
    default:
      "text-18px leading-[1.6875rem] sm:text-20px sm:leading-26px lg:leading-28px",
  },
  wrapperClass: {
    type: [String, Array],
    default: "items-center",
  },
});

const wrapperClassList = computed(() => {
  const classes = Array.isArray(wrapperClass) ? wrapperClass : [wrapperClass];
  return [...classes, "w-full flex justify-between gap-[44px]"].filter(Boolean);
});

const emit = defineEmits(["downloadPDF"]);

const handleClick = () => {
  if (filePath) {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  } else {
    emit("downloadPDF");
  }
};

const printPage = () => {
  if (customPrint) {
    const printContent =
      document.getElementsByClassName("print-content")[0].innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.body.innerHTML = printContent;
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe); // Iframe ni olib tashlaymiz
  } else {
    window.print();
  }
};
</script>
<template>
  <div :class="wrapperClassList">
    <h3
      class="font-bold text-main-text-color"
      :class="[isUppercase ? 'uppercase' : '', titleFontSizeClass]"
    >
      {{ $t(label) }}
    </h3>

    <div v-if="!hideButton" class="hidden sm:flex gap-[24px]">
      <UiIconBtn
        customClasses="w-[36px] h-[36px] cursor-pointer"
        :onClick="handleClick"
      >
        <MyIcon name="DownloadIcon" />
      </UiIconBtn>
      <UiIconBtn
        :onClick="printPage"
        type="icon"
        customClasses="cursor-pointer w-[36px] h-[36px]"
      >
        <MyIcon name="PrinterIcon" size="18" />
      </UiIconBtn>
    </div>
  </div>
</template>
