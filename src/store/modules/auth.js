const timer = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}
const state = {
  isSubmitting: false,
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  currentUser: JSON.parse(localStorage.getItem('currentIser')) || false,
  validationErrors: null,
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    localStorage.setItem('isLoggedIn', true)
    state.isLoggedIn = true
    localStorage.setItem('currentUser', JSON.stringify(payload))
    state.currentUser = payload
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  logOut(state) {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    state.isLoggedIn = false
    state.user = null
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      timer(3000).then(() => resolve(credentials))
    })
      .then(async (response) => {
        context.commit('registerSuccess', response)
      })
      .catch((result) => {
        context.commit('registerFailure', result.response.data.errors)
      })
  },
  logOut(context) {
    return new Promise((resolve) => {
      context.commit('logOut')
      resolve()
    })
  },
}

export default {
  state,
  actions,
  mutations,
  // getters
}
