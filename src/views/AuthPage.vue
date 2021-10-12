<template>
  <div>
    <div v-if="!choice" class="container">
      <div class="auth-title">
        You have to <u> register </u> or <u> log in </u>
      </div>
      <div class="buttons">
        <b-button size="lg" @click="register" variant="outline-danger"
          >Register</b-button
        >
        <b-button size="lg" variant="outline-danger"> Sign In</b-button>
      </div>
    </div>
    <button @click="show = !show" class="btn btn-primary">SHOWW</button>
    <transition name="fade">
      <p v-if="show">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolores
        ea, enim facere fuga fugiat impedit magnam, mollitia omnis perspiciatis
        quidem, quis sit veniam! Dicta hic nulla perferendis quaerat
        voluptatibus.
      </p>
    </transition>
    <transition name="fade"> <Register v-if="isRegister" /></transition>
    <div class="h1" v-if="isRegister"></div>
  </div>
</template>

<script>
import Register from '../components/Register'
export default {
  name: 'AuthPage',
  data() {
    return {
      choice: '',
      show: false,
    }
  },
  components: {
    Register,
  },
  computed: {
    isRegister() {
      return this.choice == 'register'
    },
    isLogin() {
      return this.choice == 'login'
    },
  },

  methods: {
    register() {
      this.choice = 'register'
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
}
.auth-title {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
