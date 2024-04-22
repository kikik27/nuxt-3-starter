<script setup>
import { useAuth } from "@/stores/auth";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";
import * as yup from "yup";

const route = useRoute();
const auth = useAuth();

const schema = yup.object().shape({
  password: yup
    .string()
    .min(
      8,
      ({ min }) => `Password harus terdiri dari setidaknya ${min} karakter`
    )
    .required("Password diperlukan"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password tidak cocok")
    .required("Konfirmasi Password diperlukan"),
});

const isReset = ref(false);

const { handleSubmit, defineField } = useForm({
  initialValues: {
    password: null,
    confirmPassword: null,
  },
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    token: route.query.token,
    password: values.password,
  };
  const res = await auth.resetPassword(payload);
  if (res.status === 200) {
    isReset.value = true;
  }
});
</script>
<template>
  <div
    class="h-screen w-screen bg-[url('/svg/auth/bg.svg')] bg-cover bg-center bg-no-repeat"
  >
    <div class="inline-flex h-full w-full items-center justify-center">
      <div
        class="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:m-12 md:w-96 md:p-8"
      >
        <form
          v-if="!isReset"
          class="flex h-full flex-col items-center justify-between space-y-6"
          method="POST"
          @submit.prevent="onSubmit"
        >
          <div class="space-y-1 text-center">
            <h5 class="text-3xl font-bold text-gray-900 dark:text-white">
              Atur Ulang Password
            </h5>
            <p class="font-sans text-base font-semibold text-gray-500">
              Masukkan password baru Anda.
            </p>
          </div>
          <InputPassword
            class="w-full"
            name="password"
            label="Password baru"
            :primary="true"
            placeholder="Masukkan password baru"
          />
          <InputPassword
            class="w-full"
            name="confirmPassword"
            label="konfirmasi Password"
            :primary="true"
            placeholder="Masukkan password baru"
          />
          <ButtonsSubmit
            class="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 sm:w-[197px]"
            label="Kirim"
            type="submit"
          />
        </form>

        <div
          v-else
          class="flex h-full flex-col items-center justify-between space-y-6"
        >
          <div class="space-y-1 text-center">
            <h5 class="text-3xl font-bold text-gray-900 dark:text-white">
              Password Anda Berhasil Diubah
            </h5>
            <p class="font-sans text-base font-semibold text-gray-500">
              Anda sekarang dapat menggunakan password baru anda untuk login.
            </p>
          </div>
          <img src="/svg/auth/resetPass.svg" alt="" />
          <NuxtLink
            to="/auth/login"
            class="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 sm:w-[197px]"
            >Kembali ke Login</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
