/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'

export default function Game() {
  const context = React.useContext(ImageContext)
  console.log(context)

  const location = useLocation()
  const { mode } = location.state

  const [selectedData, setSelectedData] = React.useState({
    x: null,
    y: null,
    name: null,
  })

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
  function checkWin(event) {
    const posPercent = calculateClickPercent(event)

    setSelectedData((prevData) => ({
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
        <h1 className="text-2xl">Find Waldo!</h1>
        <Link
          to="/info"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Info
        </Link>
      </nav>
      <div className="flex flex-col items-center gap-8 bg-slate-700 py-8">
        <img
          src={context.Images[mode]}
          className="w-5/6 rounded-2xl"
          onClick={checkWin}
          alt=""
        />
      </div>
    </div>
  )
}
