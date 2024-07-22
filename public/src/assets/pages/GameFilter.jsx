import { useEffect, useState, useRef } from 'react'

import { setFilterBy } from '../../store/actions/game.actions.js'
import { utilService } from '../../services/util.service.js'

import { Button } from '@mui/material'

import '../css/GameFilter.css'

export function GameFilter({ filterBy }) {
  const labels = [
    'Adventure',
    'RPG',
    'Action',
    'Platformer',
    'Sandbox',
    'Survival',
    'Shooter',
    'Battle Royale',
    'Simulation',
    'Social',
    'Party',
    'Social Deduction',
    'Roguelike',
    'Fighting',
    'Racing',
  ]
  const companies = ['Sony', 'Nintendo', 'Microsoft']
  const [isFiltering, setIsFiltering] = useState(false)
  const [isStock, setIsStock] = useState(false)

  const [onFilterBy, setOnFilterBy] = useState(filterBy)
  const debouncedSetFilter = useRef(utilService.debounce(setOnFilterBy, 500))

  //   const isCheckRef = useRef()

  useEffect(() => {
    console.log(onFilterBy)
    setFilterBy(onFilterBy)
  }, [onFilterBy])

  function onSetIsFiltering() {
    setIsFiltering((prevIsFiltering) => (prevIsFiltering = !prevIsFiltering))
  }

  function onIsSetStock() {
    const currentOnlyIsStock = !isStock
    if (currentOnlyIsStock) {
      setOnFilterBy({ ...onFilterBy, inStock: 'onlyInStock', pageIdx: 0 })
    } else {
      setOnFilterBy({ ...onFilterBy, inStock: 'all', pageIdx: 0 })
    }
    setIsStock(currentOnlyIsStock)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    let checkedButton = target.id

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        if (field === 'companies') {
          if (filterBy.companies.includes(checkedButton)) {
            const idx = onFilterBy.companies.findIndex(
              (company) => company === checkedButton
            )
            onFilterBy.companies.splice(idx, 1)
          } else {
            onFilterBy.companies.push(checkedButton)
          }
          setOnFilterBy({ ...onFilterBy, pageIdx: 0 })
        }
        if (field === 'labels') {
          if (filterBy.labels.includes(checkedButton)) {
            const idx = onFilterBy.labels.findIndex(
              (label) => label === checkedButton
            )
            onFilterBy.labels.splice(idx, 1)
          } else {
            onFilterBy.labels.push(checkedButton)
          }
          setOnFilterBy({ ...onFilterBy, pageIdx: 0 })
        }
        return
        break

      default:
        break
    }
    console.log(field)
    console.log(value)

    debouncedSetFilter.current((prevFilter) => ({
      ...prevFilter,
      [field]: value,
      pageIdx: 0,
    }))
  }

  function onClearFilter() {
    setOnFilterBy({
      ...onFilterBy,
      txt: '',
      maxPrice: '',
      labels: [],
      inStock: 'all',
      companies: [],
    })
  }

  return (
    <div className='filtering-container'>
      <Button
        variant='contained'
        className='is-filtering-button'
        onClick={() => onSetIsFiltering()}
      >
        Filter
      </Button>
      <input
        className='is-filtering-checkbox'
        type='checkbox'
        name=''
        id='filter'
        checked={isFiltering}
        // ref={isCheckRef}
      />

      <div className='game-filter'>
        <button className='x-button' onClick={() => onSetIsFiltering()}>
          X
        </button>
        <button onClick={onClearFilter}>Clear Filter</button>
        <div className='text-container'>
          <label htmlFor='name'>Game Title:</label>
          <input onChange={handleChange} type='search' id='name' name='txt' />
        </div>
        <div className='price-container'>
          <label htmlFor='price'>Max Price</label>
          <input
            onChange={handleChange}
            type='range'
            id='price'
            min={1}
            max={150}
            name='maxPrice'
          />
        </div>
        <div className='in-stock-container'>
          <label htmlFor='stock'>Only In Stock</label>
          <input
            onClick={() => onIsSetStock()}
            type='checkbox'
            name=''
            id='stock'
            checked={isStock}
          />
        </div>
        <h4>Company:</h4>
        <div className='companies-container'>
          {companies.map((company) => {
            return (
              <div className='transparent-checkbox company-container'>
                <label htmlFor={company}>{company}</label>
                <input
                  onChange={handleChange}
                  type='checkbox'
                  name='companies'
                  id={company}
                />
              </div>
            )
          })}
        </div>
        <h4>Categories:</h4>
        <div className='labels-container'>
          {labels.map((label) => {
            return (
              <div className='transparent-checkbox label-container'>
                <label htmlFor={label}>{label}</label>
                <input
                  onChange={handleChange}
                  type='checkbox'
                  name='labels'
                  id={label}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
// return { txt: '', maxPrice: '', labels: [], inStock: 'all', company: 'all' }
