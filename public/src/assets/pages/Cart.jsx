import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service.js'
import { removeGameFromCart } from '../../store/actions/user.actions.js'
import { clearCart } from '../../store/actions/user.actions.js'
import { checkoutStore } from '../../store/actions/user.actions.js'

import '../css/Cart.css'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../services/event-bus.service.js'

export function Cart({ toggleCart, setScore }) {
  const user = useSelector(
    (stateSelector) => stateSelector.userModule.loggedInUser
  )
  const storeCart = useSelector(
    (stateSelector) => stateSelector.userModule.shoppingCart
  )
  console.log(storeCart)

  const navigate = useNavigate()
  const initialValue = 0

  const [localCart, setLocalCart] = useState([])

  const [quantity, setQuantity] = useState()

  const registeredGames = []

  function onRemoveFromCart(gameId) {
    removeGameFromCart(gameId)
  }

  function onAddGameToCart(game) {
    if (!game.inStock) {
      showErrorMsg('Game is not in stock')
      return
    }

    if (!user.gamesInCart) {
      showErrorMsg('Please login or create account')

      return
    }
    addGameToCart(game)
      .then(() => {
        // userService.addGameToCart(game)
        showSuccessMsg('Game added')
      })
      .catch((err) => {
        showErrorMsg(`Couldn't add game`)
      })
  }

  function onClearCart() {
    clearCart().then(() => {
      showSuccessMsg('Cart cleared')
    })
  }

  function onCartCheckout() {
    if (!user) {
      showErrorMsg('Please login first')
    }
    const sum = storeCart.reduce(
      (accu, currentGame) => accu + currentGame.price,
      initialValue
    )
    const newScore = user.score - sum
    checkoutStore(newScore).then(() => {
      setScore(newScore)
      showSuccessMsg('Order placed')
      navigate(`/user/${user._id}`)
    })
  }

  return (
    <div className='cart-container'>
      <i onClick={toggleCart} className='fa-solid fa-x x-button'></i>
      <h3>Cart</h3>
      <div className='games-in-cart-container'>
        {user &&
          storeCart.map((game) => {
            return (
              <div className='cart-item-container' key={game}>
                <button onClick={() => onRemoveFromCart(game._id)}>
                  <i className='fa-solid fa-trash'></i>
                </button>
                <div className='game-in-cart-container'>
                  <Link onClick={toggleCart} to={`/game/${game._id}`}>
                    <h4 className='game-text'>{game.name}</h4>
                  </Link>
                  <input className='game-quantity' type='number' value={1} />
                  <img src={game.cover} alt='' />
                  <span>
                    {/* {game.quantity === 1
                      ? game.price
                      : game.price * game.quantity} */}
                    {game.price}$
                  </span>
                </div>{' '}
              </div>
            )
          })}
      </div>
      <div className='sum-container'>
        <p>Subtotal:</p>
        <span>
          {user &&
            storeCart.reduce(
              (accu, currentGame) => accu + currentGame.price,
              initialValue
            )}
          $
        </span>
      </div>
      <button onClick={onClearCart}>Clear Cart</button>
      <button onClick={onCartCheckout}>
        Checkout <i className='fa-solid fa-arrow-right'></i>
      </button>
    </div>
  )
}
