/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import Info from './components/Info'
import { ImageContextProvider } from './context/ImageContext'

function App() {
  return (
    <ImageContextProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ImageContextProvider>
  )
}

export default App
