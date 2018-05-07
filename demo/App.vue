<template>
  <div id="app" class="container">
    <h2 class="my-4 pb-2 border-bottom">Vue date range picker demo</h2>

    <h3 class="pb-2 border-bottom">Inline integration</h3>
    <div class="mb-4">
      <date-range-picker v-on:submit="submitted" />
    </div>
    
    <h3 class="pb-2 border-bottom">Modal integration</h3>
    <div class="mb-4">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <font-awesome-icon icon="calendar-alt" fixed-width />
        {{ startDate | dateFormat }} - {{ endDate | dateFormat }}
        <font-awesome-icon icon="caret-down" fixed-width />
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <date-range-picker v-on:submit="submittedModal" v-on:cancel="cancelledModal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import moment from 'moment'
import $ from 'jquery'
import '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import DateRangePicker from '../src/components/DateRangePicker'

export default {
  components: { DateRangePicker, FontAwesomeIcon },
  data: () => {
    return {
      startDate: moment.utc().subtract(1, 'month').startOf('month'),
      endDate: moment.utc().subtract(1, 'month').endOf('month').startOf('day')
    }
  },
  methods: {
    submitted: function(range) {
      console.log(range)
    },
    submittedModal: function(range) {
      this.startDate = range.startDate
      this.endDate = range.endDate
      this.closeModal()
    },
    cancelledModal: function() {
      this.closeModal()
    },
    closeModal: function() {
      $('#exampleModal').modal('hide')
    }
  },
  filters: {
    dateFormat: function(value) {
      return value ? value.format('YYYY-MM-DD') : ''
    }
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
