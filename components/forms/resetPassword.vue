<script setup>
import { useForm } from "vee-validate";
import { useAuth } from "@/stores/auth";
import * as yup from "yup";
import debounce from "lodash.debounce";

const authStore = useAuth();
const emit = defineEmits();
const schema = yup.object().shape({
  password: yup
    .string()
    .min(
      8,
      ({ min }) =>
        `Password baru harus terdiri dari setidaknya ${min} karakter`
    )
    .required("Password baru diperlukan"),
  oldPassword: yup
    .string()
    .min(
      8,
      ({ min }) =>
        `Password lama harus terdiri dari setidaknya ${min} karakter`
    )
    .required("Password lama diperlukan"),
});

const { handleSubmit, defineField } = useForm({
  initialValues: {
    password: null,
    oldPassword: null,
  },
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  const res = await authStore.updatePassword(values);
  if (res.status === 200) {
    emit('profile:update')
  }
});
</script>

<template>
  <div>
    <form
      class="flex h-full flex-col items-center justify-between space-y-4"
      method="POST"
      @submit.prevent="onSubmit"
    >
      <InputPassword
        class="w-full"
        name="oldPassword"
        label="Password lama"
        :primary="true"
        placeholder="Masukkan password lama"
      />
      <InputPassword
        class="w-full"
        name="password"
        label="Password baru"
        :primary="true"
        placeholder="Masukkan password baru"
      />
    </form>
    <div class="mt-6 flex items-end justify-end">
      <ButtonsSubmit
        @click="onSubmit"
        class="bg-primary px-6 text-white"
        label="simpan"
        type="submit"
      />
    </div>
  </div>
</template>
