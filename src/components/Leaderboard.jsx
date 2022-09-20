import React from 'react'
import { Link } from 'react-router-dom'
import { ImageContext } from '../context/ImageContext'

export default function Leaderboard() {
  const context = React.useContext(ImageContext)
  const [selectedMode, setSelectedMode] = React.useState(null)

  function updateMode(event) {
    setSelectedMode(event.target.childNodes[0].textContent)
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

        <h1 className="text-2xl">Leaderboard</h1>

        <Link
          to="/info"
          className="rounded p-1 text-white duration-200 ease-in hover:bg-gray-500"
          type="button"
        >
          Info
        </Link>
      </nav>
      <div className="flex min-h-screen flex-col bg-slate-700 text-white">
        <div className="flex justify-center gap-4 p-8">
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.easy})`,
            }}
            className={`min-h-[25vh] min-w-[25vw] scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100 ${
              selectedMode === 'Easy' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
              Easy
            </p>
          </button>
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.medium})`,
            }}
            className={`min-h-[25vh] min-w-[25vw] scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100 ${
              selectedMode === 'Medium' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
              Medium
            </p>
          </button>
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.hard})`,
            }}
            className={`min-h-[25vh] min-w-[25vw] scale-95 rounded bg-cover bg-center bg-no-repeat  duration-300 hover:scale-100 ${
              selectedMode === 'Hard' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:3px_theme(colors.black)]">
              Hard
            </p>
          </button>
        </div>
        {selectedMode !== null && (
          <div className="mx-auto rounded-md bg-blue-800 px-4 py-2">
            {selectedMode}
          </div>
        )}
      </div>
    </div>
  )
}
