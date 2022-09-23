/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import Info from './components/Info'
import Leaderboard from './components/Leaderboard'
import { DatabaseContextProvider } from './context/DatabaseContext'

function App() {
  return (
    <DatabaseContextProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/info" element={<Info />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DatabaseContextProvider>
  )
}

export default App
