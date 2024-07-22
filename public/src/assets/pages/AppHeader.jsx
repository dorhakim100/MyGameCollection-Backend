import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { Cart } from './Cart.jsx'

import { userService } from '../../services/user.service.js'
import { login, signup, logout } from '../../store/actions/user.actions.js'

import { showErrorMsg } from '../../services/event-bus.service.js'

import icon from '/game-controller.svg'

import '../css/AppHeader.css'

export function AppHeader() {
  const navigate = useNavigate()

  const [user, setUser] = useState(userService.getLoggedinUser())

  const [isCart, setIsCart] = useState(false)
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [score, setScore] = useState(0)

  const storeCart = useSelector(
    (stateSelector) => stateSelector.userModule.shoppingCart
  )
  console.log(storeCart)

  const [cartLength, setCartLength] = useState(0)

  // useEffect(() => {
  // }, [user])

  function onSetUser(user) {
    setUser(user)
    setScore(user.score)
    navigate(`/`)
  }

  function onLogout() {
    // userService
    //   .logout()
    //   .then(() => {
    //     onSetUser(null)
    //   })
    //   .catch((err) => {
    //     showErrorMsg('OOPs try again')
    //   })
    logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function toggleCart() {
    if (isLoginPage)
      setIsLoginPage((prevIsLoginPage) => (prevIsLoginPage = !prevIsLoginPage))

    setIsCart((prevIsCart) => (prevIsCart = !prevIsCart))
  }
  function toggleLoginPage() {
    if (isCart) setIsCart((prevIsCart) => (prevIsCart = !prevIsCart))

    setIsLoginPage((prevIsLoginPage) => (prevIsLoginPage = !prevIsLoginPage))
  }
  return (
    <header className='app-header'>
      <section className='header-container'>
        <div className='logo-container'>
          <h1>Game Store</h1>
          <img className='icon' src={icon} alt='' />
        </div>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/game'>Games</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
          <NavLink to='/about'>About</NavLink>
        </nav>
        {user ? null : (
          <section>
            {isLoginPage && (
              <LoginSignup
                onSetUser={onSetUser}
                toggleLoginPage={toggleLoginPage}
              />
            )}
          </section>
        )}
        {(!user && (
          <button onClick={toggleLoginPage}>
            <i className='fa-solid fa-user'></i>
          </button>
        )) || (
          <section className='login-container'>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            {user && <span>{score}$</span>}
            <button onClick={onLogout}>Logout</button>
          </section>
        )}
        <div className='cart-button-container'>
          <button onClick={toggleCart} className='cart-button'>
            <i className='fa-solid fa-cart-shopping'></i>
          </button>
          {storeCart.length > 0 && (
            <div className='cart-quantity'>{storeCart.length}</div>
          )}
        </div>
      </section>
      {isCart && <Cart toggleCart={toggleCart} setScore={setScore} />}
      <UserMsg />
    </header>
  )
}
