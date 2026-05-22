import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      userinfo: {
        id: 1,
        figureurl_qq: "",
        nickname: "",
        is_vip: 0,
        is_manager: 0,
        phone: undefined,
      },
      isShowCommonDialog: false,
      currentDialogType: "LoginByPassword",
      // 绑定qq时将以下信息存储到数据库
      qqBindInfo: {
        figureurl_qq: "",
        nickname: "",
        gender_type: 1,
        year: undefined,
        province: "",
        city: "",
      },
    };
  },
  getters: {},
  actions: {
    // 重置用户信息
    resetUserinfo() {
      this.userinfo = {
        id: 1,
        figureurl_qq: "",
        nickname: "",
        is_vip: 0,
        is_manager: 0,
        phone: undefined,
      };
    },
  },
});
