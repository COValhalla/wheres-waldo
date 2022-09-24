import React from 'react'
import { Link } from 'react-router-dom'
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore'
import { DatabaseContext, database } from '../context/DatabaseContext'
import home from '../assets/icons/home-icon.svg'
import info from '../assets/icons/info-icon.svg'

export default function Leaderboard() {
  const context = React.useContext(DatabaseContext)

  const [selectedMode, setSelectedMode] = React.useState('easy')
  const [leaderboard, setLeaderboard] = React.useState(null)

  function updateMode(event) {
    setSelectedMode(event.target.childNodes[0].textContent.toLowerCase())
  }

  // Retrieves scores from firebase
  const leaderboardRef = collection(database, 'leaderboard')
  const q = query(leaderboardRef, orderBy('time'))
  onSnapshot(q, (snapshot) => {
    const results = {
      easy: [],
      medium: [],
      hard: [],
    }
    snapshot.docs.forEach((doc) => {
      const { mode } = doc.data()
      results[mode].push({ ...doc.data(), id: doc.id })
    })
    setLeaderboard(results)
  })

  let scores
  if (leaderboard !== null && selectedMode !== null) {
    scores = leaderboard[selectedMode].map((score, index) => (
      <tr key={score.id} className="text-center">
        <td>{index + 1}</td>
        <td>{score.name}</td>
        <td>{score.time}</td>
        <td>{score.date}</td>
      </tr>
    ))
  }

  return (
    <div className="flex flex-col">
      <nav className="flex items-center justify-around bg-slate-800 p-5 text-lg text-white sm:text-xl">
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
        Leaderboard
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
      <div className="flex min-h-screen flex-col bg-slate-700 text-white">
        <div className="flex flex-col justify-center gap-4 p-8 sm:flex-row">
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.easy})`,
            }}
            className={`min-h-[10vh] scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:min-h-[25vh] sm:min-w-[25vw] ${
              selectedMode === 'easy' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)] ">
              Easy
            </p>
          </button>
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.medium})`,
            }}
            className={`min-h-[10vh] scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:min-h-[25vh] sm:min-w-[25vw] ${
              selectedMode === 'medium' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)]">
              Medium
            </p>
          </button>
          <button
            type="button"
            onClick={updateMode}
            style={{
              backgroundImage: `url(${context.Images.hard})`,
            }}
            className={`min-h-[10vh] scale-95 rounded bg-cover bg-center bg-no-repeat duration-300 hover:scale-100  sm:min-h-[25vh] sm:min-w-[25vw] ${
              selectedMode === 'hard' ? 'scale-100' : ''
            }`}
          >
            <p className="text-center text-3xl font-bold text-white [-webkit-text-stroke:1px_theme(colors.black)]">
              Hard
            </p>
          </button>
        </div>
        {selectedMode !== null && (
          <div className="mx-auto rounded-md bg-blue-900 px-4 py-2">
            {selectedMode}
          </div>
        )}
        {selectedMode !== null && (
          <table className="mx-auto my-8 border-2">
            <thead className="border-2 bg-slate-800 text-sm font-bold sm:text-lg">
              <tr className="">
                <th>Place</th>
                <th>Name</th>
                <th>Time (seconds)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{scores}</tbody>
          </table>
        )}
      </div>
    </div>
  )
}
