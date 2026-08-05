import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, onSnapshot, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfileData, Booking } from '../types';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Google OAuth Sign In
export async function signInWithGoogle(): Promise<UserProfileData> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    const userProfile: UserProfileData = {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Valued Traveler',
      email: fbUser.email || '',
      phone: fbUser.phoneNumber || '+91 98000 00000',
      avatar: fbUser.photoURL || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop`,
      memberSince: new Date().getFullYear().toString(),
      savedPackageIds: [],
    };

    // Save/sync user profile in Firestore
    const userDocRef = doc(db, 'users', fbUser.uid);
    try {
      await setDoc(userDocRef, userProfile, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
    }

    return userProfile;
  } catch (err) {
    console.error('Google Auth Error:', err);
    throw err;
  }
}

export async function logoutFirebase(): Promise<void> {
  await firebaseSignOut(auth);
}

// Fetch or sync bookings in Firestore for authenticated user
export async function fetchUserBookingsFirebase(userId: string): Promise<Booking[]> {
  try {
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const bookings: Booking[] = [];
    snapshot.forEach((doc) => {
      bookings.push(doc.data() as Booking);
    });
    return bookings;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'bookings');
    return [];
  }
}

export async function saveBookingFirebase(booking: Booking): Promise<void> {
  try {
    const bookingDocRef = doc(db, 'bookings', booking.id);
    await setDoc(bookingDocRef, booking);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `bookings/${booking.id}`);
  }
}
