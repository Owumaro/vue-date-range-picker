<template>
  <div class="daterangepicker-calendar">
    <div class="d-flex align-items-center">
      <div class="p-1" :class="control == 'left' ? '' : 'invisible'">
        <button type="button" class="btn btn-sm btn-light" @mousedown.prevent @click="goToPrevMonth">
          <font-awesome-icon icon="caret-left" fixed-width />
        </button>
      </div>
      <div class="p-1 col text-center">
        {{ month.format('MMMM YYYY') }}
      </div>
      <div class="p-1" :class="control == 'right' ? '' : 'invisible'">
        <button type="button" class="btn btn-sm btn-light" @mousedown.prevent @click="goToNextMonth">
          <font-awesome-icon icon="caret-right" fixed-width />
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-between text-center daterangepicker-calendar-row">
      <div v-for="day in daysOfFirstWeek" :key="day.format('D')" class="col-day">{{ day.format('ddd') }}</div>
    </div>
    
    <div class="d-flex flex-wrap justify-content-between text-center daterangepicker-calendar-row">
      <div v-for="day in days" :key="day.format('M-D')" class="col-day"
        :class="dayClass(day)" @mouseover="dayMouseOver(day)" @mousedown.prevent @click="dayClick(day)">{{ day.format('D') }}</div>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'

export default {
  props: ['control', 'month', 'startDate', 'endDate', 'compare', 'startDateCompare', 'endDateCompare', 'step'],
  data: () => {
    return {}
  },
  computed: {
    days: function() {
      let startDay = moment.utc(this.month).startOf('isoWeek')
      let endDay = moment.utc(this.month).endOf('month').endOf('isoWeek').startOf('day').add(1, 'day')
      let nDays = moment.duration(endDay.diff(startDay)).asDays()

      let days = []
      let day = 0
      while (day < nDays) {
        days.push(moment.utc(startDay).add(day, 'day'))
        day++
      }
      return days
    },
    daysOfFirstWeek: function() {
      return this.days.slice(0, 7)
    }
  },
  methods: {
    dayClass: function(day) {
      let classes = []
      
      // Hide days overflowing
      if (!day.isBetween(this.month, moment.utc(this.month).endOf('month'), 'days', '[]')) {
        classes.push('invisible')
      }
      // Class for days between startDate & endDate
      if (day.isBetween(this.startDate, this.endDate, 'days', '[]')) {
        classes.push('daterangepicker-range')
      }
      // Class for days between startDateCompare & endDateCompare
      if (this.compare && day.isBetween(this.startDateCompare, this.endDateCompare, 'days', '[]')) {
        classes.push('daterangepicker-range-compare')
      }
      // Class for cursor if the step is selecting something
      if (this.step != null) {
        classes.push('daterangepicker-cursor-pointer')
      }

      return classes.join(' ')
    },
    dayMouseOver: function(day) {
      if (this.step != null) {
        this.selectDate(day)
      }
    },
    dayClick: function(day) {
      if (this.step != null) {
        this.nextStep()
      }
    },
    goToPrevMonth: function() {
      this.$emit('goToPrevMonth')
    },
    goToNextMonth: function() {
      this.$emit('goToNextMonth')
    },
    selectDate: function(date) {
      this.$emit('selectDate', date)
    },
    nextStep: function() {
      this.$emit('nextStep')
    }
  },
  watch: {},
  filters: {},
  components: { FontAwesomeIcon }
}
</script>

<style>
.daterangepicker-calendar-row {
  font-size: 14px;
  /*max-width: 230px;*/
}

.col-day {
  width: 14.28%;
  padding: 0.5rem 0;
  white-space: nowrap;
}

.daterangepicker-range {
  background-color: #17a2b8 !important;
  color: #ffffff;
}

.daterangepicker-range-compare {
  background-color: #ff9307;
  color: #ffffff;
}

.daterangepicker-range.daterangepicker-range-compare {
  background: linear-gradient(0, #ff9307 50%, #17a2b8 50%);
}

.daterangepicker-cursor-pointer {
  cursor: pointer;
}
</style>
