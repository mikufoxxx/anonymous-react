import { Api } from "./api";

export default class DashboardApi{
    static async logout(studentID) {
        return Api.get("/logout", {
            params: { studentID }
        })
    }
}