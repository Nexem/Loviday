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
              <v-select
                v-model="additives"
                :items="numberadditivesItems"
                label="Number of additives"
              ></v-select>
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
      <v-list shaped v-if="resultProducts!=''"> 
        <v-list-item-group v-model="checklistProduct" multiple>
          <template v-for="(item, i) in resultProductsName.slice(part1,part2)">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="green--text text--accent-4"
            >
              <template v-slot:default="{ active, toggle }">
                <v-img
                  :src="resultProductsImage[i]"
                  max-height="50"
                  max-width="50"
                ></v-img>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                  <v-icon>alpha-a-circle-outline</v-icon>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :value="item"
                    color="green accent-4"
                    v-model="checkedProduct"
                    @change="productSelected($event, i)"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
          <v-spacer></v-spacer>
          <v-btn color="#F1C100" text v-if="part1 != 0" @@click="part1 -= 15, part2 -= 15">show previous</v-btn> 
          <v-btn color="#F1C100" text @@click="part2 += 15, part1 += 15">show next</v-btn> 
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Button displayed only if min 1 element displayed -->
            <v-btn color="#F1C100" text @click="addToList">Add to List</v-btn>
            <v-btn color="#F1C100" text @click="addToFavorite">Add to Favorite</v-btn>
          </v-card-actions>
        </v-list-item-group>
      </v-list>
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
    nameCompany: '',
    palmOil: '',
    origin: '',
    additives: '',
    novascore: '',
    nutriscore: '',
    //Lists for itemsLists displayed for research
    novascoreItems: ['1','2','3','4','5'],
    nutriscoreItems: ['A','B','C','E','F'],
    numberadditivesItems: ['1','2','3','4','5','>5'],

    //List containing the product returned by the API, it's displayed into the List below the research field
    resultProductsName: [],
    resultProductsNova: [],
    resultProductsImage: [],
    productChecked: [],

    part1: 0,
    part2: 15
  }),

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    queryResearch(){
      this.loading = true
      const vm = this
      vm.resultProductsName=[]
      vm.resultProductsImage=[]
      vm.resultProductsNova=[]
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
        // .post('http://localhost:3000/code', { code: '3178530405774' })
        .post('http://localhost:3000/search', { researchQuery })
        // get product information from backend
        .then(function (response) {
          // console.log(response.data[1].product_name)
          
          // var result
          vm.loading = false
          response.data.forEach(function(element) {
            // console.log("okok")
            vm.resultProductsName.push(element.product_name)
            vm.resultProductsImage.push(element.image_url)
            vm.resultProductsNova.push(element.nova_group)
          })
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
      });
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