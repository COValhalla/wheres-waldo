import React from 'react'
import { Link } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'
import easy from '../assets/easy.jpg'
import medium from '../assets/medium.jpeg'
import hard from '../assets/hard.jpeg'

export default function Home() {
  const context = React.useContext(ImageContext)
  console.log(context)
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
        <Link
          style={{
            backgroundImage: `url(${context.easy})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          to="/game"
          state={{ mode: 'easy' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Easy
          </p>
        </Link>
        <Link
          style={{
            backgroundImage: `url(${context.medium})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          to="/game"
          state={{ mode: 'medium' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Medium
          </p>
        </Link>
        <Link
          style={{
            backgroundImage: `url(${context.hard})`,
          }}
          className="h-1/2 w-1/4 scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100"
          to="/game"
          state={{ mode: 'hard' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
            Hard
          </p>
        </Link>
      </div>
    </div>
  )
}
