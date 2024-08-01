import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { loggerService } from './services/logger.service.js'
import { gameService } from './services/game.service.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',

      'http://localhost:5173',
      'http://127.0.0.1:5173',

      'http://localhost:5174',
      'http://127.0.0.1:5174',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// App Configuration
app.use(express.static('public'))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body
app.use(cors(corsOptions))

// **************** Games API ****************:
// GET games
app.get('/api/game', (req, res) => {
  const filterBy = req.query
  console.log('filterBy: ', filterBy)
  // console.log(filterBy)
  gameService
    .query(filterBy)
    .then((games) => {
      res.send(games)
    })
    .catch((err) => {
      loggerService.error('Cannot load games', err)
      res.status(400).send('Cannot load games')
    })
})

app.get('/api/game/:gameId', (req, res) => {
  const { gameId } = req.params
  gameService
    .get(gameId)
    .then((game) => {
      res.send(game)
    })
    .catch((err) => {
      loggerService.error('Cannot get game', err)
      res.status(400).send(err)
    })
})

app.post('/api/game', (req, res) => {
  const { name, price, labels, inStock, companies, cover, preview } = req.body
  const game = {
    name,
    price: +price,
    labels,
    inStock,
    companies,
    cover,
    preview,
  }
  gameService
    .save(game)
    .then((savedGame) => {
      res.send(savedGame)
    })
    .catch((err) => {
      loggerService.error('Cannot add game', err)
      res.status(400).send('Cannot add game')
    })
})

app.put('/api/game', (req, res) => {
  const { name, price, _id, labels, inStock, companies, cover, preview } =
    req.body
  const game = {
    _id,
    name,
    price: +price,
    labels,
    inStock,
    companies,
    cover,
    preview,
  }
  gameService
    .save(game)
    .then((savedGame) => {
      res.send(savedGame)
    })
    .catch((err) => {
      loggerService.error('Cannot update game', err)
      res.status(400).send('Cannot update game')
    })
})

app.delete('/api/game/:gameId', (req, res) => {
  const { gameId } = req.params
  gameService
    .remove(gameId)
    .then((msg) => {
      res.send({ msg, gameId })
    })
    .catch((err) => {
      loggerService.error('Cannot delete game', err)
      res.status(400).send('Cannot delete game, ' + err)
    })
})

// Fallback
app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

// Listen will always be the last line in our server!
const port = 3030
app.listen(port, () => {
  loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})
