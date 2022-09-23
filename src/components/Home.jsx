import React from 'react'
import { Link } from 'react-router-dom'
import { DatabaseContext } from '../context/DatabaseContext'
import waldo from '../assets/icons/waldo-icon.png'
import scores from '../assets/icons/scores-icon.svg'
import info from '../assets/icons/info-icon.svg'

export default function Home() {
  const context = React.useContext(DatabaseContext)
  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="flex items-center justify-around bg-slate-800 p-5 text-white sm:text-xl">
        <Link
          to="/leaderboard"
          className="hidden rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:block"
          type="button"
        >
          Leaderboard
        </Link>

        <Link
          to="/leaderboard"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:hidden"
          type="button"
        >
          <img className="w-3/4 invert" src={scores} alt="leaderboard-icon" />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <img className="max-h-9 rounded-md" src={waldo} alt="" />
          <h1 className="sm:text-2xl">Where's Waldo</h1>
        </div>
        <Link
          to="/info"
          className="hidden rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:block"
          type="button"
        >
          Info
        </Link>

        <Link
          to="/info"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:hidden"
          type="button"
        >
          <img className="w-3/4 invert" src={info} alt="leaderboard-icon" />
        </Link>
      </nav>
      {/* Main background */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-slate-700 sm:flex-row ">
        {/* Cards Container */}
        <Link
          style={{
            backgroundImage: `url(${context.Images.easy})`,
          }}
          className="h-1/3 w-3/4 scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:h-1/2 sm:w-1/4"
          to="/game"
          state={{ mode: 'easy' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)]">
            Easy
          </p>
        </Link>
        <Link
          style={{
            backgroundImage: `url(${context.Images.medium})`,
          }}
          className="h-1/3 w-3/4 scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:h-1/2 sm:w-1/4"
          to="/game"
          state={{ mode: 'medium' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)]">
            Medium
          </p>
        </Link>
        <Link
          style={{
            backgroundImage: `url(${context.Images.hard})`,
          }}
          className="h-1/3 w-3/4 scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:h-1/2 sm:w-1/4"
          to="/game"
          state={{ mode: 'hard' }}
        >
          <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)]">
            Hard
          </p>
        </Link>
      </div>
    </div>
  )
}
