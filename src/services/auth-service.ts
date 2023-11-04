import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebaseApp, { db } from "../config/firebase-config";

import { collection, getDocs, query, where } from "firebase/firestore";

import { UserLogin, UserRegister } from "../models/user.model";
import { DatabaseEnum } from "../enums/DatabaseEnum";

class AuthService {
  private auth = getAuth(firebaseApp);
  private googleProvider = new GoogleAuthProvider();
  private admins = collection(db, DatabaseEnum.admins);

  async isDoctor(): Promise<Boolean> {
    try {
      const uid = this.auth?.currentUser?.uid;

      const q = query(this.admins, where("uid", "==", uid));

      const res = await getDocs(q);

      if (!res.empty) {
        const { role } = res.docs[0].data();
        if (role === "lekarz") return true;
        return false;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  getName(): string {
    const name = this.auth?.currentUser?.displayName;
    return name ? name : "";
  }

  checkUserLogged(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        const isUserLogged = !!user;
        resolve(isUserLogged);
      });
    });
  }

  async signInWithGoogle(): Promise<Boolean> {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async login(values: UserLogin): Promise<Boolean> {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        values.email,
        values.password
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async register(values: UserRegister): Promise<Boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      if (user) {
        await updateProfile(this.auth.currentUser!, {
          displayName: `${values.firstName} ${values.lastName}`,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<Boolean> {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
