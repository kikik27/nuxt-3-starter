import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  // state: () => ({
  //   rows_data: null,
  //   meta_data: {
  //     count: null,
  //     next: null,
  //     previous: null,
  //   },
  // }),

  actions: {
    // getData(limit, page, name) {
    //   this.rows_data = null;
    //   return new Promise(async (resolve, reject) => {
    //     const paramsObject = {};

    //     if (limit !== undefined) paramsObject.limit = limit;
    //     if (page !== undefined) paramsObject.page = page;
    //     if (name !== undefined) paramsObject.name = name;

    //     useNuxtApp()
    //       .$api({
    //         url: "teacher",
    //         method: "get",
    //         params: paramsObject,
    //       })
    //       .then((response) => {
    //         if (response.status === 200) {
    //           this.rows_data = response.data.data;
    //         }
    //         resolve(response);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
    create(payload) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: "user",
            method: "post",
            data: payload,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update(payload) {
      return new Promise(async (resolve, reject) => {
        const { id, ...data } = payload;
        useNuxtApp()
          .$api({
            url: `user/${id}`,
            method: "put",
            data: data,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete(id) {
      return new Promise(async (resolve, reject) => {
        useNuxtApp()
          .$api({
            url: `user/${id}`,
            method: "delete",
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
