<template>
  <div class="white_background">
    <!-- Fields for research -->
    <v-card color="white">
      <v-card-title>
        <span class="research">RESEARCH A PRODUCT</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Name of the product"
                v-model="nameProduct"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="palmOil"
                :label="`Do not contain palm oil ?`"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="origin"
                :label="`French origin`"
              ></v-checkbox>
            </v-col>
            <v-col sm="3">
              <v-checkbox
                v-model="additives"
                label="Additives in the product ?"
              ></v-checkbox>
            </v-col>
            <v-col sm="3">
              <v-select
                v-model="novascore"
                :items="novascoreItems"
                label="Nova Score"
              ></v-select>
            </v-col>
            <v-col sm="3">
              <v-select
                v-model="nutriscore"
                :items="nutriscoreItems"
                label="Nutriscore"
              ></v-select>
            </v-col>
          </v-row>
          <small>You can refer many fields at a time</small>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#F1C100" text @click="queryResearch">Research</v-btn>
      </v-card-actions>

      <!-- Separation between research andd result -->
      <v-divider :inset="inset"></v-divider>

      <v-dialog v-model="loading" fullscreen full-width>
        <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
          <v-layout justify-center align-center>
            <v-progress-circular
              indeterminate
              :width="3"
              color="amber">
            </v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>


      <!-- List of results -->          
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
              <th class="text-left">Select</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in resultProducts.slice(part1,part2)" :key="item.product_name">
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
              <td> <v-checkbox
                  :value="item"
                  :checked="false"
                  name="checkboxe"
                  color="green accent-4"
                  @change="productSelected($event, i)"
                ></v-checkbox> </td>
            </tr>
            <v-card-actions>
              
                <!-- Button to display nexts products -->
                <v-btn color="#F1C100" text v-if="part1 != 0" @click="showless">show previous</v-btn> 
                <v-btn color="#F1C100" text v-if="resultProductsName!=''" @click="showmore">show next</v-btn> 
                <small>Number of results : {{numberProductReturned}}</small>
            </v-card-actions>
            <v-card-actions>
              
              <!-- Button displayed only if min 1 element displayed -->
              <v-btn color="#F1C100" text @click="addToList">Add to List</v-btn>
              <v-btn color="#F1C100" text @click="addToFavs">Add to Favorite</v-btn>
            </v-card-actions>
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
    loading: false,
    //Research field
    nameProduct: '',
    palmOil: '',
    origin: '',
    additives: '',
    novascore: '',
    nutriscore: '',
    //Lists for itemsLists displayed for research
    novascoreItems: ['1','2','3','4','5'],
    nutriscoreItems: ['A','B','C','E','F'],

    //List containing the product returned by the API, it's displayed into the List below the research field
    resultProducts: [],
    numberProductReturned: '',

    productChecked: [],

    part1: 0,
    part2: 15,
  }),

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    showmore(){
      this.part2 += 15
      this.part1 += 15
    },

    showless(){
      this.part1 -= 15
      this.part2 -= 15
    },

    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },

    queryResearch(){
      this.loading = true
      const vm = this
      //Reset tab for new query
      vm.resultProducts=[]

      //Object created
      var researchQuery = {
        code: '',
        product_name: this.nameProduct,
        origins: this.origin,
        manufacturing_places: '',
        ingredients_text: '',
        additives_n: this.additives,
        additives_tags: '',
        ingredients_from_palm_oil_n: this.palmOil,
        nutriscore_score: this.nutriscore,
        nutriscore_grade: '',
        nova_group: this.novascore,
        image_url: '',
        energy_100g: ''
      }

      axios
        // send product code to backend
        .post('http://localhost:3000/search', { researchQuery })
        // get product information from backend
        .then(function (response) {
          vm.loading = false
          // var result
          response.data.forEach(function(element) {
            vm.resultProducts.push(element)
          })
          vm.numberProductReturned = vm.resultProducts.length
        })
    },


    //Item selected to be added to user list
    productSelected(val){
      this.productChecked.push(val);
    },

    //Add products to user list
    addToList() {

      const vm = this
      var uniqueArray = this.productChecked.filter(function(item, pos, self) {
          return self.indexOf(item) == pos && pos != null;
      })
      
      uniqueArray.forEach(function(element) {
        if(element != null)
          vm.$store.commit('addProductToList', element);
        console.log(element)
      });
    },

    addToFavs() {
      const vm = this
      var uniqueArray = this.productChecked.filter(function(item, pos, self) {
          return self.indexOf(item) == pos && pos != null;
      })
      
      uniqueArray.forEach(function(element) {
        if(element != null)
          vm.$store.commit('addFavsList', element);
        console.log(element)
      });
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