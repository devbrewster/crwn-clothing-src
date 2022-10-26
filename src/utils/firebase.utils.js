// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
    getFirestore,
    getDoc,
    doc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyQWxezjmJcoR0lCqJkel4Q23syPp-S6I",
    authDomain: "crwn-clothing-a7e70.firebaseapp.com",
    projectId: "crwn-clothing-a7e70",
    storageBucket: "crwn-clothing-a7e70.appspot.com",
    messagingSenderId: "925242356588",
    appId: "1:925242356588:web:bbc2cf166f971c2bc77949",
    measurementId: "G-QCS7NPEM22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth(app)
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// Initialize Firebase Firestore
export const db = getFirestore()
// Upload data to Firebase Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

// Pull data from Firebase Firestore
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const catergoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return catergoryMap
}
////////////////////////////////////////////////////////////////

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    // If the user doesn't exist, create the user document
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (err) {
            console.log("error creating the user", err.message)
        }
    }
    return userDocRef
}

// Create a new user with Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}
// Sign In with Email and Password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

// Sign Out
export const signOutUser = async () => await signOut(auth)

// Observe listening for changes in the App
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)



