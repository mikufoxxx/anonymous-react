import { Api } from "./api";

export default class clubsApi {
  static async getAllEventsByClubID(clubID) {
    return Api.get("/getEvents", {
      params: { clubID }
    })
  }

  static async deleteEvent(eventID) {
    return Api.delete("/event", {
      params: { eventID }
    })
  }
  // static async deleteApplication(eventId) {
  //   return Api.delete("/getEvents", {
  //     params: { eventId }
  //   })
  // }

  static async getAllApplicationByClubID(clubID) {
    return Api.get("/application", {
      params: { clubID }
    })
  }
  static async updateApplication({ clubID, semester, requestedAmount, description, suggestion }) {
    return Api.put("/application", {
      clubID, semester, requestedAmount, description, suggestion
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }
  static async saveApplication({ clubID }) {
    return Api.post("/application", {
      clubID
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });
  }

  static async updateEvent({ eventID, title, description, capacity, startDate, endDate, startTime, endTime, cost, clubID, venueID }) {
    return Api.put("/event", { eventID, title, description, capacity, startDate, endDate, startTime, endTime, cost, clubID, venueID }, {
      headers: {
      }
    });
  }
  static async createEvent({ eventID, title, description, capacity, startDate, endDate, startTime, endTime, cost, clubID, venueID }) {
    return Api.post("/event", { eventID, title, description, capacity, startDate, endDate, startTime, endTime, cost, clubID, venueID }, {
    });
  }
  static async getVenue() {
    return Api.get("/venues")
  }
}
