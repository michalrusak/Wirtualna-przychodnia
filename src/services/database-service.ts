import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { DoctorsArray } from "../models/doctor.model";

class DatabaseService {
  async getdoctors() {
    try {
      const doctors = collection(db, "doctors");

      const res = await getDocs(doctors);

      const doctorsArray: DoctorsArray = [];

      if (!res.empty) {
        res.forEach((elem) => {
          const { name, uid, specialisation } = elem.data();

          doctorsArray.push({ name, uid, specialisation });
        });
      }

      return doctorsArray;
    } catch (error) {
      console.error(error);
    }
  }
  setEmptyAppointement() {}
  setAppointment() {}
  getMyAppointments() {}
}

const databaseService = new DatabaseService();
export default databaseService;
