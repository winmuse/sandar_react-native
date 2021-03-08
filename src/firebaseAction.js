import firebase from 'firebase';
import {db} from './config/firebaseconfig';

class firebaseClass {
  pushSignup(array) {
    db.ref('users').push(array);
  }

  getUsers(callback) {
    db.ref('users').on('value', (res) => {
      callback(res);
    });
  }

  updatePassword(key, val) {
    db.ref(`users`).child(key).update({pass: val});
  }

  // async delete(key){
  //     await this.ref(`seat`).child(key).remove();
  // }

  // updateSeat(key, val){
  //     this.ref(`seat`).child(key).update({"seat" : val});
  // }

  // updateFalg(key, val){
  //     this.ref(`seat`).child(key).update({"flag" : val});
  // }
  // updateCheckoutID(key, val){
  //     this.ref(`seat`).child(key).update({"checkoutId" : val});
  // }
  // updateSettingValue(key, val){
  //     this.ref(`setting`).child(key).update({"value" : val});
  // }
  // updateSettingPassword(key, val){
  //     this.ref(`setting`).child(key).update({"password" : val});
  // }
  // updateSettingLogoImg(key, val){
  //     this.ref(`setting`).child(key).update({"img" : val});
  // }
  // updateSettingLanguage(key, val){
  //     this.ref(`setting`).child(key).update({"language" : val});
  // }
}
const firebaseAction = new firebaseClass();
export default firebaseAction;
