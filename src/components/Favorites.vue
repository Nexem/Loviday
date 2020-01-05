<template>
  <div class="white_background">
    <v-card color="white">
      <v-card-title>
        <span class="research">List of your favorite products</span>
      </v-card-title>
    <!-- List of Favorites products -->          
      <v-simple-table 
        shaped v-if="resultProducts!=''" 
        >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Image of product</th>
              <th class="text-left">Name</th>
              <th class="text-left">Nova score</th>
              <th class="text-left">Nutri score</th>
              <th class="text-left">Number of additives</th>
              <th class="text-left">Add to Favorite</th>
              <th class="text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.product_name">
              <td><v-img
                  :src="item.image_url"
                  max-height="50"
                  max-width="50"
                ></v-img>
              </td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.nova_group }}</td>
              <td>{{ item.nutriscore_grade }}</td>
              <td>{{ item.additives_n }}</td>
              <td> 
                <v-btn
                  :value="item"
                  :checked="false"
                  name="checkboxe"
                  text icon color="red"
                  @click="deleteItem($event, i)"
                  
                > <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </td>
            </tr>
            <small>Number of products in your Fav List : {{numberProduct}}</small>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>



<script>
export default {
  data: () => ({
    products: [],
    numberProduct: ''
  }),
  
  methods: {
    created(){
      this.products = this.$store.getters.getFavs
      this.numberProduct = this.products.length
      console.log(this.products)
      console.log(this.numberProduct)
    },

    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

//Faire avec le SQL
    deleteFavs(){

    }
  }
}
</script>

<style scoped>
  div.white_background {
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>