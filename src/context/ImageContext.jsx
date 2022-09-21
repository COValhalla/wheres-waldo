import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import {
  getDatabase,
  ref as dataRef,
  set,
  child,
  get,
  push,
  onValue,
} from 'firebase/database'
import React, { createContext, useState } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyA69h9jNghUE7H6x3BzECQbLybPAkLNihc',
  authDomain: 'wheres-waldo-6b3b4.firebaseapp.com',
  databaseURL: 'https://wheres-waldo-6b3b4-default-rtdb.firebaseio.com',
  projectId: 'wheres-waldo-6b3b4',
  storageBucket: 'wheres-waldo-6b3b4.appspot.com',
  messagingSenderId: '680463319079',
  appId: '1:680463319079:web:6635a772da8918eee98e02',
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const database = getDatabase(app)

const db = getFirestore(app)

async function writeUserData(mode, name, date, time) {
  const myDocPath = `leaderboard/${mode}/scores     `
  const docRef = await addDoc(collection(db, myDocPath), {
    name,
    date,
    time,
  })
}

const ImageContext = createContext()
function ImageContextProvider({ children }) {
  const [Images, setImages] = useState({
    easy: null,
    medium: null,
    hard: null,
  })
  const [Coords, setCoords] = useState(null)

  const myProvider = React.useMemo(
    () => ({
      Images,
      setImages,
      Coords,
      setCoords,
    }),
    [Images, Coords],
  )

  if (Images.easy === null) {
    retrieveImages()
  }

  if (Coords === null) {
    retrieveWinCoords()
  }

  function addImage(mode, url) {
    setImages((prevImages) => ({ ...prevImages, [mode]: url }))
  }

  async function retrieveImages() {
    const easyURL = await getDownloadURL(ref(storage, 'easy.jpg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    const mediumURL = await getDownloadURL(ref(storage, 'medium.jpeg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    const hardURL = await getDownloadURL(ref(storage, 'hard.jpeg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    addImage('easy', easyURL)
    addImage('medium', mediumURL)
    addImage('hard', hardURL)
  }
  async function retrieveWinCoords() {
    // Retrieve coords from firebase
    const dbRef = dataRef(database)
    const retrievedCoords = await get(child(dbRef, `winCoords`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        }
      })
      .catch((error) => {
        console.error(error)
      })

    setCoords(retrievedCoords)
  }

  return (
    <ImageContext.Provider value={myProvider}>{children}</ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider, writeUserData, database }
