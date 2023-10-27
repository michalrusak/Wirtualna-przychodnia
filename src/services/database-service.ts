import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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
  async reserveAppointment(date: Date) {
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

  async getAppointmentsToReserve(fullDate: Date, doctor: string) {
    try {
      const appointments = collection(db, "appointments");

      const q = query(
        appointments,
        where("doctorUid", "==", doctor),
        where(
          "date",
          ">=",
          new Date(
            fullDate.getFullYear(),
            fullDate.getMonth(),
            fullDate.getDate(),
            1,
            0
          )
        ),
        where(
          "date",
          "<",
          new Date(
            fullDate.getFullYear(),
            fullDate.getMonth(),
            fullDate.getDate(),
            23,
            59
          )
        )
      );

      const res = await getDocs(q);

      const list: String[] = [];

      res.forEach((elem) => {
        const { date } = elem.data();

        const hour = new Date(date.seconds * 1000).getHours();
        const minutes = new Date(date.seconds * 1000).getMinutes();

        list.push(`${hour}:${minutes}`);
      });

      return list;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
