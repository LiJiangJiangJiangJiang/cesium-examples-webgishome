import CryptoJS from 'crypto-js';

// 加密数据
export function encryptData(data, str = "385f33cb91484b04a177828829081ab7") {
    let key = CryptoJS.enc.Utf8.parse(str);
    // 加密内容
    const content = JSON.stringify(data);
    // 加密方法
    const encryptedContent = CryptoJS.AES.encrypt(content, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding,
    });
    const encStr = encryptedContent.ciphertext.toString();
    return encStr
}

//解密数据
export function decryptData(encStr, str = "385f33cb91484b04a177828829081ab7") {
    if (!encStr) return
    let key = CryptoJS.enc.Utf8.parse(str);

    // 解密方法
    const decryptedContent = CryptoJS.AES.decrypt(
        CryptoJS.format.Hex.parse(encStr),
        key, //注意：后面这里最好使用 CryptoJS.format.Utf8.parse(key)
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding,
        }
    );
    return JSON.parse(CryptoJS.enc.Utf8.stringify(decryptedContent))
}