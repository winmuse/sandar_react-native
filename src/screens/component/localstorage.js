// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const Logininfo = 'logininfo';
export const Categoryinfo = 'categoryinfo';

// 2020-09-24 start
export const saveRemember = (val) => {
  AsyncStorage.setItem(Logininfo, JSON.stringify(val));
};

export const getRemember = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(Logininfo)
      .then((res) => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject('logout'));
  });
};

export const saveCategory = (val) => {
  AsyncStorage.setItem(Categoryinfo, JSON.stringify(val));
};

export const getCategory = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(Categoryinfo)
      .then((res) => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject('not Category'));
  });
};
// 2020-09-24 end
