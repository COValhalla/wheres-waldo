import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import React, { createContext, useState } from 'react'
import * as dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = JSON.parse(process.env.firebaseConfig)
const app = initializeApp(firebaseConfig)
const imageStorage = getStorage(app)
const database = getFirestore(app)

async function writeScores(mode, name, date, time) {
  await addDoc(collection(database, '/leaderboard'), {
    name,
    date,
    time,
    mode,
  })
}

const DatabaseContext = createContext()

function DatabaseContextProvider({ children }) {
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
    const easyURL = await getDownloadURL(ref(imageStorage, 'easy.jpg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    const mediumURL = await getDownloadURL(ref(imageStorage, 'medium.jpeg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    const hardURL = await getDownloadURL(ref(imageStorage, 'hard.jpeg'))
      .then((url) => url)
      .catch((error) => {
        console.log(error)
      })

    addImage('easy', easyURL)
    addImage('medium', mediumURL)
    addImage('hard', hardURL)
  }

  async function retrieveWinCoords() {
    const querySnapshot = await getDocs(collection(database, 'winCoords'))
    const results = { easy: [], medium: [], hard: [] }
    querySnapshot.forEach((doc) => {
      results[doc.id] = doc.data()
    })
    setCoords(results)
  }

  return (
    <DatabaseContext.Provider value={myProvider}>
      {children}
    </DatabaseContext.Provider>
  )
}

export { DatabaseContext, DatabaseContextProvider, writeScores, database }
