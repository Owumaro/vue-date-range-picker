<template>
  <div id="app" class="container">
    <h2 class="my-4 pb-2 border-bottom">Vue date range picker demo</h2>

    <h3 class="pb-2 border-bottom">Flat integration</h3>
    <div class="mb-4">
      <date-range-picker />
    </div>
    
    <h3 class="pb-2 border-bottom">Bootstrap modal integration</h3>
    <div class="mb-4">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Select a date range...
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Select a date range...</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <date-range-picker />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import DateRangePicker from '../src/components/DateRangePicker'

export default {
  components: { DateRangePicker }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
