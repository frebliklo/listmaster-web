import { auth } from 'firebase'

const googleProvider = new auth.GoogleAuthProvider()

export const createUserWithEmailAndPassword = (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password)

export const signInWithGoogle = () => auth().signInWithPopup(googleProvider)

export const signOut = () => auth().signOut()

export const passwordReset = (email: string) => auth().sendPasswordResetEmail(email)

export const passwordUpdate = async (password: string) => {
  const scopedAuth = auth()

  if (scopedAuth.currentUser) {
    await scopedAuth.currentUser.updatePassword(password)
  } else {
    throw Error('No current user!')
  }
}
