import firebaseApp from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// export const db = getFirestore(firebaseApp);
// export const storage = getStorage(firebaseApp);

class AuthService {
  auth = getAuth(firebaseApp);
  googleProvider = new GoogleAuthProvider();

  checkUserLogged() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Użytkownik nie jest zalogowany"));
        }
      });
    });
  }

  async signInWithGoogle() {
    try {
      await signInWithPopup(this.auth, this.googleProvider);
      console.log("zalogowano google poprawnie");
    } catch (err) {
      console.log("errror");

      console.error(err);
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error("Błąd logowania:", error);
      return false;
    }
  }

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
