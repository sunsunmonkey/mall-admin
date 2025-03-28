import VueCookies from "vue-cookies";
import { ACCESS_TOKEN } from "@/config/constant";
import { getUserInfo, login } from "@/api/login";
const logins = {
  state: {
    userInfo: {},
    btnAuthList: [], //按钮权限列表
  },
  mutations: {
    //设置当前用户信息
    SET_USER_INFO: (state, result) => {
      state.userInfo = result.userInfo;
    },
    //设置当前账号权限按钮
    SET_USER_BTN: (state, btnAuthList) => {
      state.btnAuthList = btnAuthList;
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise(async (reslove, reject) => {
        try {
          const { code, data } = await login(userInfo);
          console.log(data, code);
          if (code == 1) {
            VueCookies.set(ACCESS_TOKEN, data.token, 10 * 24 * 60 * 60 * 1000);
            reslove(data);
          } else {
            reject(data);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    GetUserInfo({ commit, dispatch }) {
      return new Promise(async (reslove, reject) => {
        const { data } = await getUserInfo();
        if (!data) {
          return dispatch("Logout");
        }
        commit("SET_USER_INFO", data);
        commit("SET_USER_BTN", data.btnAuthList);
        reslove(data);
      });
    },
    Logout() {
      return new Promise((reslove, reject) => {
        VueCookies.remove(ACCESS_TOKEN);
        sessionStorage.clear();
        localStorage.clear();
        location.reload();
      });
    },
  },
};

export default logins;
