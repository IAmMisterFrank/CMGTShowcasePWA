let dbPromise = idb.open('projects-store', 1, (db) => {
  if (!db.objectStoreNames.contains('projects')) {
    db.createObjectStore('projects', {
      keyPath: '_id'
    })
  }
})

function writeData(st, data) {
  return dbPromise
    .then((db) => {
      let transaction = db.transaction(st, 'readwrite')
      let store = transaction.objectStore(st)
      store.put(data)
      return transaction.complete
    })
}

function readAllData(st) {
  return dbPromise
    .then((db) => {
      let tx = db.transaction(st, 'readonly')
      let store = tx.objectStore(st)
      return store.getAll()
    })
    .catch((err) => {
      console.log('[Utility] Error: ', err)
    })
}

function clearAllData(st) {
  return dbPromise
    .then((db) => {
      let tx = db.transaction(st, 'readwrite')
      let store = tx.objectStore(st)
      store.clear()
      console.log('[Utility] Store cleared.')
      return tx.complete
    })
}

function clearSingleData(st, id) {
  return dbPromise
    .then((db) => {
      let transaction = db.transaction(st, 'readwrite')
      let store = transaction.objectStore(st)
      store.delete(id)
      return transaction.complete
    })
    .then(() => {
      console.log("[Utility] Item " + id + " deleted")
    })
}

function createOfflineNotification() {
  let offlineArea = document.querySelector('.showcase')
  offlineArea.textContent = "CMGT Showcase (Offline)"
}

function clearOfflineNotification(){
  let offlineArea = document.querySelector('.showcase')
  offlineArea.textContent = "CMGT Showcase"
}