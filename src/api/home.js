import { Api } from "./api";

export default class Home {
  static async signUp({ studentID, name, email, password }) {
    return Api.post('/register', { studentID, name, email, password }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
  static signIn({ email: identifier, password }) {
    return Api.post('/login', { identifier, password }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
}