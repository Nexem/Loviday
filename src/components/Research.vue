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
              <v-text-field label="Name of the product*"
                v-model="nameProduct"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="palmOil"
                :label="`Do not contain palm oil`"
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
                label="No additives"
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
          <small>* Mandatory field</small>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#F1C100" text @click="queryResearch" :disabled="nameProduct===''">Research</v-btn>
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
              <th class="text-left">Additives</th>
              <th class="text-left">Select</th>
              <th class="text-left">Info</th>
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
              <td>
                <v-dialog v-model="Register" max-width="600px" style="background-color: floralwhite" class="mx-3" v-if="!connected"  :disabled="connected">
                  <template v-slot:activator="{ on }">
                    <v-btn text icon color="#F1C100" dark v-on="on">
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <tr>
                      <v-img
                          :src="item.image_url"
                          max-height="250"
                          max-width="250"
                        ></v-img>
                      <v-card-text>Product name :         {{ item.product_name }}</v-card-text>
                      <v-card-text>Nova group :           {{ item.nova_group }}</v-card-text>
                      <v-card-text>Nutriscore :           {{ item.nutriscore_grade }}</v-card-text>
                      <v-card-text>Additives :            {{ item.additives_n }}</v-card-text>
                      <v-card-text>Origin :               {{ item.origins }}</v-card-text>
                      <v-card-text>Manufacturing place :  {{ item.manufacturing_places }}</v-card-text>
                      <v-card-text>Energy (100g) :        {{ item.energy_100g }} Kj</v-card-text>
                      <v-card-text>Ingredients :          {{ item.ingredients_text }}</v-card-text>
                    </tr>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
            <v-card-actions>
              
                <!-- Button to display nexts products -->
                <v-btn color="#F1C100" text v-if="part1 != 0" @click="showless">show previous</v-btn> 
                <v-btn color="#F1C100" text v-if="resultProductsName!=''" @click="showmore">show next</v-btn> 
                <small>Number of results : {{numberProductReturned}}</small>
            </v-card-actions>
            <v-card-actions :disabled="emailUser!=''">
              
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

    emailUser: ''
  }),

  created(){
    this.emailUser = this.$store.getters.getEmail
  },

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

    queryResearch(){
      this.loading = true
      const vm = this
      //Reset tab for new query
      vm.resultProducts=[]

      //Object created
      const researchQuery = {
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
        // send research to backend
        .post('http://localhost:3000/search', { researchQuery })
        // get products information from backend
        .then(function (response) {
          vm.loading = false
          
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
      const uniqueArray = this.productChecked.filter(function(item, pos, self) {
          return self.indexOf(item) === pos && pos != null;
      })
      
      uniqueArray.forEach(function(element) {
        
        if(element != null){
          const product = {
            code: element.code,
            email: vm.emailUser
          }
          console.log(vm.emailUser)
          
          axios.post('http://localhost:3000/insertList', { product })
            .then(function (response) {
              return response 
            })
        }
      })
    },

    addToFavs() {
      const vm = this
      const uniqueArray = this.productChecked.filter(function(item, pos, self) {
          return self.indexOf(item) === pos && pos != null;
      })
      console.log(uniqueArray)
      uniqueArray.forEach(function(element) {
        
        if(element != null){
          const product = {
            code: element.code,
            email: vm.emailUser
          }
          console.log(vm.emailUser)
          
          axios.post('http://localhost:3000/insertFavs', { product })
            .then(function (response) {
              return response 
            })
        }
      })
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