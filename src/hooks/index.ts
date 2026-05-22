import axios from "@/api/axios";

// 是否已登录（无需token验证）
export const isLogin = () => {
  // 无需token验证，直接返回true
  return true;
};

/**
 * 判断手机号是否已注册
 * @param phone 手机号
 * @returns bool
 */
export const isPhoneExist = (phone: number) => {
  if (!phone) return;
  // return data.data.data.isExist_user?true:false
  return new Promise(async (resolve, reject) => {
    let data = await axios.get("/is_user_exist", {
      params: {
        phone,
      },
    });
    resolve(data.data.data.isExist_user);
  });
};
