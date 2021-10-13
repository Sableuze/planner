<template>
  <div class="py-5 an-appear">
    <h1>List</h1>
    <hr />

    <b-table
      v-if="getTasks.length"
      :items="getTasks"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      small
      sort-icon-left
      label-align-sm="left"
      @filtered="onFiltered"
    >
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(actions)="row">
        <router-link
          tag="button"
          class="btn btn-success"
          :to="'/task/' + row.item.id"
          >Open
        </router-link>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <p class="nothing-to-show" v-else>
      There are no tasks yes <br />
      Try adding one
    </p>
    <b-col v-if="getTasks.length > perPage" sm="7" md="6" class="my-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="getTasks.length"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: 'TaskList',
  computed: {
    getTasks() {
      return this.$store.state.taskList.tasks
    },

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return {text: f.label, value: f.key}
        })
    },
  },
  data() {
    return {
      fields: [
        {key: 'index', label: '#'},

        {
          key: 'date',
          label: "Task's date",
          sortable: true,
        },
        {
          key: 'description',
          label: "Task's Description",
          sortable: false,
          class: 'text d-none d-md-table-cell',
        },
        {key: 'status', label: 'Status', sortable: true},
        {key: 'actions', label: 'Actions'},
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, {value: 100, text: 'Show a lot'}],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },

  mounted() {
    gsap.fromTo('.an-appear', {opacity: 0}, {opacity: 1, duration: 1})
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(getTasks) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = getTasks.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss">
.nothing-to-show {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 32px;
}
td > div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;
}
table {
  border-collapse: separate;
  border-spacing: 0 1rem;
}
@media (max-width: 768px) {
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before {
    text-align: left;
  }
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label] > div {
    text-align: right;
  }
}
</style>
