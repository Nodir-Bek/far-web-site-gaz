<script setup lang="ts">
import { AboutUsService } from "~/services/pages";

const { socialLinks } = baseStore();

definePageMeta({
  title: "menu-title-5",
  desc: "menu-title-5",
});
const { t } = useI18n();

const { data } = await AboutUsService.getAllData();
const aboutUs = computed(() => data?.value && data?.value[0]);

const communicationData = computed(() => [
  {
    title: t("phone_footer"),
    content: aboutUs.value?.phone,
  },
  {
    title: t("faks_footer"),
    content: aboutUs.value?.phone,
  },

  {
    title: t("e-mail-long"),
    content: aboutUs.value?.email,
  },
]);

const openLink = (link: string) => {
  window.open(link, "_blank");
};
</script>
<template>
  <div class="w-full">
    <NavigateBar />
    <UiContainer class="flex-col pt-[40px] pb-20 md:pb-[140px]">
      <div class="w-full flex flex-col gap-10 md:gap-[60px] xl:gap-24">
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#F6F6F6] p-5 sm:p-6 md:p-8"
        >
          <div class="w-full order-2 md:order-1">
            <CardImageMode
              path="/images/about_us_image.jpg"
              image-class="w-full h-[283px] xl:h-[472px] object-cover"
            />
          </div>
          <div
            class="w-full flex flex-col gap-6 justify-center items-center order-1 md:order-2"
          >
            <h1
              class="xl:max-w-[582px] text-18px xl:text-32px leading-[18px] xl:leading-10 font-bold text-[#172755] text-center px-5"
            >
              {{ $t("about_us_title") }}
            </h1>
            <p
              class="xl:max-w-[472px] text-sm xl:text-base text-secondary-text-color leading-25px font-medium text-center px-5"
            >
              {{ $t("about_us_desc") }}
            </p>
            <div
              class="flex flex-col gap-3 lg:gap-5 justify-center items-center"
            >
              <div v-for="(item, index) in communicationData" :key="index">
                <p
                  class="text-15px xl:text-base font-normal leading-4 text-secondary-text-color"
                >
                  {{ item.title }}:
                  <span
                    v-if="item.content !== 'fargona@hududgaz.uz'"
                    class="text-[#052939] ml-1"
                    >{{ item.content }}</span
                  >
                  <a
                    v-if="item.content === 'fargona@hududgaz.uz'"
                    :href="`mailto:${item.content}`"
                    class="text-[#20BDFF] ml-1"
                  >
                    {{ item.content }}
                  </a>
                </p>
              </div>

              <div class="w-full flex gap-5 justify-center items-center py-5">
                <div
                  v-for="link in socialLinks"
                  class="flex items-center justify-center w-[40px] h-[40px] bg-[#A1A4AA29] hover:bg-primary-color hover:text-white text-[#A1A4AA] transition-all rounded-full p-[7px] cursor-pointer"
                  @click="openLink(link.link)"
                >
                  <MyIcon :name="link.name" :is-footer="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            class="w-full flex flex-col gap-4 lg:gap-8 justify-center items-start"
          >
            <p
              class="text-18px xl:text-32px leading-10 font-bold text-main-text-color"
            >
              {{ $t("Bizning manzil") }}
            </p>
            <div class="flex items-center gap-3">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0009 13.4295C13.724 13.4295 15.1209 12.0326 15.1209 10.3095C15.1209 8.58633 13.724 7.18945 12.0009 7.18945C10.2777 7.18945 8.88086 8.58633 8.88086 10.3095C8.88086 12.0326 10.2777 13.4295 12.0009 13.4295Z"
                    stroke="#052939"
                    stroke-width="1.5"
                  />
                  <path
                    d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                    stroke="#052939"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
              <p
                class="text-15px xl:text-base font-medium leading-5 text-main-text-color"
              >
                {{ aboutUs?.address }}
              </p>
            </div>
            <div>
              <p
                class="text-15px xl:text-base font-medium leading-5 text-secondary-text-color"
              >
                {{ $t("work_period") }}:
                <span class="text-main-text-color ml-2">
                  {{ aboutUs?.working_time }}
                </span>
              </p>
              <div class="flex items-center gap-3">
                <p
                  v-for="(text, index) in $t('day_off').split(':')"
                  :key="text"
                  :class="
                    index === 0
                      ? 'text-secondary-text-color'
                      : 'text-main-text-color'
                  "
                  class="text-15px xl:text-base font-medium leading-5"
                >
                  {{ `${text} ${index === 0 ? ":" : ""}` }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0815776096147!2d71.7592864767948!3d40.391727071443675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb9cb491d9887f%3A0x457f57ae06c441a2!2sHududgaz%20Farg%CA%BBona!5e1!3m2!1suz!2s!4v1732945457188!5m2!1suz!2s"
              width="100%"
              height="363"
              style="border: 0"
              allowfullscreen
              :title="$t('site_title_long')"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
