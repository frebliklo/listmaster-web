import { db } from './firebase'

export const createUser = (
  id: string,
  username: string,
  email: string,
  firstName?: string,
  lastName?: string,
) =>
  db
    .collection('users')
    .add({
      id,
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
