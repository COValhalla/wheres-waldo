import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getDatabase, ref as dataRef, child, get } from 'firebase/database'
import React, { createContext, useState } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyA69h9jNghUE7H6x3BzECQbLybPAkLNihc',
  authDomain: 'wheres-waldo-6b3b4.firebaseapp.com',
  projectId: 'wheres-waldo-6b3b4',
  storageBucket: 'gs://wheres-waldo-6b3b4.appspot.com/',
  databaseURL: 'https://wheres-waldo-6b3b4-default-rtdb.firebaseio.com/',
  messagingSenderId: '680463319079',
  appId: '1:680463319079:web:6635a772da8918eee98e02',
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const database = getDatabase(app)

const ImageContext = createContext()

function ImageContextProvider({ children }) {
  const [Images, setImages] = useState({
    easy: null,
    medium: null,
    hard: null,
  })

  if (Images.easy === null) {
    retrieveImages()
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

  return (
    <ImageContext.Provider value={Images}>{children}</ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider }
