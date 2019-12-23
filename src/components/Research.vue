<template>
  <div class="background">
    
  </div>
</template>

<style scoped>
div.background {
  background-image: url("background.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<script>
export default {
  data: () => ({
  }),
  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    }
  }
}
</script>