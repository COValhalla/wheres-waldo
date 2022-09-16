import React from 'react'
import { Link } from 'react-router-dom'
import easy from '../assets/easy.jpg'
import medium from '../assets/medium.jpeg'
import hard from '../assets/hard.jpeg'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="flex items-center justify-around bg-slate-800 p-5 text-xl text-white">
        <button
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Leaderboard
        </button>
        <h1 className="text-2xl">Where's Waldo</h1>
        <button
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Info
        </button>
      </nav>
      {/* Main background */}
      <div className="flex flex-1 items-center justify-center gap-4 bg-slate-700 ">
        {/* Cards Container */}

        <button
          style={{
            backgroundImage: `url(${easy})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          type="button"
        >
          <p className="text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Easy
          </p>
        </button>

        <button
          style={{
            backgroundImage: `url(${medium})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          type="button"
        >
          <p className="text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Medium
          </p>
        </button>
        <button
          style={{
            backgroundImage: `url(${hard})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          type="button"
        >
          <p className="text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Hard
          </p>
        </button>
      </div>
    </div>
  )
}
