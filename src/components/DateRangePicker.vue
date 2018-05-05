<template>
  <div class="d-flex daterangepicker-row">
    <!-- Left calendar -->
    <div class="daterangepicker-col">
      <date-range-picker-calendar
        control="left"
        :month="month"
        :startDate="startDate"
        :endDate="endDate"
        :compare="compare"
        :startDateCompare="startDateCompare"
        :endDateCompare="endDateCompare"
        :step="step"
        v-on:goToPrevMonth="goToPrevMonth"
        v-on:goToNextMonth="goToNextMonth"
        v-on:selectDate="selectDate"
        v-on:nextStep="nextStep"
      />
    </div>

    <!-- Right calendar -->
    <div class="daterangepicker-col">
      <date-range-picker-calendar
        control="right"
        :month="nextMonth"
        :startDate="startDate"
        :endDate="endDate"
        :compare="compare"
        :step="step"
        :startDateCompare="startDateCompare"
        :endDateCompare="endDateCompare"
        v-on:goToPrevMonth="goToPrevMonth"
        v-on:goToNextMonth="goToNextMonth"
        v-on:selectDate="selectDate"
        v-on:nextStep="nextStep"
      />
    </div>

    <!-- Right form -->
    <div class="daterangepicker-col">
      <div class="form-group">
        <select class="custom-select" :class="compare ? 'daterangepicker-range-border' : ''" v-model="rangeSelect">
          <option v-for="(range, rangeKey) in ranges" :key="rangeKey" :value="rangeKey">{{ range.label }}</option>
          <option value="custom">Custom range</option>
        </select>
      </div>
      <div class="form-group form-inline flex-nowrap">
        <input type="text" class="form-control w-100 daterangepicker-date-input" ref="startDate"
          :value="startDate | dateFormat"
          :class="step == 'selectStartDate' ? 'daterangepicker-range-border-focus' : ''"
          @click="step = 'selectStartDate'" @focus="step = 'selectStartDate'"
          @keyup.enter="inputDate"
        >
        <span class="mx-2">
        <font-awesome-icon icon="caret-right" fixed-width />
        </span>
        <input type="text" class="form-control w-100 daterangepicker-date-input" ref="endDate"
          :value="endDate | dateFormat"
          :class="step == 'selectEndDate' ? 'daterangepicker-range-border-focus' : ''"
          @click="step = 'selectEndDate'" @focus="step = 'selectEndDate'"
          @keyup.enter="inputDate"
        >
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" :id="'date-range-picker-compare-' + _uid" v-model="compare">
          <label class="custom-control-label" :for="'date-range-picker-compare-' + _uid">Compare</label>
        </div>
      </div>
      <div v-if="compare">
        <div class="form-group">
          <select class="custom-select" :class="compare ? 'daterangepicker-range-compare-border' : ''" v-model="rangeSelectCompare">
            <option v-for="(range, rangeKey) in ranges" :key="rangeKey" :value="rangeKey">{{ range.label }}</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
        <div class="form-group form-inline flex-nowrap">
          <input type="text" class="form-control w-100 daterangepicker-date-input" ref="startDateCompare"
            :value="startDateCompare | dateFormat"
            :class="step == 'selectStartDateCompare' ? 'daterangepicker-range-compare-border-focus' : ''"
            @click="step = 'selectStartDateCompare'" @focus="step = 'selectStartDateCompare'"
            @keyup.enter="inputDate"
          >
        <span class="mx-2">
        <font-awesome-icon icon="caret-right" fixed-width />
        </span>
        <input type="text" class="form-control w-100 daterangepicker-date-input" ref="endDateCompare"
          :value="endDateCompare | dateFormat"
          :class="step == 'selectEndDateCompare' ? 'daterangepicker-range-compare-border-focus' : ''"
          @click="step = 'selectEndDateCompare'" @focus="step = 'selectEndDateCompare'"
          @keyup.enter="inputDate"
        >
        </div>
      </div>
      <div class="form-group form-inline justify-content-end mb-0">
        <button type="button" class="btn btn-light">Cancel</button>
        <button type="button" class="btn btn-primary ml-2" :disabled="step != null">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePickerCalendar from './DateRangePickerCalendar'
import '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'

