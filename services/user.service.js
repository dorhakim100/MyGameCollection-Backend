import fs from 'fs'
import { utilService } from './util.service.js'

const users = utilService.readJsonFile('data/user.json')

export const userService = {
  query,
  get,
  remove,
  save,
}

function query() {
  return Promise.resolve(users)
}

function get(userId) {
  const user = users.find((user) => user._id === userId)
  if (!user) return Promise.reject('User not found')
  return Promise.resolve(user)
}

function remove(userId) {
  const idx = users.findIndex((user) => user._id === userId)
  if (idx === -1) return Promise.reject('No such user')
  users.splice(idx, 1)
  return _saveUserToFile()
}

function save(user) {
  if (user._id) {
    const idx = users.findIndex((currUser) => currUser._id === user._id)
    users[idx] = { ...users[idx], ...user }
  } else {
    user._id = _makeId()
    users.unshift(user)
  }
  return _saveUsersToFile().then(() => user)
}

function _makeId(length = 5) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function _saveUsersToFile() {
  return new Promise((resolve, reject) => {
    const usersStr = JSON.stringify(users, null, 4)
    fs.writeFile('data/user.json', usersStr, (err) => {
      if (err) {
        return console.log(err)
      }
      resolve()
    })
  })
}
