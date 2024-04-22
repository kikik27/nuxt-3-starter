<script setup>
import { useAuth } from "@/stores/auth";
const authStore = useAuth();
const isLoading = computed(() => authStore.isLoading_data);
</script>
//
<NotFound class="!p-0" v-else>
//             <templat #title> Riwayat Tidak Ditemukan</templat>
//             <templat #subtitle
//               >Belum terdapat aktivitas Konseling Offline ataupun Konseling
//               Online yang telah selesai.</templat
//             >
//           </NotFound>
<template>
  <div class="w-full rounded-[20px] bg-white p-6">
    <div
      class="flex flex-col items-center justify-center gap-8 rounded-lg bg-gray-50 px-4 py-6 text-center md:py-12"
    >
      <div class="space-y-1" v-if="!isLoading">
        <h1 class="font-sans text-base font-semibold md:text-xl">
          <slot name="title"></slot>
        </h1>
        <p class="font-sans text-sm font-semibold text-gray-500">
          <slot name="subtitle"></slot>
        </p>
      </div>
      <svg
        v-if="isLoading"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
      >
        <g>
          <path fill="#D82E1D" d="M7 3H17V7.2L12 12L7 7.2V3Z">
            <animate
              id="eosIconsHourglass0"
              fill="freeze"
              attributeName="opacity"
              begin="0;eosIconsHourglass1.end"
              dur="1s"
              from="1"
              to="0"
            />
          </path>
          <path fill="#D82E1D" d="M17 21H7V16.8L12 12L17 16.8V21Z">
            <animate
              fill="freeze"
              attributeName="opacity"
              begin="0;eosIconsHourglass1.end"
              dur="1s"
              from="0"
              to="1"
            />
          </path>
          <path
            fill="#D82E1D"
            d="M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z"
          />
          <animateTransform
            id="eosIconsHourglass1"
            attributeName="transform"
            attributeType="XML"
            begin="eosIconsHourglass0.end"
            dur="0.1s"
            from="0 12 12"
            to="180 12 12"
            type="rotate"
          />
        </g>
      </svg>
      <img
        src="/svg/empty.svg"
        alt="empty"
        class="w-full max-w-[280px]"
        v-else
      />
    </div>
  </div>
</template>
