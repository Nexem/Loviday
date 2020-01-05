<template>
  <div class="white_background">
    <v-card color="white">
      <v-card-title>
        <span class="research">List of your products</span>
      </v-card-title>
    <!-- List of results -->
      <v-list shaped>
        <v-list-item-group v-model="checklistProduct" multiple>
          <template v-for="(item, i) in products">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

            <v-list-item
              :key="`item-${i}`"
              :value="item"
            >
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    :value="item"
                    v-model="favProduct"
                    text icon color="blue lighten-2"
                    @click="addToFavs($event, i)"
                  >
                    <v-icon>mdi-heart-outline</v-icon>
                  </v-btn> 
                </v-list-item-action>
                
                <v-list-item-action>
                  <v-btn
                    :value="item"
                    v-model="deleteProduct"
                    text icon color="red"
                    @click="deleteList($event,i)"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </v-list-item-action>

            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    products: []
  }),

  created(){
    this.products = this.$store.getters.getProducts
  },

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    addToFavs(val){
      // eslint-disable-next-line no-console
      console.log(val)
      // this.$store.commit('addFavsList', val)
    },

    deleteList(){

    }
  }
}
</script>

<style scoped>
  div.white_background {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>