import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'game/'

export const gameService = {
  query,
  getById,
  save,
  remove,
  getEmptygame,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
  // if (!filterBy.txt) filterBy.txt = ''
  // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
  // const regExp = new RegExp(filterBy.txt, 'i')
  // return storageService.query(STORAGE_KEY)
  //     .then(games => {
  //         return games.filter(game =>
  //             regExp.test(game.vendor) &&
  //             game.price <= filterBy.maxPrice
  //         )
  //     })
}

function getById(gameId) {
  return httpService.get(BASE_URL + gameId)
}
function remove(gameId) {
  return httpService.delete(BASE_URL + gameId)
}

function save(game) {
  if (game._id) {
    return httpService.put(BASE_URL, game)
  } else {
    return httpService.post(BASE_URL, game)
  }
}

function getEmptygame() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
    speed: utilService.getRandomIntInclusive(75, 200),
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    labels: [],
    inStock: 'all',
    companies: [],
    sortBy: '',
    pageIdx: 0,
  }
}
