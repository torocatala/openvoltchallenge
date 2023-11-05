<script setup>
import { ref } from 'vue'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const user = {
  name: 'Tony',
  surname: 'Stark',
  profession: 'Genius, Billionaire, Playboy, Philanthropist'
}

const meterId = ref('6514153c23e3d1424bf82738');
const interval = ref([new Date('2023-01-01'), new Date('2023-01-31')]);
const meterUsageData = ref()

const fetching = ref(false);

const getMeterUsageCall = async (meterId, start, end) => {
  fetching.value = true;
  await axios.get(`http://localhost:3000/api/v1/${meterId}/${start}/${end}`).then(response => {meterUsageData.value = response.data});
  fetching.value = false;
}

const getMeterUsage = () => {
  const start = formatDate(interval.value[0]);
  const end = formatDate(interval.value[1]); 
  getMeterUsageCall(meterId.value, start, end) 
}

const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
</script>

<template>
  <div class="loading" v-if="fetching">
    <div class="spinner">Loading data... Please wait...</div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col"><h1>Metter Usage component</h1></div>
    </div>
    <div class="row">
      <div class="col user-card">
        <span>Hello {{ user.name }}</span>
      </div>
    </div>
    <div class="row usage-selector">
      <div class="col-md-12">
        <div>
          <label for="meter_selector">Meter: </label>
          <select name="meter_selector" v-model="meterId">
            <option selected value="6514153c23e3d1424bf82738">Main building</option>
            <option value="error">Secret lab</option>
          </select>
        </div>
      </div>
      <div class="col-md-12">
        <div>
          <div> 
            <label for="">Interval:</label>
            <VueDatePicker v-model="interval" range auto-apply :enable-time-picker="false"/>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <button @click="getMeterUsage">See usage</button>
      </div>
    </div>
    <div class="row usage-display" v-if="meterUsageData">
      <div class="col-md-5">
        <span>Start: </span>
        <br>
        <span>{{ meterUsageData.startInterval }}</span>
        <br>
        <span>End: </span>
        <br>
        <span>{{ meterUsageData.startInterval }}</span>
      </div>
      <div class="col-md-4">
        <span>Granularity: </span>
        <span>{{ meterUsageData.granularity }}</span>
      </div>
      <div class="col-md-3">
        <span>Total CO2: </span>
        <span>{{ meterUsageData.totalco2 }}</span>
      </div>
      <div class="col-md-12">
        <hr/>
        <span><h3>Fuel mix</h3></span>
        <li v-for="(item, index) in meterUsageData.weightedFuelMix">
          {{ index }} - {{ item }}
        </li>
      </div>
    </div>
  </div>
</template>

<style>
.loading{
  display: block;
  position:absolute;
  top:0;
  left:0;
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0.8;
  text-align: center;
}
.spinner{
  display: inline-block;
  position: relative;
  top: 50%;
  color: white;

}
</style>