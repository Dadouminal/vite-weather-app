<template>
    <div>
<Suspense>
    <AsyncCityView />
    <template #fallback>
       <p class="italic">Loading...</p>
    </template>
</Suspense>
        
    </div>
</template>
<script setup>
import AsyncCityView from './AsyncCityView.vue';

</script>
