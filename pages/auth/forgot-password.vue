<script setup>
import { useAuth } from "@/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";

const auth = useAuth();

const schema = yup.object({
  email: yup
    .string()
        .email("Email tidak valid")
    .required((data) => `${data.label} wajib diisi`)
    .label("Email"),
});

const { handleSubmit, defineField } = useForm({
  initialValues: {
    email: null,
  },
  validationSchema: schema,
});

const sendMail = ref(false);

const onSubmit = handleSubmit(async (values) => {
  const res = await auth.forgotPassword(values);
  if (res.status === 201) {
    sendMail.value = true;
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
          v-if="!sendMail"
          class="flex h-64 flex-col items-center justify-between space-y-2"
          method="POST"
          @submit.prevent="onSubmit"
        >
          <div class="space-y-2 text-center">
            <h5 class="text-4xl font-bold text-gray-900 dark:text-white">
              Lupa Password?
            </h5>
            <p class="font-sans font-semibold text-gray-500">
              Masukkan alamat email anda untuk memulihkan Password Anda.
            </p>
          </div>
          <InputEmail
            class="w-full"
            name="email"
            placeholder="Masukkan Email"
          />
          <div>
            <ButtonsSubmit
              class="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 sm:w-[197px]"
              label="Kirim"
              type="submit"
            />
          </div>
        </form>

        <div
          v-else
          class="flex h-full flex-col items-center justify-between space-y-2"
        >
          <div class="space-y-2 text-center">
            <h5 class="text-4xl font-bold text-gray-900 dark:text-white">
              Terkirim !
            </h5>
            <p class="font-sans font-semibold text-gray-500">
              Kami telah mengirimkan pesan instruksi, periksa folder spam anda!
            </p>
          </div>
          <img src="/svg/auth/forgotPass.svg" alt="" />
          <NuxtLink
            to="/auth/login"
            class="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 sm:w-[197px]"
            >Kembali</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
