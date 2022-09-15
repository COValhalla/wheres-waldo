import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="">
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
      <div className="h-screen w-full  bg-slate-700 ">
        {/* Cards Container */}
        <div className="flex justify-center gap-8 text-white ">
          <button type="button">Easy</button>
          <button type="button">Medium</button>
          <button type="button">Hard</button>
        </div>
      </div>
    </div>
  )
}
