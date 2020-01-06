<template>
  <div class="background">
    <v-row 
      align-content="center"
    >
      <v-col></v-col>
      <v-col
        class="ma-3 pa-6" v-if="connected"
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
        class="ma-3 pa-6" v-if="connected"
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

<script>
export default {
  data: () => ({
    connected: false
  }),
  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    }
  },
  created() {
    if(this.$store.getters.getEmail != null)
    {
      this.connected = true
    }
  }
}
</script>

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
