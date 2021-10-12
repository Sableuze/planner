<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="danger">
      <router-link
        tag="b-navbar-brand"
        style="cursor: pointer"
        :to="{name: 'home'}"
        class="an-move-left"
        >Home</router-link
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="an-move-right" is-nav>
        <b-navbar-nav class="ml-auto align-items-center">
          <router-link tag="b-nav-item" :to="{name: 'tasks'}"
            >Tasks</router-link
          >

          <router-link tag="b-nav-item" :to="{name: 'addTask'}"
            >Add Task</router-link
          >
          <b-nav-item>
            <b-button
              v-if="isRegOrLog"
              @click.prevent="onLogOut"
              variant="success"
              >Log Out</b-button
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import router from '../router'
import gsap from 'gsap'

export default {
  name: 'Navbar',
  computed: {
    isRegOrLog() {
      switch (this.$route.name) {
        case 'register': {
          return false
        }
        case 'login': {
          return false
        }
        case 'auth': {
          return false
        }
      }
      return true
    },
  },
  methods: {
    onLogOut() {
      this.$store
        .dispatch('logOut')
        .then(() => router.go({name: 'auth'}))
        .catch(() => {})
    },
  },
  mounted() {
    gsap.fromTo(
      '.an-move-left',
      {
        x: '-100',
        opacity: 0.4,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
      }
    )
    gsap.fromTo(
      '.an-move-right',
      {
        yPercent: -50,
        opacity: 0.4,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
      }
    )
  },
}
</script>

<style lang="scss">
nav {
  padding: 0 16px;
}
.nav-link {
  color: rgba(0, 0, 0, 0.6) !important;
  font-size: 20px;
}
</style>
