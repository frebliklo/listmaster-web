import firebase from 'firebase'

import { db } from './firebase'
import { List, User } from '../actions'

type CreateUserInput = {
  uid: string
  avatar?: string | null
  username: string
  email: string
  firstName?: string | null
  lastName?: string | null
}

export const createUser = ({
  uid,
  avatar = null,
  username,
  email,
  firstName = null,
  lastName = null,
}: CreateUserInput) =>
  db
    .collection('users')
    .add({
      uid,
      avatar,
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

export const getUser = async (uid: string) => {
  return new Promise<User | null>((resolve, reject) => {
    db.collection('users')
      .where('uid', '==', uid)
      .get({ source: 'default' })
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const data = doc.data() as User

            resolve(data)
          } else {
            resolve(null)
          }
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

interface CreateListInput {
  name: string
  image?: string | null
  owner: string
}

export const createList = ({ name, owner, image = null }: CreateListInput) => {
  return new Promise<List>((resolve, reject) => {
    db.collection('lists')
      .add({
        name,
        image,
        owner,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(ref => {
        ref.get().then(doc => {
          const data = doc.data() as List

          resolve(data)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getLists = (uid: string) => {
  return new Promise<List[]>(async (resolve, reject) => {
    const lists: List[] = []

    const querySnapshot = await db
      .collection('lists')
      .where('owner', '==', uid)
      .get()

    try {
      querySnapshot.forEach(doc => {
        const data = doc.data() as List

        lists.push(data)
      })

      resolve(lists)
    } catch (err) {
      reject(err)
    }
  })
}
