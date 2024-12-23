<script lang="ts" setup>
const { aboutData } = defineProps({
  aboutData: Object,
});
const { socialLinks } = baseStore();
const { t } = useI18n();

const openLink = (link: string) => {
  window.open(link, "_blank");
};

const addressData = computed(() => [
  `${t("work_period")}: ${aboutData?.working_time}`,
  `${t("day_off")} `,
  aboutData?.address,
]);
const communicationData = computed(() => [
  `${t("faks_footer")} : ${aboutData?.phone}`,
  `${t("phone_footer")}: ${aboutData?.phone}`,
  `${t("e-mail-long")}: ${aboutData?.email}`,
]);
</script>
<template>
  <section
    :class="accessibilityMode().noImage ? 'no__image' : 'footer-section'"
    class="w-full relative print:hidden bg-no-repeat bg-center bg-cover"
  >
    <UiContainer
      class="flex-col gap-[20px] sm:gap-[30px] lg:gap-[px] pt-[60px] pb-[24px] sm:pt-[40px] sm:pb-[16px] lg:pt-[80px] lg:pb-[18px]"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[24px]">
        <div class="w-full flex flex-col gap-[20px] select-none max-w-[251px]">
          <div
            class="font-bold text-15px leading-15px lg:text-base lg:leading-[24px] text-white uppercase"
          >
            {{ $t("footer_addres_key") }}
          </div>
          <div
            class="flex flex-col justify-center items-start w-full gap-3 lg:gap-4 text-white"
          >
            <span
              v-for="address in addressData"
              :key="address"
              class="font-normal text-15px leading-15px lgtext-base lg:leading-4"
            >
              {{ address }}
            </span>
          </div>
        </div>

        <div class="w-full flex flex-col gap-[16px] order-2 ld:order-2">
          <div class="flex flex-col md:gap-[24px] gap-[16px] select-none">
            <div
              class="font-bold md:text-base md:leading-[16px] text-sm leading-[14px] text-white uppercase"
            >
              {{ $t("footer_connect_key") }}
            </div>
            <div
              class="flex flex-col justify-center items-start w-full gap-4 text-white"
            >
              <span
                v-for="items in communicationData"
                :key="items"
                class="font-normal text-15px leading-15px lgtext-base lg:leading-4"
              >
                {{ items }}
              </span>
            </div>
            <div class="flex justify-start items-center gap-3">
              <div
                v-for="link in socialLinks"
                class="flex items-center justify-center w-[28px] h-[28px] bg-[#FFFFFF29] hover:bg-primary-color text-white transition-all rounded-full p-[7px] cursor-pointer"
                @click="openLink(link.link)"
              >
                <MyIcon :name="link.name" :is-footer="true" />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col gap-[16px] order-2 ld:order-2">
          <div
            class="flex flex-col lg:items-end md:gap-[24px] gap-[16px] select-none"
          >
            <div
              class="max-w-[332px] w-full font-bold md:text-base md:leading-[16px] text-sm leading-[14px] text-white uppercase text-left"
            >
              {{ $t("site_title") }}
            </div>

            <div
              style="position: relative; overflow: hidden"
              class="w-full max-w-[332px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0815776096147!2d71.7592864767948!3d40.391727071443675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb9cb491d9887f%3A0x457f57ae06c441a2!2sHududgaz%20Farg%CA%BBona!5e1!3m2!1suz!2s!4v1732945457188!5m2!1suz!2s"
                width="100%"
                height="163"
                style="border: 0"
                allowfullscreen
                :title="$t('site_title_long')"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full flex flex-wrap md:flex-nowrap flex-col sm:flex-row justify-between items-center gap-6 border-t-[1px] border-[#FFFFFF]/10 pt-[12px]"
      >
        <div
          class="copyright w-full md:w-auto flex justify-start gap-[8px] items-center"
        >
          <Icon name="lucide:copyright" size="20" class="text-white" />
          <div
            class="text-white lg:text-14px lg:leading-14px text-[0.75rem] leading-[0.75rem] font-normal"
          >
            {{ $t("site_title_long") }}
          </div>
        </div>
        <div
          class="w-full md:w-fit flex justify-between md:justify-start items-center gap-2 text-white"
        >
          <span
            class="pr-2 lg:text-14px lg:leading-14px text-[0.75rem] leading-[0.75rem] font-normal"
          >
            Developed by:
          </span>
          <div class="flex justify-center items-center gap-2">
            <img
              src="/images/premiumsoft.png"
              alt="logo.png"
              class="w-[26px] h-[26px]"
            />
            <span
              class="text-white font-normal lg:text-14px lg:leading-14px text-[0.75rem] leading-[0.75rem]"
            >
              Premium<b>Soft</b>
            </span>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<style lang="css" scoped>
.footer-section::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(3, 14, 43, 0.8);
  z-index: -1;
}
.footer-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/bg/footer-bg.png");
  background-repeat: no-repeat;
  background-position: top, center;
  z-index: -2;
  background-size: cover;
}
@media screen and (max-width: 640px) {
  .footer-section::before {
    background-size: cover;
    background-position: top, center;
    background-repeat: no-repeat;
  }
}
.no__image {
  position: relative;
}
.no__image::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #ace4df 0%, #ef7f1a 100%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
