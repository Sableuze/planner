<template>
  <div class="hello">
    Hello. <br />
    It is your own diary <br />
    Enjoy it
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: 'Home',
  components: {},
  computed: {
    getTaskList() {
      return this.$store.state.taskList
    },
  },
  mounted() {
    gsap.fromTo(
      '.hello',
      {fontSize: 6},
      {fontSize: 60, lineHeight: 1.5, duration: 1}
    )
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
}
</style>
