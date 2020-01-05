<template>
  <div class="background">
    <v-row 
      align-content="center"
    >
      <v-col></v-col>
      <v-col
        class="ma-3 pa-6"
      >
        <v-btn
          style="height: 300px; opacity: 0.85;"
          width="200"
          color = "#373737"
          class="white--text"
          block
          @click="movePage('Lists')"
        >My products' lists</v-btn>
      </v-col>
      <v-col
        class="ma-3 pa-6"
      >
        <v-btn
          style="height: 300px; opacity: 0.85;"
          width="200"
          color = "#373737"
          class="white--text"
          block
          @click="movePage('Favorites')"
        >My favorites</v-btn>
      </v-col>
      <v-col
        class="ma-3 pa-6"
      >
        <v-btn
          style="height: 300px; opacity: 0.85;"
          width="200"
          color = "#373737"
          class="white--text"
          block
          @click="movePage('Research')"
        >Do a research</v-btn>
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i|Monoton");

div.background {
  background-image: url("background.jpg");
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h3 {
  color: grey;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 40px;
  margin-bottom: 0.5rm;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import axios from 'axios'

export default {
  data: () => ({
  }),
  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    }
  },
  created() {
      axios
        // send product code to backend
        // .post('http://localhost:3000/code', { code: '3178530405774' })

        // search a product (keywords are set in back end for the moment)
        .post('http://localhost:3000/search')
        // get product information from backend
        .then(function (response) {
          console.log(response)
        })
    }
}
</script>