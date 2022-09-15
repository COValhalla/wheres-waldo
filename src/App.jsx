/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import ReactModal from 'react-modal'
import { initializeApp } from 'firebase/app'
import jackson from './assets/jackson.jpeg'

const firebaseConfig = {
  apiKey: 'AIzaSyA69h9jNghUE7H6x3BzECQbLybPAkLNihc',
  authDomain: 'wheres-waldo-6b3b4.firebaseapp.com',
  projectId: 'wheres-waldo-6b3b4',
  storageBucket: 'wheres-waldo-6b3b4.appspot.com',
  messagingSenderId: '680463319079',
  appId: '1:680463319079:web:6635a772da8918eee98e02',
}

const app = initializeApp(firebaseConfig)

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  content: {
    position: 'absolute',
    left: '36.25%',
    top: '61.67%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(50%, 140%)',
    padding: 0,
  },
}
ReactModal.setAppElement(document.getElementById('root'))

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState({
    x: null,
    y: null,
    name: null,
  })

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function closeResetModal() {
    setIsOpen(false)
    setSelectedData({ x: null, y: null, name: null })
  }

  function updateModalLocation(left, top) {
    customStyles.content.left = left
    customStyles.content.top = top
  }

  // Determines client x/y and resulting click position x/y
  function checkPos(event) {
    const clickPos = [
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetTop,
    ]

    updateModalLocation(clickPos[0], clickPos[1])
    openModal()

    const width = event.target.clientWidth
    const height = event.target.clientHeight

    const posPercent = [
      (clickPos[0] / width) * 100,
      (clickPos[1] / height) * 100,
    ]

    setSelectedData((prevData) => ({
      ...prevData,
      x: posPercent[0],
      y: posPercent[1],
    }))

    const targetJackson = {
      topLeft: [36.25, 61.7],
      topRight: [61.25, 61.67],
      botLeft: [36.25, 100],
      botRight: [61.25, 100],
    }

    if (
      posPercent[0] <= targetJackson.topRight[0] &&
      posPercent[0] >= targetJackson.topLeft[0] &&
      posPercent[1] <= targetJackson.botRight[1] &&
      posPercent[1] >= targetJackson.topLeft[1]
    ) {
      // console.log('Identified Jackson!')
    } else {
      // console.log('Did not find Jackson')
    }
  }

  function addName(event) {
    setSelectedData((prevData) => ({
      ...prevData,
      name: event.target.innerText,
    }))
    closeModal()
    // Check server for results!
  }

  return (
    <div>
      <div className="modalParent relative w-1/2 bg-red-500">
        <img
          className="modalparent absolute m-12 w-auto"
          src={jackson}
          onClick={checkPos}
          alt=""
        />
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeResetModal}
        shouldCloseOnOverlayClick
        shouldCloseonEsc
        parentSelector={() => document.querySelector('.modalParent')}
      >
        <div className="flex w-24 flex-col bg-red-100 text-xs">
          <button onClick={addName} type="button">
            Jackson
          </button>
          <button onClick={addName} type="button">
            Maggie
          </button>
        </div>
      </ReactModal>
    </div>
  )
}

export default App
