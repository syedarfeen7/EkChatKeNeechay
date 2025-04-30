import CryptoJS from 'crypto-js';

class CryptoHelper {
  decryptString = (
    encryptedString: string,
    key = 'THISISMYTESTKEYANDITOUGHTTOBESECURE',
  ) => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
}

export default new CryptoHelper();
