<template>
  <div id="app" class="container">
    <h2 class="my-4 pb-2 border-bottom">Vue date range picker demo</h2>

    <h3 class="pb-2 border-bottom">Inline integration</h3>
    <div class="mb-4">
      <date-range-picker v-on:submit="submitted" />
    </div>

    <h3 class="pb-2 border-bottom">Modal integration</h3>
    <div class="mb-4">
      <button type="button" class="btn btn-primary" v-b-modal.exampleModal>
        <font-awesome-icon icon="calendar-alt" fixed-width />
        {{ startDate | dateFormat }} - {{ endDate | dateFormat }}
        <font-awesome-icon icon="caret-down" fixed-width />
      </button>

      <b-modal id="exampleModal" ref="exampleModal" size="lg" :hide-header="true" :hide-footer="true">
        <date-range-picker v-on:submit="submittedModal" v-on:cancel="cancelledModal" />
      </b-modal>
    </div>

    <h3 class="pb-2 border-bottom">Popover integration</h3>
    <div class="mb-4">
      <button type="button" class="btn btn-primary" id="examplePopoverButton">
        <font-awesome-icon icon="calendar-alt" fixed-width />
        {{ startDate | dateFormat }} - {{ endDate | dateFormat }}
        <font-awesome-icon icon="caret-down" fixed-width />
      </button>

      <b-popover ref="examplePopover" target="examplePopoverButton" triggers="click" placement="bottom">
        <date-range-picker v-on:submit="submittedPopover" v-on:cancel="cancelledPopover" />
      </b-popover>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import BModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import BPopover from 'bootstrap-vue/es/components/popover/popover'
import DateRangePicker from './components/DateRangePicker'

library.add(faCalendarAlt, faCaretDown)

export default {
  components: { DateRangePicker, FontAwesomeIcon, BModal, BPopover },
  directives: { 'b-modal': BModalDirective },
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
    // Modal methods
    submittedModal: function(range) {
      this.startDate = range.startDate
      this.endDate = range.endDate
      this.closeModal()
    },
    cancelledModal: function() {
      this.closeModal()
    },
    closeModal: function() {
      this.$refs.exampleModal.hide()
    },
    // Popover methods
    submittedPopover: function(range) {
      this.startDate = range.startDate
      this.endDate = range.endDate
      this.closePopover()
    },
    cancelledPopover: function() {
      this.closePopover()
    },
    closePopover: function() {
      this.$refs.examplePopover.$emit('close')
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

.popover {
  max-width: 800px;
}
</style>
