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
          className=" h-1/2 w-1/4 scale-90 rounded bg-cover bg-center bg-no-repeat text-3xl font-bold text-black duration-200 hover:scale-100"
          type="button"
        >
          Easy
        </button>

        <button
          style={{
            backgroundImage: `url(${medium})`,
          }}
          className="h-1/2 w-1/4 scale-90 rounded bg-cover bg-center bg-no-repeat text-3xl font-bold text-black duration-200 hover:scale-100"
          type="button"
        >
          Medium
        </button>
        <button
          style={{
            backgroundImage: `url(${hard})`,
          }}
          className="h-1/2 w-1/4 scale-90 rounded bg-cover bg-center bg-no-repeat text-3xl font-bold text-black  duration-200 hover:scale-100"
          type="button"
        >
          Hard
        </button>
      </div>
    </div>
  )
}
