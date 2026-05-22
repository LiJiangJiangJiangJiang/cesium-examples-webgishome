/**
 * 使用示例：
let newArray = [
  { name: "aaa", value: 2 },
  { name: "ddd", value: 0 },
  { name: "bbb", value: 1 }
];
console.log("升序：", newArray.sort(sortBy("value")));
console.log("降序：", newArray.sort(sortBy("value", false)));
 * 
 * @param property 排序的属性
 * @param asc ture:升序(默认),false:降序
 * @returns 排序后的数组
 */
export const sortBy = (property, asc = true) => {
  return function(value1, value2) {
    let a = value1[property];
    let b = value2[property];
    return asc ? a - b : b - a;
  };
};

// 创建随机数字验证码
export const createCode = (codeLength = 6) => {
  let code = "";
  let selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  for (let i = 0; i < codeLength; i++) {
    let charIndex = Math.floor(Math.random() * 10);
    code += selectChar[charIndex];
  }
  return code;
};

/**
 * 手机号格式是否正确
 * @param phone 手机号
 * @returns bool
 */
export const checkPhone = phone => {
  if (!phone) return;
  return new Promise((resolve, reject) => {
    let reg = /^1[3-9]\d{9}$/;
    // console.log("手机号格式：", reg.test(phone));
    reg.test(phone) ? resolve(true) : resolve(false);
  });
};

/**
 * 密码格式是否正确
 * @param password 密码
 * @returns bool
 */
export const checkPassword = password => {
  if (!password) return;
  return new Promise((resolve, reject) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    // console.log("密码格式：", reg.test(password));

    reg.test(password) ? resolve(true) : resolve(false);
  });
};
