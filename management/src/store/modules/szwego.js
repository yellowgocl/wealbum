import szwego from '@/api/szwego'
const { user } = szwego

const state = {
}

const mutations = {
}

const actions = {
  // user add
  userAdd({ commit }, info) {
    const { username, password } = info
    return new Promise((resolve, reject) => {
      user.add({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user remove
  userRemove({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      user.remove({ id })
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user edit
  userEdit({ commit }, info) {
    return new Promise((resolve, reject) => {
      const { username, password } = info
      user.edit({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user info
  userInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      user.info(id)
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user list
  userList({ commit }) {
    return new Promise((resolve, reject) => {
      user.list()
        .then((response) => {
          const { data } = response
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
