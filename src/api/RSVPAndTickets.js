import { Api } from "./api";

export default class RSVPAndTicketsApi {
  static async getRsvpByStudentId(studentID) {
    return Api.get("/rsvp", {
      params: { studentID },
      withCredentials: true
    })
  }
  static async deleteRsvpByStudentId(studentID, rsvpID) {
    return Api.delete("/rsvp", {
      params: {
        studentID,
        rsvpID
      }
    })
  }
  static async getTicketByStudentId(attendeeID) {
    return Api.get("/ticket", {
      params: { attendeeID },
      withCredentials: true
    })
  }
  static async addTicket(rsvpID) {
    return Api.post("/ticket", {
      rsvpID
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
}