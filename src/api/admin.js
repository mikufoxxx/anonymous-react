import { Api } from "./api";

export default class adminApi {
  static async deleteAdmin(
    { studentID, clubID }
  ) {
    return Api.delete("/admin", {
      params: {
        studentID, clubID
      }
    })
  }
  static async addAdmin({ studentID, clubID }) {
    return Api.post("/admin", {
      studentID, clubID
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
}