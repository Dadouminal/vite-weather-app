<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchquery"
        @input="getSearchResult"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 top-[66px]"
        v-if="mapboxSearchResult"
      >
        <p v-if="searchError">Sorry, something wen wrong, try later</p>
        <p v-if="!serverError && mapboxSearchResult.length === 0">
          No result match your query, try a different term
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResult"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <suspense>
        <CityList />
        <template #fallback>
       <CityCardSkeleton />
        </template>
      </suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
const mapboxAPIKey =
  "pk.eyJ1IjoiZGFkb3VtaW5hbCIsImEiOiJjbGZqbmIzbTEwMm1xNDNwZXdvbnJmNm00In0.6Bxw-VaRmIIROqJ4CvFu_A";

const router = useRouter();
const searchquery = ref("");
const queryTimeOut = ref(null);
const mapboxSearchResult = ref(null);
const searchError = ref(null);
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityview",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResult = () => {
  clearTimeout(queryTimeOut.value);
  queryTimeOut.value = setTimeout(async () => {
    if (searchquery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchquery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResult.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResult.value = null;
  }, 300);
};
</script>

<style scoped></style>
