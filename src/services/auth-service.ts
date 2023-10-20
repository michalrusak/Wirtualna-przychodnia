import firebaseApp from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
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
