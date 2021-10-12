<template>
  <b-container class="py-5 w-75" fluid>
    <h1 class="mb-2">Add a new task</h1>
    <form @submit.prevent="onSubmit">
      <b-form-row class="flex flex-column gap">
        <b-row no-gutters class="my-2 flex-column">
          <label for="title">Title</label>
          <b-form-input
            placeholder="Complete the project..."
            v-model="title"
            id="title"
            type="text"
            size="lg"
            required
          />
        </b-row>
        <b-row no-gutters class="my-2 flex-column">
          <label for="tags">Enter new tags separated by space</label>
          <b-form-tags
            input-id="tags"
            :input-attrs="{'aria-describedby': 'tags-remove-on-delete-help'}"
            v-model="tags"
            tag-variant="warning"
            size="lg"
            separator=" "
            placeholder="Enter new tags separated by space"
            remove-on-delete
          ></b-form-tags>
        </b-row>
        <b-row no-gutters class="my-2 flex-column">
          <b-form-textarea
            class="mb-1"
            @keydown="onKeyDown()"
            id="textarea"
            v-model="description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <div class="align-self-end">
            {{ this.description.length + '/' + this.maxNumberOfWords }}
          </div>
        </b-row>
        <b-row no-gutters class="my-2 flex-column">
          <label for="date">Deadline</label>
          <b-form-datepicker
            id="date"
            v-model="date"
            class="mb-2"
            selected-variant="warning"
            today-variant="danger"
            :state="!!date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :min="dateToday"
          ></b-form-datepicker>
        </b-row>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-5 py-2 btn btn-warning align-self-center"
        >
          Add the task
        </button>
      </b-form-row>
    </form>
  </b-container>
</template>

<script>
export default {
  name: 'AddTask',

  data() {
    return {
      title: '',
      description: '',
      tags: null,
      date: null,
      maxNumberOfWords: 2048,
    }
  },

  computed: {
    isSubmitting() {
      return this.$store.state.isSubmitting
    },
    dateToday() {
      return this.$store.getters.dateToday()
    },
  },
  methods: {
    onKeyDown() {
      if (this.description.length >= this.maxNumberOfWords) {
        this.description = this.description.substr(0, this.maxNumberOfWords)
      }
    },
    async onSubmit() {
      await this.$store.dispatch('addTask', {
        id: Date.now(),
        title: this.title,
        status: 'active',
        tags: this.tags,
        description: this.description,
        date: this.date,
      })
      this.$router.push({name: 'tasks'})
    },
  },
}
</script>

<style lang="scss">
h1 {
  margin-bottom: 60px;
}
.text-field {
  margin-top: 32px;
}
#textarea {
}
.datepicker {
  margin-bottom: 24px !important;
}
.gap {
  gap: 16px;
}
</style>
