<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { useAuth } from "~/stores/auth";

const authStore = useAuth();
const dropdownProject = ref(false);
const dropdownUser = ref(false);
const pathProject = ["/category", "project", "/task"];
const pathUser = ["/user", "/position"];
const router = useRouter();

const handleProject = () => {
  dropdownProject.value = !dropdownProject.value;
};

const handleUser = () => {
  dropdownUser.value = !dropdownUser.value;
};

const userInfo = computed(() => authStore.user_data);
const role = computed(() => authStore.user_data.role);
const Sidebar = [
  {
    link: "/dashboard",
    icon: "iconamoon:home",
    title: "Dashboard",
    role: ["student", "teacher", "admin"],
  },
  {
    link: "/appointment",
    icon: "uiw:date",
    title: "Pertemuan",
    role: ["student", "teacher"],
  },
  {
    link: "/counseling",
    icon: "teenyicons:users-outline",
    title: "Konseling",
    role: ["student", "teacher"],
  },
  {
    link: "/teacher",
    icon: "ph:chalkboard-teacher",
    title: "Guru",
    role: ["admin"],
  },
  {
    link: "/student",
    icon: "ph:student",
    title: "Siswa",
    role: ["admin"],
  },
  {
    link: "/history",
    icon: "iconamoon:history",
    title: "Riwayat",
    role: ["student", "teacher", "admin"],
  },
];

onMounted(() => {
  initFlowbite();
  dropdownProject.value = pathProject.some((path) =>
    window.location.pathname.includes(path)
  );
  dropdownUser.value = pathUser.some((path) =>
    window.location.pathname.includes(path)
  );
});

const roleHandler = (role) => {
  switch (role) {
    case "student":
      return "Siswa";
    case "teacher":
      return "Guru";
    default:
      return role;
  }
};
</script>
<template>
  <div class="h-full min-h-screen bg-backgroundPage">
    <aside
      id="logo-sidebar"
      class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full rounded-r-[28px] bg-gradient-to-br from-red-500 to-red-800 shadow-2xl transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div
        class="flex h-full flex-col justify-between overflow-y-auto rounded-r-[28px] bg-gradient-to-br from-red-500 to-red-800 px-3 pb-4"
      >
        <ul class="space-y-3 font-medium">
          <li class="flex items-center justify-center py-5">
            <div class="flex flex-col items-center justify-center gap-4 pt-10">
              <div class="relative">
                <img
                  :src="
                    userInfo.photo
                      ? `${useRuntimeConfig().public.BASE_URL_PUBLIC}/${
                          userInfo.photo
                        }`
                      : '/image/placeholder.jpg'
                  "
                  :alt="userInfo.name"
                  width="119"
                  class="h-32 w-32 rounded-[40px] rounded-br-[12px] object-cover"
                />
                <NuxtLink
                  to="/auth/profile"
                  class="absolute bottom-0 right-0 -mb-2 -mr-2 rounded-lg bg-red-200 p-2"
                >
                  <Icon name="tabler:edit" color="red" size="24px" />
                </NuxtLink>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-1 text-center capitalize"
              >
                <p class="font-sans text-xl font-extrabold text-white">
                  {{ userInfo.name }}
                </p>
                <p class="font-sans text-base font-semibold text-white">
                  {{ roleHandler(userInfo.role) }}
                  <span class="uppercase">
                    - {{ userInfo.class ? userInfo.class : "BK" }}</span
                  >
                </p>
              </div>
            </div>
          </li>
          <li v-for="item in Sidebar" :key="item">
            <NuxtLink
              v-if="item.role && item.role.includes(userInfo.role)"
              class="group flex items-center rounded-lg p-2.5 text-white hover:bg-white hover:text-primary"
              :to="item.link"
            >
              <Icon :name="item.icon" size="25px" />
              <span class="poppins-semibold pl-6 font-bold">{{
                item.title
              }}</span>
            </NuxtLink>
          </li>
        </ul>
        <ul class="space-y-3 font-medium">
          <li>
            <button
              @click="authStore.logout()"
              class="group flex w-full items-center rounded-lg p-2.5 text-white hover:bg-white hover:text-primary"
            >
              <Icon name="solar:logout-2-broken" size="25px" />
              <span class="poppins-semibold ms-3 pl-6 font-bold">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
    <div class="h-full min-h-screen overflow-y-auto p-4 sm:ml-64">
      <div class="p-4">
        <div class="space-y-6">
          <div class="flex flex-row gap-4">
            <div
              class="flex w-full items-center gap-2 rounded-lg bg-red-50 px-3 py-2 shadow md:px-5 md:py-4"
            >
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center rounded-lg p-2 text-sm text-primary sm:hidden"
              >
                <svg
                  class="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <h1 class="font-sans text-2xl font-semibold text-gray-700">
                <slot name="title"></slot>
              </h1>
            </div>
          </div>

          <!-- Dropdown menu -->

          <div class="space-y-6">
            <slot name="body"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
li .router-link-active {
  background-color: white;
  color: #d82e1d !important;
}
</style>
~/socket/notifications ~/composables/notifications
