<script lang="ts" setup>
const model = defineModel<string | number>();
const value = ref<string>("");

const props = defineProps({
  placeholder: {
    type: String,
    default: "search",
  },
  wrapperClass: {
    type: [String, Array],
    default: "max-[500px]:w-full sm:w-[248px] bg-white h-[40px]",
  },
  prependIcon: {
    type: Boolean,
    default: true,
  },
  inputClass: {
    type: [String, Array],
    default: "",
  },
});

const classList = computed(() => {
  const classes = Array.isArray(props.inputClass)
    ? props.inputClass
    : [props.inputClass];
  return [
    ...classes,
    props.prependIcon ? "pl-[42px] pr-[16px]" : "px-[16px]",
  ].filter(Boolean);
});


const handleIconClick = () => {
  model.value = "";
};

</script>

<template>
  <div class="flex items-center relative" :class="wrapperClass">
    <MyIcon
      v-if="prependIcon"
      name="SearchIcon"
      class="absolute left-[12px] text-[#C0C3C6] transition-all"
      :class="
        value.length > 3
          ? 'text-primary-color cursor-pointer'
          : 'cursor-not-allowed'
      "
    />
    <label class="sr-only" for="search-input">
      {{ placeholder }}
    </label>

    <input
      v-model="model"
      id="search-input"
      class="w-full h-full text-15px text-main-text-color leading-15px placeholder:text-[#C0C3C6] border border-[#E8E8E8] appearance-none focus:border-primary-color focus:ring-0 outline-none"
      :class="classList"
      :placeholder="placeholder"
    />
    <Icon
      v-if="model"
      @click="handleIconClick"
      class="cursor-pointer text-[16px] absolute right-2 text-brand-color"
      size="22px"
      name="material-symbols:close-rounded"
    />
  </div>
</template>
