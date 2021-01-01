<template>
  <div id="app">
   <div class="container my-5">
    
       <div v-for="result in results" class="card mb-4" :key="result.id">
         <div class="card-header">{{result.title}}</div>
         <div class="card-body">
           <img :src="result.bestThumbnail.url" width="250px" alt=""> 
           {{result.id}}
           <router-link :to="'/video/' + result.id">
           <button class="btn btn-lg btn-primary">Watch</button>
           </router-link>
         </div>
         </div>
         <hr>
       <input  class="form-control form-control-lg mt-2 mb-2" type="text" name="searchterm" v-model="searchterm">
       <button class="btn btn-lg btn-primary ml-2" @click="search">Search</button>
   </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data(){
    return {
      searchterm: '',
      results: []
    }
  },
  mounted(){
   /*  axios.get('http://localhost:3000/single').then(response => {
      this.result = response.data
    }) */
  },
  methods: {
    search(){
      axios.post('http://localhost:3000/search', {
        searchterm: this.searchterm
      }).then(response => {
      this.results = response.data
    })
    }
  }
};

</script>
<style>
</style>
