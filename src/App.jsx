/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import jackson from './assets/jackson.jpeg'

function testModal(event) {
  const clickPos = [
    event.pageX - event.target.offsetLeft,
    event.pageY - event.target.offsetTop,
  ]

  return (
    <div>
      <button type="button">Jackson</button>
      <button type="button">Jake</button>
    </div>
  )
}

function selectTarget(event) {}

// Determines client x/y and resulting click position x/y
function checkPos(event) {
  const targetJackson = {
    topLeft: [36.25, 61.7],
    topRight: [61.25, 61.67],
    botLeft: [36.25, 100],
    botRight: [61.25, 100],
  }

  const width = event.target.clientWidth
  const height = event.target.clientHeight

  const posPercent = [(clickPos[0] / width) * 100, (clickPos[1] / height) * 100]

  if (
    posPercent[0] <= targetJackson.topRight[0] &&
    posPercent[0] >= targetJackson.topLeft[0] &&
    posPercent[1] <= targetJackson.botRight[1] &&
    posPercent[1] >= targetJackson.topLeft[1]
  ) {
    console.log('Identified Jackson!')
  } else {
    console.log('Did not find Jackson')
  }
}

function App() {
  return (
    <div>
      <div className="relative w-1/2">
        <img
          className="absolute m-12 w-auto"
          src={jackson}
          onClick={checkPos}
          alt=""
        />
      </div>
      <div className="flex w-24 flex-col bg-red-100 text-xs">
        <button type="button">Jackson</button>
        <button type="button">Jake</button>
      </div>
    </div>
  )
}

export default App
