import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { AppHeader } from './assets/pages/AppHeader.jsx'
import { Home } from './assets/pages/Home.jsx'
import { GameIndex } from './assets/pages/GameIndex.jsx'
import { GameDetails } from './assets/pages/GameDetails.jsx'
import { GameEdit } from './assets/pages/GameEdit.jsx'

import { store } from '../src/store/store.js'

export function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router>
          <section className='app main-layout'>
            <AppHeader />
            <main>
              <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/about' element={<About />}> */}
                {/* <Route path='team' element={<AboutTeam />} />
                  <Route path='vision' element={<AboutVision />} /> */}
                {/* </Route> */}
                <Route path='/game/:gameId' element={<GameDetails />} />
                <Route path='/game/edit/:gameId' element={<GameEdit />} />
                <Route path='/game/edit' element={<GameEdit />} />
                <Route path='/game' element={<GameIndex />} />
                {/* <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/user/:userId' element={<UserDetails />} /> */}
              </Routes>
            </main>
          </section>
        </Router>
      </Provider>
    </>
  )
}