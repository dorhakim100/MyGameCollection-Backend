import ps5ControllerWhite from '/ps.png'
import nintendoSwitchWhite from '/switch.png'
import xboxControllerWhite from '/xbox.png'
import ps5ControllerBlack from '/ps5Black.svg'
import nintendoSwitchBlack from '/switchBlack.svg'
import xboxControllerBlack from '/xboxBlack.svg'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setFilterBy } from '../../store/actions/game.actions.js'

import '../css/Home.css'

export function Home() {
  const filterBy = useSelector((storeState) => storeState.gameModule.filterBy)
  const navigate = useNavigate()

  function onSelectCompany(company) {
    setFilterBy({ ...filterBy, companies: [company], pageIdx: 0 })
    navigate(`/game`)
  }
  return (
    <section>
      <h2>"Your Ultimate Destination for Gaming Excellence!"</h2>
      <h4>Choose your console</h4>
      <div className='controllers-container'>
        <img
          onClick={() => onSelectCompany('Sony')}
          src={ps5ControllerWhite}
          className='logo'
          alt=''
        />
        <img
          onClick={() => onSelectCompany('Nintendo')}
          src={nintendoSwitchWhite}
          className='logo'
          alt=''
        />
        <img
          onClick={() => onSelectCompany('Microsoft')}
          src={xboxControllerWhite}
          className='logo'
          alt=''
        />
      </div>
    </section>
  )
}
