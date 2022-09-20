/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { update } from 'firebase/database'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'
import { ImageContext } from '../context/ImageContext'

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '0',
    transform: 'translate(-50%, -50%)',
  },
}

ReactModal.setAppElement(document.getElementById('root'))

export default function Game() {
  const startTime = useRef(Date.now())

  const context = React.useContext(ImageContext)

  // To programatically change pages
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeResetModal() {
    setIsOpen(false)
    setcoordSelection({ x: null, y: null, name: null })
    navigate('/')
  }

  // To get selected difficulty from home page
  const location = useLocation()
  const { mode } = location.state

  const [coordSelection, setcoordSelection] = React.useState({
    x: null,
    y: null,
    name: null,
  })

  const [winTime, setWinTime] = React.useState(null)
  const [foundWaldo, setFoundWaldo] = React.useState(null)

  useEffect(() => {
    function checkWin() {
      if (
        coordSelection.x <= context.Coords[mode].topRight[0] &&
        coordSelection.x >= context.Coords[mode].topLeft[0] &&
        coordSelection.y <= context.Coords[mode].botRight[1] &&
        coordSelection.y >= context.Coords[mode].topLeft[1]
      ) {
        // Add modal popup for entering leadboard name/score.

        const totalTime = (Date.now() - startTime.current) / 1000
        setWinTime(totalTime)
        openModal()
      } else {
        // Update nav main to notify did not find
        setFoundWaldo(false)
      }
    }
    if (coordSelection.x !== null) {
      checkWin()
    }
  }, [context.Coords, mode, coordSelection])

  function calculateClickPercent(event) {
    const clickPos = [
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetTop,
    ]

    const width = event.target.clientWidth
    const height = event.target.clientHeight

    const posPercent = [
      (clickPos[0] / width) * 100,
      (clickPos[1] / height) * 100,
    ]

    return posPercent
  }

  // Determines client x/y and resulting click position x/y
  function updateUserSelection(event) {
    const posPercent = calculateClickPercent(event)

    setcoordSelection((prevData) => ({
      ...prevData,
      x: posPercent[0],
      y: posPercent[1],
    }))
  }

  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-around bg-slate-800 p-5 text-xl text-white">
        <Link
          to="/"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Home
        </Link>
        {foundWaldo === null && <h1 className="text-2xl">Find Waldo!</h1>}
        {foundWaldo === false && (
          <h1 className="text-2xl">Not Waldo, Try Again!</h1>
        )}
        <Link
          to="/info"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Info
        </Link>
      </nav>
      <div className="flex min-h-screen flex-col items-center gap-8 bg-slate-700 py-8">
        <img
          src={context.Images[mode]}
          className="w-5/6 rounded-2xl"
          onClick={updateUserSelection}
          alt=""
        />
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        style={modalStyles}
        onRequestClose={closeResetModal}
        shouldCloseOnOverlayClick
        shouldCloseonEsc
      >
        <div className="flex flex-col bg-slate-800 p-6  text-white">
          <h3 className="border-b-4 text-2xl">
            You finished in {winTime} seconds!
          </h3>
          <h4 className=" pt-8 text-lg">
            Submit your score to the global leaderboard!
          </h4>
          <form className="flex flex-col" action="#">
            <label htmlFor="name">Username</label>
            <input
              className="w-3/4 rounded bg-slate-700 p-1"
              type="text"
              name="name"
              id="name"
            />
            <div className="my-6 border-b-4"></div>
            <div className="flex justify-end gap-8">
              <button
                onClick={closeResetModal}
                className="w-1/3 rounded bg-red-500 py-2 duration-300 hover:scale-105"
                type="submit"
              >
                Cancel
              </button>

              <button
                className="w-1/3 rounded bg-green-600 py-2 duration-300 hover:scale-105"
                type="button"
              >
                Submit Score
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  )
}
