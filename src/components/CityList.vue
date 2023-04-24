<template>
  <div v-for="city in savedCities" :key="city.id">
  <CityCard  :city="city" @click="goToCityView(city)"/>
  </div>
  <p v-if="savedCities.length === 0">No lacation added. To start tracking a location, search in the field above</p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const getCities = async() => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    const req = [];
    savedCities.value.forEach((city) => {
      req.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=a1d92ab7fb9873065bac27b5019298f0&units=imperial`
        )
      );
    });
    const weatherData= await Promise.all(req);
    // flicker delay
    await new Promise((res)=> setTimeout(res,1000))
    weatherData.forEach((value,index)=>{
        savedCities.value[index].weather=value.data
    })
  }
};

await getCities()
const router= useRouter()
const goToCityView=(city)=>{
    router.push({
        name:"cityview",
        params:{state:city.state,city:city.city},
        query:{id:city.id,lat:city.coords.lat,lng:city.coords.lng}
    })
}
</script>
