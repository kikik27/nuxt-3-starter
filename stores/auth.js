import { defineStore } from "pinia";
import { socket } from "@/socket/notifications";
// const nuxtApp = useNuxtApp()

export const useAuth = defineStore("auth", {
  state: () => ({
    user_data: null,
    isAuth_data: false,
    isLoading_data: false,
    isSendEmail: false,
  }),

  actions: {
    xptokenOTP() {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      return currentDate;
    },
    xpToken() {
      var date = new Date();
      date.setDate(
        date.getDate() + useRuntimeConfig().public.TOKEN_EXPIRES_IN_PUBLIC
      );
      return date;
    },

    login(credentials) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/login",
            method: "POST",
            data: credentials,
          })
          .then((response) => {
            if (response.status === 200) {
              const token = useCookie("tokenOTP", {
                expires: this.xptokenOTP(),
              });
              token.value = response.data.token;
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    verifyOTP(otp) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/verify-otp",
            method: "POST",
            data: {
              token: useCookie("tokenOTP").value,
              otp: parseInt(otp),
            },
          })
          .then((response) => {
            if (response.status === 200) {
              this.isAuth_data = true;
              const token = useCookie("token", {
                expires: this.xpToken(),
              });
              token.value = response.data.token;
              useCookie("tokenOTP").value = null;
              return navigateTo("/dashboard");
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    resendOTP() {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/resend-otp",
            method: "POST",
            data: {
              token: useCookie("tokenOTP").value,
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getUser() {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api("auth/profile", {
            method: "GET",
          })
          .then((response) => {
            if (response.status === 200) {
              socket.connect();
              this.isAuth_data = true;
              this.user_data = response.data;
            } else {
              this.isAuth_data = false;
              useCookie("token").value = null;
              // this.logout();
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    formData(payload) {
      var formData = new FormData();
      for (var key in payload) {
        if (payload !== "iduser") {
          formData.append(key, payload[key]);
        }
      }
      return formData;
    },

    forgotPassword(email) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/forgot-password",
            method: "POST",
            data: email,
          })
          .then((response) => {
            resolve(response);
            return response;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    resetPassword(payload) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/reset-password",
            method: "POST",
            data: payload,
          })
          .then((response) => {
            resolve(response);
            return response;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updateProfile(payload) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/profile",
            method: "PUT",
            data: this.formData(payload),
          })
          .then((response) => {
            resolve(response);
            if (response.status === 200) {
              this.getUser();
            }
            return response;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updatePassword(payload) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "auth/profile",
            method: "PUT",
            data: this.formData(payload),
          })
          .then((response) => {
            resolve(response);
            return response;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout() {
      return new Promise(async (resolve) => {
        socket.disconnect();
        useCookie("token").value = null;
        useCookie("chat_sessions").value = null;
        this.isAuth_data = false;
        // this.user_data = null;
        resolve();
        return navigateTo("/auth/login");
      });
    },

    setLoading(isLoading) {
      this.isLoading_data = isLoading;
    },
  },
});
