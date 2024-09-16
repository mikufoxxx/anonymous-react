import { Api } from "./api";

export default class MessageApi {
  static async getMessagesByStudentId(studentID) {
    return Api.get("/messages", {
      params: { studentID }
    })
  }
  static async deleteMessagesByStudentId(studentID) {
    return Api.delete("/messages", {
      params: { studentID },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  }
  static async deleteOneMessagesByStudentId(studentID, messageIndex) {
    return Api.put("/messages", {
      studentID,
      messageIndex
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  }
}