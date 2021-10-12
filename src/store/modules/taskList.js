const state = {
  tasks: JSON.parse(localStorage.getItem('tasks')).map(validateTask) || [],
}

const mutations = {
  addTask(state, payload) {
    state.tasks.push(payload)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  updateTask(state, {title, id, description, date}) {
    const tasks = state.tasks.concat()
    console.log(title, id, description, date)
    const idx = tasks.findIndex((t) => t.id == id)

    const task = tasks[idx]

    const status =
      new Date(date).toLocaleDateString() >= new Date().toLocaleDateString()
        ? 'active'
        : 'outdated'
    tasks[idx] = {...task, title, date, description, status}
    state.tasks = tasks
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  completeTask(state, id) {
    const tasks = state.tasks.concat()
    const idx = tasks.findIndex((t) => t.id == id)

    tasks[idx].status = 'completed'

    state.tasks = tasks
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
  deleteTask(state, id) {
    const tasks = state.tasks.concat()
    const idx = tasks.findIndex((t) => t.id == id)
    delete tasks[idx]
    state.tasks = tasks.filter((i) => i)
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  },
}
const actions = {
  addTask(context, task) {
    context.commit('addTask', task)
  },

  updateTask(context, data) {
    context.commit('updateTask', data)
  },

  deleteTask(context, id) {
    context.commit('deleteTask', id)
  },

  completeTask(context, id) {
    context.commit('completeTask', id)
  },
}
const getters = {
  getTaskById: (state) => (id) => {
    return state.tasks.find((t) => t.id == id)
  },
  dateToday: () => () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  },
}
function validateTask(value) {
  if (value) {
    if (value.status == 'active') {
      value.status =
        new Date(value.date).toLocaleDateString() >=
        new Date().toLocaleDateString()
          ? 'active'
          : 'outdated'
    }
    return value
  }
}
export default {
  state,
  actions,
  mutations,
  getters,
}
