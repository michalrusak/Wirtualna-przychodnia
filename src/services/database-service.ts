import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseApp, { db } from "../config/firebase-config";
import { DoctorsArray } from "../models/doctor.model";

class DatabaseService {
  auth = getAuth(firebaseApp);
  currentDate = new Date();

  async getdoctors(): Promise<DoctorsArray> {
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
      // console.error(error);
      throw error;
    }
  }
  async setEmptyAppointement(date: Date) {
    try {
      const appointments = collection(db, "appointments");

      await addDoc(appointments, {
        date,
        patientUid: "",
        doctorUid: this.auth?.currentUser?.uid,
        isAvailable: true,
      });
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  async setAppointment(date: Date) {
    try {
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  async getDoctorAppointments() {
    try {
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  async getPatientAppointments() {
    try {
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
