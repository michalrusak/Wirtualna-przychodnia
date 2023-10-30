import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
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
        patientName: "",
        doctorName: this.auth?.currentUser?.displayName,
        isAvailable: true,
      });
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  async reserveAppointment(date: Date, doctorUid: string) {
    try {
      const appointments = collection(db, "appointments");

      const q = query(
        appointments,
        where("date", "==", date),
        where("doctorUid", "==", doctorUid)
      );

      const querySnap = await getDocs(q);

      let documentRef: string = "";
      querySnap.forEach((doc) => {
        documentRef = doc.ref.id;
      });

      const appointmentRef = doc(appointments, documentRef);

      await updateDoc(appointmentRef, {
        isAvailable: false,
        patientUid: this.auth?.currentUser?.uid,
        patientName: this.auth?.currentUser?.displayName,
      });
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
  async getDoctorAppointments() {
    try {
      const appointments = collection(db, "appointments");

      const q = query(
        appointments,
        where("doctorUid", "==", this.auth?.currentUser?.uid),
        orderBy("date")
      );

      const querySnap = await getDocs(q);

      const appointmentsArray: Object[] = [];

      querySnap.forEach(async (elem) => {
        const { date, isAvailable, patientName } = elem.data();

        const newDate = new Date(date.seconds * 1000);

        appointmentsArray.push({
          date: newDate,
          name: patientName,
          isAvailable,
        });
      });
      return appointmentsArray;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }

  async getPatientAppointments() {
    try {
      const appointments = collection(db, "appointments");

      const q = query(
        appointments,
        where("patientUid", "==", this.auth?.currentUser?.uid),
        orderBy("date")
      );

      const querySnap = await getDocs(q);

      const appointmentsArray: Object[] = [];

      querySnap.forEach((elem) => {
        const { date, doctorName } = elem.data();

        const newDate = new Date(date.seconds * 1000);

        appointmentsArray.push({ date: newDate, name: doctorName });
      });

      return appointmentsArray;
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
            0,
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
        ),
        where("isAvailable", "==", true)
      );

      const res = await getDocs(q);

      const list: String[] = [];

      res.forEach((elem) => {
        const { date } = elem.data();

        const hour = new Date(date.seconds * 1000).getHours();
        let minutes = new Date(date.seconds * 1000).getMinutes().toString();

        if (minutes === "0") {
          minutes = "0" + minutes;
        }

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
