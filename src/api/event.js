import { Api } from "./api";

export default class eventsApi {
  static async getAllEventsByClubID() {
    return Api.get("/events", {
    })
  }
  static async addRSVP(attendeeID, applicantID, eventID) {
    return Api.post("/rsvp", {
      attendeeID, applicantID, eventID
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
}