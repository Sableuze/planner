<template>
  <b-container class="py-5 an-appear" fluid>
    <h1>{{ title || 'Заголовок' }}</h1>
    <form @submit.prevent="updateTask">
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
          <label for="date">Choose a date</label>
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
        <b-row class="buttons">
          <button
            type="submit"
            class="mx-2 px-5 py-2 btn btn-warning align-self-center"
          >
            Update task
          </button>
          <button
            @click="completeTask"
            class="mx-2 px-5 py-2 btn btn-warning align-self-center"
          >
            Complete task
          </button>
          <button
            @dblclick="deleteTask"
            @click="changeColor"
            class="mx-2 px-5 py-2 btn btn-danger align-self-center"
          >
            Delete task
          </button>
        </b-row>
      </b-form-row>
    </form>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </b-container>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'Task',
  computed: {
    task() {
      return this.$store.getters.getTaskById(this.$route.params.id)
    },
    dateToday() {
      return this.$store.getters.dateToday()
    },
    clientWidth() {
      return document.window.clientWidth()
    },
  },
  mounted() {
    this.id = this.task.id
    this.title = this.task.title
    this.description = this.task.description
    this.tags = this.task.tags
    this.date = this.task.date

    gsap.fromTo('.an-appear', {opacity: 0}, {opacity: 1, duration: 1})
  },

  data() {
    return {
      id: '',
      title: '',
      description: '',
      tags: undefined,
      date: undefined,
      maxNumberOfWords: 2048,
    }
  },

  methods: {
    onKeyDown() {
      if (this.description.length >= this.maxNumberOfWords) {
        this.description = this.description.substr(0, this.maxNumberOfWords)
      }
    },
    updateTask() {
      this.$store.dispatch('updateTask', {
        title: this.title,
        id: this.id,
        description: this.description,
        date: this.date,
        status: 'active',
        tags: this.tags,
      })
      this.$router.push({name: 'tasks'})
    },
    async completeTask() {
      await this.$store.dispatch('completeTask', this.task.id)
      this.$router.push({name: 'tasks'})
    },
    async deleteTask() {
      this.$store.dispatch('deleteTask', this.task.id)
      this.$router.push({name: 'tasks'})
    },
    changeColor() {
      const target = event.target
      target.classList.add('warning')
      setTimeout(() => {
        target.classList.remove('warning')
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
h1 {
  word-wrap: break-word;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
.text-field {
  margin-top: 32px;
}
#textarea {
}
.datepicker {
  margin-bottom: 24px !important;
}
.btn-submit {
  margin-left: 16px;
}
.warning {
  background: rgb(238, 210, 2) !important;
  color: #000;
}
.buttons {
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;
    .align-self-center {
      align-self: unset !important;
    }
  }
}
</style>
