/* eslint-disable no-unused-vars */
// 基于HTML5 indexDB的本地数据库
// 在云端数据库上线后可作为本地与云端之间的缓存，减少服务器更新压力，因此取名cache.js

var db

const config = {
  database: 'simple-note',
  version: 5
}

const tables = {
  note: ['tags', 'content', 'state', 'createdAt'],
  calendar: ['title', 'start', 'end', 'YOUR_DATA', 'className', 'state', 'createdAt']
}

let key = 0

// 连接数据库并初始化
const connect = () => {
  if (db) return console.log('db already connected')

  const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB

  if (!indexedDB) return alert('你的浏览器版本太旧，将导致本站无法正常使用')

  const connection = indexedDB.open(config.database, config.version)

  connection.onsuccess = (e) => {
    db = e.target.result
    console.log('***** indexDB connected ******')
  }

  connection.onerror = (e) => {
    console.log(e.currentTarget.error.message)
    alert('缓存加载失败，请刷新页面')
  }

  connection.onupgradeneeded = (e) => {
    console.log('db initialization')
    db = e.target.result

    // note: {  // note表
    //   _id,  // note id，用于表间索引
    //   tags,  // 内容
    //   content,  // 标签
    //   state,  // 状态
    //   createdAt // 创建时间
    // }

    createTable(tables)
  }
}

const createTable = (tables) => {
  for (const table in tables) {
    if (tables.hasOwnProperty(table)) {
      const element = tables[table]
      if (!db.objectStoreNames.contains(table)) {
        let objectStore = db.createObjectStore(table, {
          keyPath: '_id',
          autoIncrement: true
        })
        element.map((item) => {
          if (typeof (item) === 'string') {
            objectStore.createIndex(item, item, {
              unique: false
            })
          }
        })
        console.log(`${table} table created`)
      }
    }
  }
}

const getData = (table) => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('db not connected'))

    let transaction = db.transaction(table)

    let store = transaction.objectStore(table)

    const res = []
    store.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        if (cursor.value.state) {
          res.push(cursor.value)
        }
        cursor.continue()
      } else {
        resolve(res)
      }
    }
  })
}

const createNotes = (tags, content) => {
  const data = {
    tags: tags,
    content: content,
    state: 1,
    createdAt: new Date().toLocaleString()
  }
  return createData('note', data)
}

const createEvent = (title, content, date) => {
  const data = {
    title: title,
    YOUR_DATA: content,
    start: date[0],
    end: date[1],
    state: 1,
    createdAt: new Date().toLocaleString()
  }
  return createData('calendar', data)
}

const deleteNotes = (_id) => {
  return deleteData('note', _id)
}

const deleteEvent = (_id) => {
  return deleteData('calendar', _id)
}

const finishEvent = (_id, data) => {
  return updateData('calendar', _id, data)
}

const createData = (table, data) => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('db not connected'))

    let transaction = db.transaction(table, 'readwrite')

    let store = transaction.objectStore(table)

    let request = store.add(data)

    request.onsuccess = (e) => {
      let res = e.target.result
      resolve(res)
    }

    request.onerror = (e) => {
      reject(e.target.error)
    }
  })
}

const deleteData = (table, _id) => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('db not connected'))

    let transaction = db.transaction(table, 'readwrite')

    let store = transaction.objectStore(table)

    let request = store.delete(_id)

    request.onsuccess = (e) => {
      let res = e.target.result
      resolve(res)
    }

    request.onerror = (e) => {
      reject(e.target.error)
    }
  })
}

const updateData = (table, _id, data) => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('db not connected'))

    let transaction = db.transaction(table, 'readwrite')

    let store = transaction.objectStore(table)

    let request = store.put({ _id: _id, ...data })

    request.onsuccess = (e) => {
      let res = e.target.result
      resolve(res)
    }

    request.onerror = (e) => {
      reject(e.target.error)
    }
  })
}

// 用户登录，如果username未被注册则注册新用户
const userLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('db not connected'))

    let transaction = db.transaction('user', 'readwrite')

    let store = transaction.objectStore('user')

    let request = store.index('username').get(username.toLowerCase())

    request.onsuccess = (e) => {
      let user = e.target.result
      if (user) {
        // username registered
        if (password === user.password) resolve(e.target.result)
        else return reject(new Error('password'))
      } else {
        // username not exist, create new user
        user = {
          username,
          password,
          createdAt: Date.now()
        }

        let addRequest = store.add(user)

        addRequest.onsuccess = (e) => {
          console.log('new user created')
          resolve({
            _id: e.target.result,
            ...user
          })
        }

        addRequest.onerror = (e) => {
          reject(e.target.error)
        }
      }
    }

    request.onerror = (e) => {
      reject(e.target.error)
    }
  })
}

const cache = {
  connect,
  userLogin,
  getData,
  createNotes,
  deleteNotes,
  createEvent,
  deleteEvent,
  finishEvent
}

connect()

export default cache
