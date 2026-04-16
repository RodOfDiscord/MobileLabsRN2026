import { db } from "@/firebase/config";
import type { UserProfile } from "@/types/types";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as UserProfile;
}

export async function saveUserProfile(
  uid: string,
  profile: UserProfile,
): Promise<void> {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, profile, { merge: true });
}

export async function deleteUserProfile(uid: string): Promise<void> {
  const docRef = doc(db, "users", uid);
  await deleteDoc(docRef);
}
