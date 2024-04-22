<script setup>
import { useAuth } from "@/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";

const auth = useAuth();
const otp = ref("");
const OTP = ref(false);

definePageMeta({
  middleware: "auth",
});

const schema = yup.object({
  email: yup
    .string()
        .email("Email tidak valid")
    .required((data) => `${data.label} wajib diisi`)
    .label("Email"),
  password: yup
    .string()
    .min(8, (data) => `Password minimal terdiri dari ${data.min} karakter`)
    .required((data) => `${data.label} required`)
    .label("Password"),
});

const { handleSubmit, defineField } = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: schema,
});

const tokenOTP = computed(() => useCookie("tokenOTP").value);
OTP.value = !!tokenOTP.value;

const loginVerify = handleSubmit(async (values) => {
  await auth.login(values);
  OTP.value = true;
});

const otpVerify = async () => {
  await auth.verifyOTP(otp.value);
};

const resendOTP = () => {
  auth.resendOTP();
};
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
          v-if="!!OTP"
          class="flex h-full flex-col items-center justify-between space-y-4"
          method="POST"
          @submit.prevent="otpVerify"
        >
          <div class="text-center">
            <h5 class="text-4xl font-bold text-gray-900 dark:text-white">
              Verifikasi OTP
            </h5>
            <span class="text-gray-700">Kode OTP telah dikirim via email</span>
          </div>
          <InputOtp
            class="m-5"
            @onUpdate:otp="otp = $event"
            @onEnter:otp="otpVerify"
            :loops="4"
          />
          <ButtonsSubmit
            class="w-full max-w-[197px] rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4"
            label="verifikasi"
            type="submit"
          />
          <a
            @click="resendOTP"
            class="cursor-pointer text-center font-sans text-sm font-bold text-gray-400"
            type="button"
          >
            Kirim ulang otp
          </a>
        </form>

        <form
          v-else
          class="flex h-full flex-col items-center justify-between space-y-4"
          method="POST"
          @submit.prevent="loginVerify"
        >
          <h5
            class="text-center text-4xl font-bold text-gray-900 dark:text-white"
          >
            Login
          </h5>
          <div class="w-full space-y-3">
            <InputEmail
              :autofocus="true"
              :primary="true"
              name="email"
              label="Email"
              placeholder="Masukkan Email"
            />
            <InputPassword
              :primary="true"
              name="password"
              label="Password"
              placeholder="Enter Password"
              link="/auth/forgot"
            />
            <div class="flex justify-end">
              <NuxtLink
                to="/auth/forgot-password"
                class="font-sans text-sm font-semibold text-gray-400"
              >
                <span
                  class="hover:text-gray-600 hover:underline hover:underline-offset-1"
                  >Lupa Password?</span
                >
              </NuxtLink>
            </div>
          </div>
          <ButtonsSubmit
            class="w-full max-w-[197px] rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4"
            label="Login"
            type="submit"
          />
        </form>
      </div>
    </div>
  </div>
</template>
