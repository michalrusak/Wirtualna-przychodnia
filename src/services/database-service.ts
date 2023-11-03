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
import { DatabaseEnum } from "../enums/DatabaseEnum";

class DatabaseService {
  private auth = getAuth(firebaseApp);
  private currentDate = new Date();

  private doctors = collection(db, DatabaseEnum.doctors);
  private appointments = collection(db, DatabaseEnum.appointments);

  async getdoctors(): Promise<DoctorsArray> {
    try {
      const res = await getDocs(this.doctors);

      const doctorsArray: DoctorsArray = [];

      if (!res.empty) {
        res.forEach((elem) => {
          const { name, uid, specialisation } = elem.data();

          doctorsArray.push({ name, uid, specialisation });
        });
      }

      return doctorsArray;
    } catch (error) {
      throw error;
    }
  }
  async setEmptyAppointement(date: Date): Promise<Boolean> {
    try {
      await addDoc(this.appointments, {
        date,
        patientUid: "",
        doctorUid: this.auth?.currentUser?.uid,
        patientName: "",
        doctorName: this.auth?.currentUser?.displayName,
        isAvailable: true,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async reserveAppointment(date: Date, doctorUid: string): Promise<Boolean> {
    try {
      const q = query(
        this.appointments,
        where("date", "==", date),
        where("doctorUid", "==", doctorUid)
      );

      const querySnap = await getDocs(q);

      let documentRef: string = "";
      querySnap.forEach((doc) => {
        documentRef = doc.ref.id;
      });

      const appointmentRef = doc(this.appointments, documentRef);

      await updateDoc(appointmentRef, {
        isAvailable: false,
        patientUid: this.auth?.currentUser?.uid,
        patientName: this.auth?.currentUser?.displayName,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getDoctorAppointments(): Promise<Object[]> {
    try {
      const q = query(
        this.appointments,
        where("doctorUid", "==", this.auth?.currentUser?.uid),
        where("date", ">=", this.currentDate),
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
      throw error;
    }
  }

  async getPatientAppointments(): Promise<Object[]> {
    try {
      const q = query(
        this.appointments,
        where("patientUid", "==", this.auth?.currentUser?.uid),
        where("date", ">=", this.currentDate),
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
      throw error;
    }
  }

  async getAppointmentsToReserve(
    fullDate: Date,
    doctor: string
  ): Promise<String[]> {
    try {
      const q = query(
        this.appointments,
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
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