export default {
  props: {},
  data: () => {
    return {
      startDate: moment.utc().subtract(1, 'month').startOf('month'),
      endDate: moment.utc().subtract(1, 'month').endOf('month').startOf('day'),
      rangeSelect: 'lastMonth',
      ranges: {
        currentMonth: {
          label: 'Current month',
          startDate: moment.utc().startOf('month'),
          endDate: moment.utc().endOf('month').startOf('day')
        },
        lastMonth: {
          label: 'Last month',
          startDate: moment.utc().subtract(1, 'month').startOf('month'),
          endDate: moment.utc().subtract(1, 'month').endOf('month').startOf('day')
        }
      },
      month: moment.utc().subtract(1, 'month').startOf('month'),
      compare: false,
      startDateCompare: moment.utc().subtract(1, 'month').startOf('month'),
      endDateCompare: moment.utc().subtract(1, 'month').endOf('month').startOf('day'),
      rangeSelectCompare: "lastMonth",
      step: null
    }
  },
  computed: {
    nextMonth: function() {
      return moment.utc(this.month).add(1, 'month')
    },
    // For multi prop watchers
    range: function() {
      return this.startDate, this.endDate
    },
    rangeCompare: function() {
      return this.startDateCompare, this.endDateCompare
    }
  },
  methods: {
    goToPrevMonth: function() {
      this.month = moment.utc(this.month).subtract(1, 'month')
    },
    goToNextMonth: function() {
      this.month = moment.utc(this.month).add(1, 'month')
    },
    selectDate: function(date) {
      if (this.step == 'selectStartDate') {
        this.startDate = date
      } else if (this.step == 'selectEndDate') {
        this.endDate = date
      } else if (this.step == 'selectStartDateCompare') {
        this.startDateCompare = date
      } else if (this.step == 'selectEndDateCompare') {
        this.endDateCompare = date
      }
    },
    // Step flow for date range selections
    nextStep: function() {
      if (this.step == 'selectStartDate') {
        this.step = 'selectEndDate'
        this.$refs.endDate.focus()
      } else if (this.step == 'selectEndDate') {
        this.step = null
        this.$refs.endDate.blur()
      } else if (this.step == 'selectStartDateCompare') {
        this.step = 'selectEndDateCompare'
        this.$refs.endDateCompare.focus()
      } else if (this.step == 'selectEndDateCompare') {
        this.step = null
        this.$refs.endDateCompare.blur()
      }
    },
    // Try to update the step date from an input value
    inputDate: function(input) {
      let date = moment.utc(input.target.value, 'YYYY-MM-DD')
      if (date.isValid()) {
        this.selectDate(date)
      }
      this.nextStep()
    }
  },
  watch: {
    rangeSelect: function(val) {
      let predefinedRange = false

      // Predefined ranges
      for (const rangeKey of Object.keys(this.ranges)) {
        const range = this.ranges[rangeKey]
        if (val == rangeKey) {
          predefinedRange = true

          if (!this.startDate.isSame(range.startDate)) {
            this.startDate = moment.utc(range.startDate)
          }
          if (!this.endDate.isSame(range.endDate)) {
            this.endDate = moment.utc(range.endDate)
          }
        }
      }

      // Custom range
      if (!predefinedRange && this.step == null) {
        this.step = 'selectStartDate'
        this.$refs.startDate.focus()
      }
    },
    rangeSelectCompare: function(val) {
      let predefinedRange = false

      // Predefined ranges
      for (const rangeKey of Object.keys(this.ranges)) {
        const range = this.ranges[rangeKey]
        if (val == rangeKey) {
          predefinedRange = true

          if (!this.startDateCompare.isSame(range.startDate)) {
            this.startDateCompare = moment.utc(range.startDate)
          }
          if (!this.endDateCompare.isSame(range.endDate)) {
            this.endDateCompare = moment.utc(range.endDate)
          }
        }
      }

      // Custom range
      if (!predefinedRange && this.step == null) {
        this.step = 'selectStartDateCompare'
        this.$refs.startDateCompare.focus()
      }
    },
    range: function() {
      let predefinedRange = false

      // Predefined ranges
      for (const rangeKey of Object.keys(this.ranges)) {
        const range = this.ranges[rangeKey]
        if (this.startDate.isSame(range.startDate) && this.endDate.isSame(range.endDate)) {
          predefinedRange = true
          if (this.rangeSelect != rangeKey) {
            this.rangeSelect = rangeKey
          }
        }
      }

      // Custom range
      if (!predefinedRange) {
        if (this.rangeSelect != 'custom') {
          this.rangeSelect = 'custom'
        }
      }
    },
    rangeCompare: function() {
      let predefinedRange = false

      // Predefined ranges
      for (const rangeKey of Object.keys(this.ranges)) {
        const range = this.ranges[rangeKey]
        if (this.startDateCompare.isSame(range.startDate) && this.endDateCompare.isSame(range.endDate)) {
          predefinedRange = true
          if (this.rangeSelectCompare != rangeKey) {
            this.rangeSelectCompare = rangeKey
          }
        }
      }

      // Custom range
      if (!predefinedRange) {
        if (this.rangeSelectCompare != 'custom') {
          this.rangeSelectCompare = 'custom'
        }
      }
    }
  },
  filters: {
    dateFormat: function(value) {
      return value ? value.format('YYYY-MM-DD') : ''
    }
  },
  components: { DateRangePickerCalendar, FontAwesomeIcon }
}
</script>

<style>
/* Custom row */
.daterangepicker-row {
  margin: -0.5rem;
}

.daterangepicker-col {
  padding: 0.5rem;
  flex-basis: 100%;
}

.daterangepicker-date-input {
  min-width: 120px;
}

.daterangepicker-range-border {
  border-color: #17a2b8 !important;
}

.daterangepicker-range-border-focus {
  border-color: #17a2b8 !important;
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25) !important;
}

.daterangepicker-range-compare-border {
  border-color: #ff9307 !important;
}

.daterangepicker-range-compare-border-focus {
  border-color: #ff9307 !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 147, 7, 0.25) !important;
}
</style>