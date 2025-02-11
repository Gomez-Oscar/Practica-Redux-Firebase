import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

const collectionName = 'users';

export const createUserInCollection = async (uid, newUser) => {
  try {
    const newUserRef = doc(firestore, collectionName, uid);
    await setDoc(newUserRef, newUser);
    return {
      id: uid,
      ...newUser,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
