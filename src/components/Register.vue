<template>
  <b-container class="py-5 w-75" fluid>
    <h1>Sing Up</h1>
    <form @submit.prevent="onSubmit">
      <b-container fluid>
        <b-row
          class="my-2 flex-column"
          v-for="inputItem in inputs"
          :key="inputItem"
        >
          <label :for="inputItem.id">{{ inputItem.label }}</label>

          <b-form-input
            :id="inputItem.id"
            :v-model="inputItem.id"
            :placeholder="inputItem.placeholder"
            :type="inputItem.type"
            :required="inputItem.required"
          ></b-form-input>
        </b-row>
      </b-container>
      <b-button
        type="submit"
        size="lg"
        variant="outline-danger"
        class="mt-3"
        :disabled="isSubmitting"
      >
        Register
      </b-button>
    </form>
  </b-container>
</template>

<script>
import router from '../router'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      inputs: [
        {
          id: 'username',
          type: 'text',
          placeholder: 'Sableuze...',
          label: 'Username',
          class: 'validate',
          required: true,
        },
        {
          id: 'password',
          type: 'password',
          placeholder: '',
          label: 'Password',
          class: 'validate',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          placeholder: 'example@mail.ru',
          label: 'Email',
          class: 'validate',
          required: true,
        },
      ],
    }
  },

  /* eslint-enable */
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
  },

  methods: {
    async onSubmit() {
      await this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      router.push({name: 'Home'})
    },
    checkIsValid(state) {
      this.isValid = state
    },
  },
}
</script>

<style scoped></style>
