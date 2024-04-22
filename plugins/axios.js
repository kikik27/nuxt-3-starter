import axios from "axios";
import { useAuth } from "@/stores/auth.js";
export default defineNuxtPlugin((nuxtApp) => {
  let ajax = axios.create({
    baseURL: useRuntimeConfig().public.BASE_URL_PUBLIC,
    // baseURL: window.location.origin,
    // headers: {
    //     'Content-Type': 'application/json',
    //     // 'Authorization': store.getters.isLoggedIn ? 'Bearer ' + '' : 'Bearer '+ localStorage.getItem('token')
    // },
  });

  ajax.CancelToken = axios.CancelToken;
  ajax.isCancel = axios.isCancel;

  /*
   * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
   */
  ajax.interceptors.request.use(
    (config) => {
      if (config.url === "auth/profile" && config.method === "get") {
        useAuth().setLoading(false);
      } else {
        useAuth().setLoading(true);
      }

      let token = useCookie("token").value;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
      //   config.data = { data: { ...encrypt(JSON.parse(JSON.stringify(config.data))) } }
      // }
      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  ajax.interceptors.response.use(
    (response) => {
      useAuth().setLoading(false);
      if (response.config.method !== "get") {
        toastSuccess(response.data.message);
      }
      return response;
    },
    function (err) {
      return new Promise(function () {
        useAuth().setLoading(false);
        if (err.response.status === 401) {
          useAuth().logout();
        }
        toastError(err);
        throw err;
      });
    }
  );

  return {
    provide: {
      api: ajax,
    },
  };
});
