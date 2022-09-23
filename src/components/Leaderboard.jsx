import React from 'react'
import { Link } from 'react-router-dom'
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore'
import { DatabaseContext, database } from '../context/DatabaseContext'

export default function Leaderboard() {
  const context = React.useContext(DatabaseContext)
  const [selectedMode, setSelectedMode] = React.useState(null)
  const [leaderboard, setLeaderboard] = React.useState(null)

  function updateMode(event) {
    setSelectedMode(event.target.childNodes[0].textContent.toLowerCase())
  }

  // Retrieves ordered scores, updates on changes
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
          <div className="mx-auto rounded-md bg-blue-900 px-4 py-2">
            {selectedMode}
          </div>
        )}
        <table className=" mx-auto my-8 w-5/6 border-2">
          <thead className="border-2 bg-slate-800 text-lg font-bold">
            <tr className="">
              <th>Place</th>
              <th>Name</th>
              <th>Time (seconds)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{scores}</tbody>
        </table>
      </div>
    </div>
  )
}
