import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'

import icon from '/game-controller.svg'

import '../css/AppHeader.css'

export function AppHeader() {
  return (
    <header className='app-header'>
      <section className='header-container'>
        <div className='logo-container'>
          <h1>Game Store</h1>
          <img className='icon' src={icon} alt='' />
        </div>
        {/* {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )} */}
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/game'>Games</NavLink>
          <NavLink to='/about'>About</NavLink>
        </nav>
      </section>

      <UserMsg />
    </header>
  )
}
