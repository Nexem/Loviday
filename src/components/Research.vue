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
      

      
        <v-data-table
          v-model="selected"
          v-bind:headers="headers"
          v-bind:items="items"
          select-all
          v-bind:pagination.sync="pagination"
          item-key="name"
          class="elevation-1"
        >
        <template slot="headers" scope="props">
          <tr>
            <th>
              <v-checkbox
                primary
                hide-details
                @click.native="toggleAll"
                :input-value="props.all"
                :indeterminate="props.indeterminate"
              ></v-checkbox>
            </th>
            <th v-for="header in props.headers" :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                primary
                hide-details
                :input-value="props.selected"
              ></v-checkbox>
            </td> 
            <td class="text-xs-right">{{ props.item.product_name }}</td>
            <td class="text-xs-right">{{ props.item.nova_group }}</td>
            <td class="text-xs-right">{{ props.item.nutriscore_score }}</td>
            <td class="text-xs-right">{{ props.item.additives_n }}</td>
          </tr>
        </template>
      </v-data-table>
      
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
    numberadditivesItems: ['1','2','3','4','5','>5'],

    //List containing the product returned by the API, it's displayed into the List below the research field
    resultProductsName: [],
    resultProductsNova: [],
    resultProductsImage: [],
    productChecked: [],

    part1: 0,
    part2: 15,

    
    pagination: {
      sortBy: 'name'
    },
    selected: [],
    headers: [
      {
        text: 'Image of product',
        align: 'left',
        value: 'image_url'
      },
      { text: 'Name', value: 'product_name' },
      { text: 'NovaScore', value: 'nova_group' },
      { text: 'NutriScore', value: 'nutriscore_grade' },
      { text: 'Number of additives', value: 'additives_n' }
    ],
    items: []

  }),

  methods: {
    // function to redirect to other pages
    movePage(path) {
      this.$router.push(path);
    },

    // showmore(){
    //   this.part2 += 15
    //   this.part1 += 15
    // },

    // showless(){
    //   this.part1 -= 15
    //   this.part2 -= 15
    // },
    resolve_img_url(path) {
      console.log(path)
      return path
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
      // vm.resultProductsName=[]
      // vm.resultProductsImage=[]
      // vm.resultProductsNova=[]
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
          // console.log(response.data[1].product_name)
          
          // var result
          vm.loading = false
          response.data.forEach(function(element) {
            // console.log("okok")
            // vm.resultProductsName.push(element.product_name)
            // vm.resultProductsImage.push(element.image_url)
            // vm.resultProductsNova.push(element.nova_group)
            var itemInsert = {
              image_url: element.image_url,
              product_name: element.product_name,
              nova_group: element.nova_group,
              nutriscore_grade: element.nutriscore_grade,
              additives_n: element.additives_n
            }
            vm.items.push(itemInsert)
          })
          //console.log(vm.items)
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