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

import { User, UserLogin, UserRegister } from "../models/user.model";

class AuthService {
  auth = getAuth(firebaseApp);
  googleProvider = new GoogleAuthProvider();

  async isDoctor() {
    try {
      const user = await this.getUser();
      const uid = user.uid;
      const admins = collection(db, "admins");

      const q = query(admins, where("uid", "==", uid));

      const res = await getDocs(q);

      if (!res.empty) {
        const { role } = res.docs[0].data();
        if (role === "lekarz") return true;
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        const isUserLogged = {
          uid: user?.uid ? user?.uid : "",
          displayName: user?.displayName ? user?.displayName : "",
          phoneNumber: user?.phoneNumber ? user?.phoneNumber : "",
        };
        resolve(isUserLogged);
      });
    });
  }

  checkUserLogged() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        const isUserLogged = !!user;
        resolve(isUserLogged);
      });
    });
  }

  async signInWithGoogle() {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
      console.log("zalogowano google poprawnie");
    } catch (err) {
      console.error(err);
    }
  }

  async login(values: UserLogin) {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        values.email,
        values.password
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async register(values: UserRegister) {
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
      console.error(error);
      return false;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
