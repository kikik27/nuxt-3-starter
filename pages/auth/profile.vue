<script setup>
import auth from "~/middleware/auth";
import { useAuth } from "@/stores/auth";
import * as yup from "yup";
import { useToast } from "vue-toast-notification";
import { useForm } from "vee-validate";

const toast = useToast();

const authStore = useAuth();
const modalReset = ref(false);
const userInfo = computed(() => authStore.user_data);
definePageMeta({
  middleware: auth,
});

const isUpload = ref(false);

const schemaPhoto = yup.object({
  photo: yup
    .mixed()
    .notRequired()
    .test("fileType", "Format file tidak sesuai ", (file) => {
      if (!file) return true;
      const supportedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      return supportedFileTypes.includes(file.type);
    })
    .test("fileSize", "Ukuran file terlalu besar", (file) => {
      if (!file) return true;
      const maxSizeInBytes = 1 * 1024 * 1024;
      return file.size <= maxSizeInBytes;
    })
    .label("Photo Profile"),
});

const handleUpdatePhotoProfile = async (event) => {
  isUpload.value = true;
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  schemaPhoto
    .validate({ photo: file })
    .then(async (valid) => {
      const res = await authStore.updateProfile(valid);
      if (res.status === 200) {
        isUpload.value = false;
      }
    })
    .catch((error) => {
      isUpload.value = false;
      toast.error(error.message, {
        dismissible: true,
        position: "top-right",
        duration: 2000,
        queue: true,
      });
    });
};

const handleModalReset = () => {
  modalReset.value = !modalReset.value;
};
</script>
<template>
  <NuxtLayout>
    <template #title> Profile </template>
    <template #body>
      <div class="relative">
        <div
          class="h-56 rounded-[20px] bg-gradient-to-br from-red-500 to-red-800 p-6 md:px-16"
        />
        <div
          class="absolute top-32 w-full items-center space-y-6 rounded-[20px] bg-white p-6 md:px-16"
        >
          <div
            class="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:items-end md:justify-between md:gap-6 md:text-left"
          >
            <div
              class="top-0 -mt-28 flex flex-col items-center gap-4 md:-mt-32 md:flex-row md:items-end md:gap-6"
            >
              <div class="flex items-center justify-center">
                <img
                  :src="
                    userInfo.photo
                      ? `${useRuntimeConfig().public.BASE_URL_PUBLIC}/${
                          userInfo.photo
                        }`
                      : '/image/placeholder.jpg'
                  "
                  :alt="userInfo.name"
                  class="h-32 w-32 rounded-[20px] border-4 border-white object-cover"
                />
                <label
                  v-if="!isUpload"
                  class="absolute flex h-32 w-32 items-center justify-center rounded-[20px] bg-black-100/30"
                  for="profile"
                >
                  <Icon name="tabler:edit" color="white" size="48px" />
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    id="profile"
                    class="hidden"
                    @change="handleUpdatePhotoProfile"
                  />
                </label>
                <span
                  v-else
                  class="absolute flex h-32 w-32 items-center justify-center rounded-[20px] bg-black-100/30"
                >
                  <Icon name="eos-icons:loading" color="white" size="48px" />
                </span>
              </div>
              <div>
                <h1 class="font-sans text-xl font-semibold md:text-3xl">
                  {{ userInfo.name }}
                </h1>
                <p
                  class="font-sans text-sm font-medium text-gray-500 md:text-base"
                >
                  {{ userInfo.email }}
                </p>
              </div>
            </div>
            <Buttons
              @click="handleModalReset"
              label="Ubah Password"
              class="rounded-lg border-2 border-primary p-2.5 font-sans font-semibold text-primary"
            />
          </div>
          <hr class="border border-b-2 border-gray-300" />
          <FormsProfileAdmin v-if="userInfo.role === 'admin'" />
          <FormsProfileUser v-else />
        </div>
      </div>
      <ModalCustom :show="modalReset" @close="handleModalReset">
        <template #title> Ubah Password </template>
        <template #subtitle
          >Password harus mengandung minimal 8 karakter.</template
        >
        <template #body>
          <FormsResetPassword @profile:update="handleModalReset" />
        </template>
      </ModalCustom>
    </template>
  </NuxtLayout>
</template>
<style></style>
