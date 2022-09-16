/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { update } from 'firebase/database'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'

export default function Game() {
  const context = React.useContext(ImageContext)

  const location = useLocation()
  const { mode } = location.state

  const [selectedData, setSelectedData] = React.useState({
    x: null,
    y: null,
    name: null,
  })

  useEffect(() => {
    function checkWin() {
      if (
        selectedData.x <= context.Coords[mode].topRight[0] &&
        selectedData.x >= context.Coords[mode].topLeft[0] &&
        selectedData.y <= context.Coords[mode].botRight[1] &&
        selectedData.y >= context.Coords[mode].topLeft[1]
      ) {
        // Add modal popup for entering leadboard name/score.
        console.log('Found Waldo!')
      } else {
        // Update nav main to notify did not find
        console.log('Did not find Waldo.')
      }
    }
    if (selectedData.x !== null) {
      checkWin()
    }
  }, [context.Coords, mode, selectedData])

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
  function updateState(event) {
    const posPercent = calculateClickPercent(event)

    setSelectedData((prevData) => ({
      ...prevData,
      x: posPercent[0],
      y: posPercent[1],
    }))

    console.log('Selected Data: ', selectedData)
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
        <h1 className="text-2xl">Find Waldo!</h1>
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
          onClick={updateState}
          alt=""
        />
      </div>
    </div>
  )
}
