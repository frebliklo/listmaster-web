import { db } from './firebase'

export const createUser = (
  uid: string,
  username: string,
  email: string,
  firstName?: string,
  lastName?: string,
) =>
  db
    .collection('users')
    .add({
      uid,
      username,
      email,
      firstName,
      lastName,
    })
    .then(ref => ref.id)
    .catch(err => console.log(err))

export const getUsers = () =>
  db
    .collection('users')
    .get()
    .then(snapshot => snapshot.docs)

export const getUser = (uid: string) =>
  db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        return {
          error: null,
          data: doc.data,
        }
      } else {
        return {
          error: null,
          data: null,
        }
      }
    })
    .catch(err => {
      return {
        error: err,
        data: null,
      }
    })
