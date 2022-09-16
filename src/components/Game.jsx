import React from 'react'
import ReactModal from 'react-modal'
import { Link, useLocation } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'

// Modal styling
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

export default function Game() {
  const context = React.useContext(ImageContext)

  const location = useLocation()
  const { mode } = location.state

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

  function pullData() {
    // Retrieve coords from firebase
    const dbRef = dataRef(database)
    get(child(dbRef, `tutorial`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          checkResult(data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function checkResult(data) {
    // console.log('checking result: ', data)

    if (
      selectedData.x <= data.jackson.topRight[0] &&
      selectedData.x >= data.jackson.topLeft[0] &&
      selectedData.y <= data.jackson.botRight[1] &&
      selectedData.y >= data.jackson.topLeft[1]
    ) {
      console.log('Identified Jackson!')
    } else {
      console.log('Did not find Jackson')
    }
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
  }

  function addName(event) {
    setSelectedData((prevData) => ({
      ...prevData,
      name: event.target.innerText,
    }))
    closeModal()
    // Check server for results!
    pullData()
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="flex items-center justify-around bg-slate-800 p-5 text-xl text-white">
        <Link
          to="/"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Home
        </Link>
        <h1 className="text-2xl">Where's Waldo</h1>
        <Link
          to="/info"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Info
        </Link>
      </nav>
      <div>
        <div className="modalParent relative w-1/2 bg-red-500">
          <img
            // id="myimg"
            src={context[mode]}
            className="modalparent absolute m-12 w-auto"
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
            {/* <button onClick={addName} type="button">
            Maggie
          </button> */}
          </div>
        </ReactModal>
      </div>
    </div>
  )
}
