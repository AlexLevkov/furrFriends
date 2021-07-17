<template>
  <section class="app-about min-height main-layout">
    <div class="about-container">
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
        repellendus cum sunt laboriosam non reprehenderit expedita possimus eos
        porro quo magni est, error, quod suscipit veritatis facilis sint
        doloribus modi!
      </p>
      <div v-if="typesCountMap" class="charts-container">
        <app-chart :typesCountMap="typesCountMap" class="chart"></app-chart>
        <app-chart :typesCountMap="typesCountMap" class="chart"></app-chart>
        <app-chart :typesCountMap="typesCountMap" class="chart"></app-chart>
      </div>
      <div class="map-container">
        <app-map></app-map>
      </div>
    </div>
  </section>
</template>

<script>
import appChart from "../cmps/app-chart.vue";
import appMap from '../cmps/app-map.vue';
export default {
  name: "about",
  components: {
    appChart,
    appMap,
  },
  props: {},
  created() {},
  data() {
    return {};
  },
  computed: {
    pets(){
      return this.$store.getters.petsToShow
    },
    typesCountMap(){
      return this.pets.reduce((acc,pet)=>{
        if(!acc[pet.type]){
          acc[pet.type] = 0
        }
        acc[pet.type]++        
        return acc
      },{})
    }
  },
  methods: {},
};
</script>
