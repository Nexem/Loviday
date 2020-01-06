<template>
  <div class="white_background">
    <v-card color="white">
      <v-card-title>
        <span class="research">List of your products</span>
      </v-card-title>

      <!-- List of products -->          
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
                  text icon color="blue lighten-2"
                  @click="addFavoriteItem(item)"
                > <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
              </td>
              <td> 
                <v-btn
                  :value="item"
                  :checked="false"
                  text icon color="red"
                  @click="deleteItem($event, i)"
                  
                > <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </td>
            </tr>
            <small>Number of products in your list : {{numberProduct}}</small>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    products: [],
    numberProduct: ''
  }),

  created(){
    const vm = this

    const emailUser = {
      email: this.$store.getters.getEmail
    }

    axios.post('http://localhost:3000/getList', { emailUser })
      .then(function (response) {
        const result = response.data
        let codeList = []

        //Extract only code variable to push in Array
        result.forEach(function(element) {
          codeList.push(element.code)
        })

        //Sort to eliminate duplicatas
        let uniqueArray = [...new Set(codeList)]
        vm.numberProduct = uniqueArray.length

        //Get products informations from API
        uniqueArray.forEach(function(code) {
          axios.post('http://localhost:3000/code', { code })
          .then(function (response) {
            vm.products.push(response.data)
          })
        })
      })
  },

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    addFavoriteItem(val){
      this.$store.commit('addFavsList', val)
    },

//faire avec le SQL
    deleteItem(){

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