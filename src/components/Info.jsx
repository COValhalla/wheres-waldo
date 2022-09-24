import React from 'react'
import { Link } from 'react-router-dom'
import scores from '../assets/icons/scores-icon.svg'
import waldo from '../assets/icons/waldo-icon.png'
import home from '../assets/icons/home-icon.svg'

export default function Info() {
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
          to="/"
          className="hidden rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:block"
          type="button"
        >
          Home
        </Link>

        <Link
          to="/"
          className="rounded p-1 duration-200 ease-in hover:bg-gray-500 sm:hidden"
          type="button"
        >
          <img className="w-3/4 invert" src={home} alt="leaderboard-icon" />
        </Link>
      </nav>
      <div className="flex flex-1 flex-col justify-center gap-4 bg-slate-700 sm:flex-row ">
        <div className="m-4 h-fit bg-slate-800 py-4 px-8 text-white">
          <h1 className="text-sm sm:text-lg">
            This project was made by{' '}
            <a className="font-bold" href="https://github.com/COValhalla">
              COValhalla
            </a>{' '}
            for The Odin Project
          </h1>
          <ul className="list-disc px-3 py-3 text-xs sm:text-base">
            <li>Front-end built using TailwindCSS and React</li>
            <li>Firebase-firestore utilized for back-end</li>
            <li>Automatic updating global leaderboard for each game mode</li>
            <li>Profanity filter for leaderboard submissions.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
