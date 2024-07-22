import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { gameService } from '../../services/game.service.js'
import { removeGame } from '../../store/actions/game.actions.js'
import { userService } from '../../services/user.service.js'

export function UserDetails() {
  const [user, setUser] = useState(userService.getLoggedinUser())

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <section>
      <h2>Hello {user && user.fullname}</h2>
    </section>
  )
}
