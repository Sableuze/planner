<template>
  <div>
    <Navbar class="header" />
    <div class="container" :style="{paddingTop: headerHeight + 'px'}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import router from './router'
// eslint-disable-next-line
import gsap from 'gsap'
export default {
  created() {
    this.checkIsLoggedIn()
  },
  mounted() {
    this.headerHeight = document.querySelector('.header').clientHeight
  },
  computed: {},

  components: {
    Navbar,
  },
  data() {
    return {
      headerHeight: 0,
    }
  },

  methods: {
    checkIsLoggedIn() {
      if (!this.$store.state.auth.isLoggedIn) {
        router.replace({name: 'auth'}).catch(() => {})
      }
    },
  },
  watch: {
    '$route.path'() {
      this.checkIsLoggedIn()
      window.scrollTo(0, 0)
    },
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&family=Oswald:wght@500;600;700&display=swap');
body {
  font-family: 'Oswald', sans-serif !important;
}
</style>
